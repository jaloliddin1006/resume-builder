import type { ObjectiveData } from "./types"

const STORAGE_KEY = "objective-builder-data"

export function saveObjectiveData(data: ObjectiveData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving objective data:", error)
  }
}

export function loadObjectiveData(): ObjectiveData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const parsedData = JSON.parse(data)
      const defaultData = getDefaultObjectiveData()
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
    console.error("Error loading objective data:", error)
    return null
  }
}

export function getDefaultObjectiveData(): ObjectiveData {
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

export function clearObjectiveData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing objective data:", error)
  }
}
