export interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    address: string
    linkedin: string
    github: string
    portfolio: string
    jobTitle: string
    photo: string
    customFields: CustomField[]
  }
  summary: string
  experiences: Experience[]
  education: Education[]
  projects: Project[]
  skills: string[]
  languages: Language[]
}

export interface CustomField {
  id: string
  label: string
  value: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link: string
  startDate: string
  endDate: string
  current: boolean
}

export interface Language {
  id: string
  name: string
  level: string
}

export interface ObjectiveData {
  personalInfo: {
    fullName: string
    currentWorkplace: string
    birthYear: string
    birthPlace: string
    nationality: string
    partyAffiliation: string
    partyAffiliationNo: boolean
    educationLevel: string
    educationCompletion: string
    specialization: string
    scientificDegree: string
    scientificDegreeNo: boolean
    scientificTitle: string
    scientificTitleNo: boolean
    foreignLanguages: string
    foreignLanguagesNo: boolean
    stateAwards: string
    stateAwardsNo: boolean
    deputyPositions: string
    deputyPositionsNo: boolean
    photo: string
  }
  workExperience: {
    id: string
    startDate: string
    endDate: string
    isCurrent: boolean
    description: string
  }[]
  familyMembers: {
    id: string
    relationship: string
    fullName: string
    birthInfo: string
    occupation: string
    location: string
  }[]
}
