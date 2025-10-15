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
