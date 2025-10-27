import type { ObjectiveData } from "./types"

const CV_STORAGE_KEY = "cv-builder-data"

export function saveCVData(data: ObjectiveData): void {
  try {
    localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving CV data:", error)
  }
}

export function loadCVData(): ObjectiveData | null {
  try {
    const data = localStorage.getItem(CV_STORAGE_KEY)
    if (data) {
      const parsedData = JSON.parse(data)
      const defaultData = getDefaultCVData()
      return {
        ...defaultData,
        ...parsedData,
        personalInfo: {
          ...defaultData.personalInfo,
          ...parsedData.personalInfo,
        },
        workExperience: parsedData.workExperience || [],
        familyMembers: parsedData.familyMembers || [],
      }
    }
    return null
  } catch (error) {
    console.error("Error loading CV data:", error)
    return null
  }
}

export function getDefaultCVData(): ObjectiveData {
  return {
    personalInfo: {
      fullName: "",
      currentWorkplace: "",
      birthYear: "",
      birthPlace: "",
      nationality: "",
      partyAffiliation: "",
      partyAffiliationNo: false,
      educationLevel: "",
      educationCompletion: "",
      specialization: "",
      scientificDegree: "",
      scientificDegreeNo: false,
      scientificTitle: "",
      scientificTitleNo: false,
      foreignLanguages: "",
      foreignLanguagesNo: false,
      stateAwards: "",
      stateAwardsNo: false,
      deputyPositions: "",
      deputyPositionsNo: false,
      photo: "",
    },
    workExperience: [],
    familyMembers: [],
  }
}

export function clearCVData(): void {
  try {
    localStorage.removeItem(CV_STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing CV data:", error)
  }
}
