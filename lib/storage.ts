import type { ResumeData } from "./types"

const STORAGE_KEY = "resume-builder-data"

export function saveResumeData(data: ResumeData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving resume data:", error)
  }
}

export function loadResumeData(): ResumeData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const parsedData = JSON.parse(data)
      const defaultData = getDefaultResumeData()
      return {
        ...defaultData,
        ...parsedData,
        // Ensure all arrays exist with fallback to empty arrays
        experiences: parsedData.experiences || [],
        education: parsedData.education || [],
        projects: parsedData.projects || [],
        skills: parsedData.skills || [],
        languages: parsedData.languages || [],
      }
    }
    return null
  } catch (error) {
    console.error("Error loading resume data:", error)
    return null
  }
}

export function getDefaultResumeData(): ResumeData {
  return {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      portfolio: "",
      jobTitle: "",
    },
    summary: "",
    experiences: [],
    education: [],
    projects: [],
    skills: [],
    languages: [],
  }
}

export function clearResumeData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing resume data:", error)
  }
}
