"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus, X, ChevronDown, ChevronUp } from "lucide-react"

interface CVFormData {
  personal_information: {
    full_name: string
    email: string
    phone: string
    linkedin: string
    github: string
    address: string
    photo_url: string
  }
  summary: string
  education: Array<{
    id: string
    degree: string
    institution: string
    field: string
    start_date: string
    end_date: string
    honors: string
  }>
  experience: Array<{
    id: string
    position: string
    company: string
    location: string
    start_date: string
    end_date: string
    responsibilities: string[]
    achievements: string[]
  }>
  skills: {
    technical: string[]
    soft: string[]
    languages: Array<{
      name: string
      level: string
    }>
  }
  certifications: Array<{
    id: string
    title: string
    organization: string
    date: string
    description: string
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    technologies: string[]
    link: string
    role: string
    outcomes: string[]
  }>
  publications: Array<{
    id: string
    title: string
    date: string
    journal: string
    description: string
  }>
  awards: string[]
  volunteer_experience: Array<{
    id: string
    organization: string
    role: string
    date: string
    description: string
  }>
  references: Array<{
    id: string
    name: string
    position: string
    company: string
    email: string
    phone: string
  }>
  additional_info: {
    courses: string[]
    hobbies: string[]
    memberships: string[]
  }
}

const getDefaultCVData = (): CVFormData => ({
  personal_information: {
    full_name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    address: "",
    photo_url: "",
  },
  summary: "",
  education: [],
  experience: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  certifications: [],
  projects: [],
  publications: [],
  awards: [],
  volunteer_experience: [],
  references: [],
  additional_info: {
    courses: [],
    hobbies: [],
    memberships: [],
  },
})

export default function CVPage() {
  const [cvData, setCVData] = useState<CVFormData>(getDefaultCVData())
  const [expandedSection, setExpandedSection] = useState<string | null>("personal")

  useEffect(() => {
    const saved = localStorage.getItem("cvFormData")
    if (saved) {
      setCVData(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cvFormData", JSON.stringify(cvData))
  }, [cvData])

  const updateCVData = useCallback((updater: (data: CVFormData) => CVFormData) => {
    setCVData((prev) => updater(prev))
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleReset = () => {
    if (confirm("Barcha ma'lumotlarni o'chirmoqchimisiz?")) {
      setCVData(getDefaultCVData())
      localStorage.removeItem("cvFormData")
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        updateCVData((data) => ({
          ...data,
          personal_information: {
            ...data.personal_information,
            photo_url: event.target?.result as string,
          },
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const SectionCard = ({
    title,
    section,
    count,
    children,
  }: {
    title: string
    section: string
    count?: number
    children: React.ReactNode
  }) => (
    <Card>
      <CardHeader
        className="cursor-pointer hover:bg-accent transition-colors flex flex-row items-center justify-between"
        onClick={() => toggleSection(section)}
      >
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          {count !== undefined && <span className="text-xs bg-muted px-2 py-1 rounded">{count}</span>}
        </div>
        {expandedSection === section ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </CardHeader>
      {expandedSection === section && <CardContent className="space-y-4">{children}</CardContent>}
    </Card>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Form Section - Left side with scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6 md:p-8 space-y-4">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-background z-10 py-2">
            <h1 className="text-2xl font-bold">CV Builder</h1>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <Trash2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Tozalash</span>
            </Button>
          </div>

          {/* Personal Information */}
          <SectionCard title="Shaxsiy Ma'lumotlar" section="personal">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">To'liq Ism</label>
                <Input
                  value={cvData.personal_information.full_name}
                  onChange={(e) =>
                    updateCVData((data) => ({
                      ...data,
                      personal_information: { ...data.personal_information, full_name: e.target.value },
                    }))
                  }
                  placeholder="Ismingiz"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={cvData.personal_information.email}
                    onChange={(e) =>
                      updateCVData((data) => ({
                        ...data,
                        personal_information: { ...data.personal_information, email: e.target.value },
                      }))
                    }
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Telefon</label>
                  <Input
                    value={cvData.personal_information.phone}
                    onChange={(e) =>
                      updateCVData((data) => ({
                        ...data,
                        personal_information: { ...data.personal_information, phone: e.target.value },
                      }))
                    }
                    placeholder="+998 XX XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Manzil</label>
                <Input
                  value={cvData.personal_information.address}
                  onChange={(e) =>
                    updateCVData((data) => ({
                      ...data,
                      personal_information: { ...data.personal_information, address: e.target.value },
                    }))
                  }
                  placeholder="Shahar, Davlat"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">LinkedIn</label>
                  <Input
                    value={cvData.personal_information.linkedin}
                    onChange={(e) =>
                      updateCVData((data) => ({
                        ...data,
                        personal_information: { ...data.personal_information, linkedin: e.target.value },
                      }))
                    }
                    placeholder="linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">GitHub</label>
                  <Input
                    value={cvData.personal_information.github}
                    onChange={(e) =>
                      updateCVData((data) => ({
                        ...data,
                        personal_information: { ...data.personal_information, github: e.target.value },
                      }))
                    }
                    placeholder="github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Rasm</label>
                <Input type="file" accept="image/*" onChange={handlePhotoUpload} />
                {cvData.personal_information.photo_url && (
                  <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border">
                    <img
                      src={cvData.personal_information.photo_url || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </SectionCard>

          {/* Professional Summary */}
          <SectionCard title="Professional Xulosa" section="summary">
            <Textarea
              value={cvData.summary}
              onChange={(e) => updateCVData((data) => ({ ...data, summary: e.target.value }))}
              placeholder="3-5 ta jumla bilan o'zingizni tavsiflab bering..."
              rows={4}
            />
          </SectionCard>

          {/* Education */}
          <SectionCard title="Ta'lim" section="education" count={cvData.education.length}>
            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div key={edu.id} className="border rounded-lg p-3 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">Ta'lim #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateCVData((data) => ({
                          ...data,
                          education: data.education.filter((e) => e.id !== edu.id),
                        }))
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Universitet/Maktab</label>
                    <Input
                      value={edu.institution}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          education: data.education.map((item) =>
                            item.id === edu.id ? { ...item, institution: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Universitet nomi"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium">Daraja</label>
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            education: data.education.map((item) =>
                              item.id === edu.id ? { ...item, degree: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Bachelor, Master..."
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Soha</label>
                      <Input
                        value={edu.field}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            education: data.education.map((item) =>
                              item.id === edu.id ? { ...item, field: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Informatika..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium">Boshlanish Sanasi</label>
                      <Input
                        type="date"
                        value={edu.start_date}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            education: data.education.map((item) =>
                              item.id === edu.id ? { ...item, start_date: e.target.value } : item,
                            ),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Tugash Sanasi</label>
                      <Input
                        type="date"
                        value={edu.end_date}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            education: data.education.map((item) =>
                              item.id === edu.id ? { ...item, end_date: e.target.value } : item,
                            ),
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Mukofotlar/Faxrilar</label>
                    <Input
                      value={edu.honors}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          education: data.education.map((item) =>
                            item.id === edu.id ? { ...item, honors: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Mukofotlar"
                    />
                  </div>
                </div>
              ))}

              <Button
                onClick={() =>
                  updateCVData((data) => ({
                    ...data,
                    education: [
                      ...data.education,
                      {
                        id: Date.now().toString(),
                        degree: "",
                        institution: "",
                        field: "",
                        start_date: "",
                        end_date: "",
                        honors: "",
                      },
                    ],
                  }))
                }
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ta'lim qo'shish
              </Button>
            </div>
          </SectionCard>

          {/* Work Experience */}
          <SectionCard title="Ish Tajribasi" section="experience" count={cvData.experience.length}>
            <div className="space-y-4">
              {cvData.experience.map((exp, index) => (
                <div key={exp.id} className="border rounded-lg p-3 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">Ish tajribasi #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateCVData((data) => ({
                          ...data,
                          experience: data.experience.filter((e) => e.id !== exp.id),
                        }))
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium">Lavozim</label>
                      <Input
                        value={exp.position}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            experience: data.experience.map((item) =>
                              item.id === exp.id ? { ...item, position: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Lavozim"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Kompaniya</label>
                      <Input
                        value={exp.company}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            experience: data.experience.map((item) =>
                              item.id === exp.id ? { ...item, company: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Kompaniya nomi"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Joylashgan Joyi</label>
                    <Input
                      value={exp.location}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          experience: data.experience.map((item) =>
                            item.id === exp.id ? { ...item, location: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Shahar"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium">Boshlanish Sanasi</label>
                      <Input
                        type="date"
                        value={exp.start_date}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            experience: data.experience.map((item) =>
                              item.id === exp.id ? { ...item, start_date: e.target.value } : item,
                            ),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Tugash Sanasi</label>
                      <Input
                        type="date"
                        value={exp.end_date}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            experience: data.experience.map((item) =>
                              item.id === exp.id ? { ...item, end_date: e.target.value } : item,
                            ),
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Mas'uliyatlar</label>
                    <Textarea
                      value={exp.responsibilities.join("\n")}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          experience: data.experience.map((item) =>
                            item.id === exp.id ? { ...item, responsibilities: e.target.value.split("\n") } : item,
                          ),
                        }))
                      }
                      placeholder="Har bir qatorga bitta mas'uliyat"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium">Yutuqlar</label>
                    <Textarea
                      value={exp.achievements.join("\n")}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          experience: data.experience.map((item) =>
                            item.id === exp.id ? { ...item, achievements: e.target.value.split("\n") } : item,
                          ),
                        }))
                      }
                      placeholder="Har bir qatorga bitta yutuq"
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              <Button
                onClick={() =>
                  updateCVData((data) => ({
                    ...data,
                    experience: [
                      ...data.experience,
                      {
                        id: Date.now().toString(),
                        position: "",
                        company: "",
                        location: "",
                        start_date: "",
                        end_date: "",
                        responsibilities: [],
                        achievements: [],
                      },
                    ],
                  }))
                }
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ish tajribasi qo'shish
              </Button>
            </div>
          </SectionCard>

          {/* Skills */}
          <SectionCard title="Ko'nikmalar" section="skills">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Texnik Ko'nikmalar</label>
                <Textarea
                  value={cvData.skills.technical.join("\n")}
                  onChange={(e) =>
                    updateCVData((data) => ({
                      ...data,
                      skills: { ...data.skills, technical: e.target.value.split("\n").filter(Boolean) },
                    }))
                  }
                  placeholder="Har bir qatorga bitta ko'nikma (masalan: JavaScript, React, Node.js)"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Yumshoq Ko'nikmalar</label>
                <Textarea
                  value={cvData.skills.soft.join("\n")}
                  onChange={(e) =>
                    updateCVData((data) => ({
                      ...data,
                      skills: { ...data.skills, soft: e.target.value.split("\n").filter(Boolean) },
                    }))
                  }
                  placeholder="Har bir qatorga bitta ko'nikma (masalan: Liderlik, Muloqat)"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tillar</label>
                <div className="space-y-2">
                  {cvData.skills.languages.map((lang, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={lang.name}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            skills: {
                              ...data.skills,
                              languages: data.skills.languages.map((l, i) =>
                                i === index ? { ...l, name: e.target.value } : l,
                              ),
                            },
                          }))
                        }
                        placeholder="Til nomi"
                      />
                      <Input
                        value={lang.level}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            skills: {
                              ...data.skills,
                              languages: data.skills.languages.map((l, i) =>
                                i === index ? { ...l, level: e.target.value } : l,
                              ),
                            },
                          }))
                        }
                        placeholder="Darajasi (Beginner, Intermediate, Advanced)"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          updateCVData((data) => ({
                            ...data,
                            skills: {
                              ...data.skills,
                              languages: data.skills.languages.filter((_, i) => i !== index),
                            },
                          }))
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() =>
                      updateCVData((data) => ({
                        ...data,
                        skills: {
                          ...data.skills,
                          languages: [...data.skills.languages, { name: "", level: "" }],
                        },
                      }))
                    }
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Til qo'shish
                  </Button>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Certifications */}
          <SectionCard title="Sertifikatlar" section="certifications" count={cvData.certifications.length}>
            <div className="space-y-4">
              {cvData.certifications.map((cert, index) => (
                <div key={cert.id} className="border rounded-lg p-3 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">Sertifikat #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateCVData((data) => ({
                          ...data,
                          certifications: data.certifications.filter((c) => c.id !== cert.id),
                        }))
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Sertifikat Nomi</label>
                    <Input
                      value={cert.title}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          certifications: data.certifications.map((item) =>
                            item.id === cert.id ? { ...item, title: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Sertifikat nomi"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium">Tashkilot</label>
                      <Input
                        value={cert.organization}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            certifications: data.certifications.map((item) =>
                              item.id === cert.id ? { ...item, organization: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Tashkilot nomi"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Sana</label>
                      <Input
                        type="date"
                        value={cert.date}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            certifications: data.certifications.map((item) =>
                              item.id === cert.id ? { ...item, date: e.target.value } : item,
                            ),
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Tavsifi</label>
                    <Textarea
                      value={cert.description}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          certifications: data.certifications.map((item) =>
                            item.id === cert.id ? { ...item, description: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Sertifikat tavsifi"
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              <Button
                onClick={() =>
                  updateCVData((data) => ({
                    ...data,
                    certifications: [
                      ...data.certifications,
                      {
                        id: Date.now().toString(),
                        title: "",
                        organization: "",
                        date: "",
                        description: "",
                      },
                    ],
                  }))
                }
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Sertifikat qo'shish
              </Button>
            </div>
          </SectionCard>

          {/* Projects */}
          <SectionCard title="Loyihalar" section="projects" count={cvData.projects.length}>
            <div className="space-y-4">
              {cvData.projects.map((project, index) => (
                <div key={project.id} className="border rounded-lg p-3 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">Loyiha #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateCVData((data) => ({
                          ...data,
                          projects: data.projects.filter((p) => p.id !== project.id),
                        }))
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Loyiha Nomi</label>
                    <Input
                      value={project.title}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          projects: data.projects.map((item) =>
                            item.id === project.id ? { ...item, title: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Loyiha nomi"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium">Tavsifi</label>
                    <Textarea
                      value={project.description}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          projects: data.projects.map((item) =>
                            item.id === project.id ? { ...item, description: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Loyiha tavsifi"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium">Texnologiyalar</label>
                    <Textarea
                      value={project.technologies.join("\n")}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          projects: data.projects.map((item) =>
                            item.id === project.id
                              ? { ...item, technologies: e.target.value.split("\n").filter(Boolean) }
                              : item,
                          ),
                        }))
                      }
                      placeholder="Har bir qatorga bitta texnologiya"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium">Rol</label>
                      <Input
                        value={project.role}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            projects: data.projects.map((item) =>
                              item.id === project.id ? { ...item, role: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Rol"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Link</label>
                      <Input
                        value={project.link}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            projects: data.projects.map((item) =>
                              item.id === project.id ? { ...item, link: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Natijalar</label>
                    <Textarea
                      value={project.outcomes.join("\n")}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          projects: data.projects.map((item) =>
                            item.id === project.id
                              ? { ...item, outcomes: e.target.value.split("\n").filter(Boolean) }
                              : item,
                          ),
                        }))
                      }
                      placeholder="Har bir qatorga bitta natija"
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              <Button
                onClick={() =>
                  updateCVData((data) => ({
                    ...data,
                    projects: [
                      ...data.projects,
                      {
                        id: Date.now().toString(),
                        title: "",
                        description: "",
                        technologies: [],
                        link: "",
                        role: "",
                        outcomes: [],
                      },
                    ],
                  }))
                }
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Loyiha qo'shish
              </Button>
            </div>
          </SectionCard>

          {/* Publications */}
          <SectionCard title="Nashrlar" section="publications" count={cvData.publications.length}>
            <div className="space-y-4">
              {cvData.publications.map((pub, index) => (
                <div key={pub.id} className="border rounded-lg p-3 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">Nashr #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateCVData((data) => ({
                          ...data,
                          publications: data.publications.filter((p) => p.id !== pub.id),
                        }))
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Nashr Nomi</label>
                    <Input
                      value={pub.title}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          publications: data.publications.map((item) =>
                            item.id === pub.id ? { ...item, title: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Nashr nomi"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium">Sana</label>
                      <Input
                        type="date"
                        value={pub.date}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            publications: data.publications.map((item) =>
                              item.id === pub.id ? { ...item, date: e.target.value } : item,
                            ),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Jurnal/Konferensiya</label>
                      <Input
                        value={pub.journal}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            publications: data.publications.map((item) =>
                              item.id === pub.id ? { ...item, journal: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Jurnal nomi"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Tavsifi</label>
                    <Textarea
                      value={pub.description}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          publications: data.publications.map((item) =>
                            item.id === pub.id ? { ...item, description: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Nashr tavsifi"
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              <Button
                onClick={() =>
                  updateCVData((data) => ({
                    ...data,
                    publications: [
                      ...data.publications,
                      {
                        id: Date.now().toString(),
                        title: "",
                        date: "",
                        journal: "",
                        description: "",
                      },
                    ],
                  }))
                }
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nashr qo'shish
              </Button>
            </div>
          </SectionCard>

          {/* Awards */}
          <SectionCard title="Mukofotlar va Yutuqlar" section="awards" count={cvData.awards.length}>
            <div className="space-y-2">
              {cvData.awards.map((award, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={award}
                    onChange={(e) =>
                      updateCVData((data) => ({
                        ...data,
                        awards: data.awards.map((a, i) => (i === index ? e.target.value : a)),
                      }))
                    }
                    placeholder="Mukofot nomi"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      updateCVData((data) => ({
                        ...data,
                        awards: data.awards.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => updateCVData((data) => ({ ...data, awards: [...data.awards, ""] }))}
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Mukofot qo'shish
              </Button>
            </div>
          </SectionCard>

          {/* Volunteer Experience */}
          <SectionCard title="Volunteer Tajribasi" section="volunteer" count={cvData.volunteer_experience.length}>
            <div className="space-y-4">
              {cvData.volunteer_experience.map((vol, index) => (
                <div key={vol.id} className="border rounded-lg p-3 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">Volunteer #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateCVData((data) => ({
                          ...data,
                          volunteer_experience: data.volunteer_experience.filter((v) => v.id !== vol.id),
                        }))
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium">Tashkilot</label>
                      <Input
                        value={vol.organization}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            volunteer_experience: data.volunteer_experience.map((item) =>
                              item.id === vol.id ? { ...item, organization: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Tashkilot nomi"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Rol</label>
                      <Input
                        value={vol.role}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            volunteer_experience: data.volunteer_experience.map((item) =>
                              item.id === vol.id ? { ...item, role: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Rol"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Sana</label>
                    <Input
                      value={vol.date}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          volunteer_experience: data.volunteer_experience.map((item) =>
                            item.id === vol.id ? { ...item, date: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Sana"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium">Tavsifi</label>
                    <Textarea
                      value={vol.description}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          volunteer_experience: data.volunteer_experience.map((item) =>
                            item.id === vol.id ? { ...item, description: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Volunteer tajribasi tavsifi"
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              <Button
                onClick={() =>
                  updateCVData((data) => ({
                    ...data,
                    volunteer_experience: [
                      ...data.volunteer_experience,
                      {
                        id: Date.now().toString(),
                        organization: "",
                        role: "",
                        date: "",
                        description: "",
                      },
                    ],
                  }))
                }
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Volunteer qo'shish
              </Button>
            </div>
          </SectionCard>

          {/* References */}
          <SectionCard title="Referenslar" section="references" count={cvData.references.length}>
            <div className="space-y-4">
              {cvData.references.map((ref, index) => (
                <div key={ref.id} className="border rounded-lg p-3 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">Referens #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateCVData((data) => ({
                          ...data,
                          references: data.references.filter((r) => r.id !== ref.id),
                        }))
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Ism</label>
                    <Input
                      value={ref.name}
                      onChange={(e) =>
                        updateCVData((data) => ({
                          ...data,
                          references: data.references.map((item) =>
                            item.id === ref.id ? { ...item, name: e.target.value } : item,
                          ),
                        }))
                      }
                      placeholder="Ism"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium">Lavozim</label>
                      <Input
                        value={ref.position}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            references: data.references.map((item) =>
                              item.id === ref.id ? { ...item, position: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Lavozim"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Kompaniya</label>
                      <Input
                        value={ref.company}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            references: data.references.map((item) =>
                              item.id === ref.id ? { ...item, company: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="Kompaniya"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium">Email</label>
                      <Input
                        type="email"
                        value={ref.email}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            references: data.references.map((item) =>
                              item.id === ref.id ? { ...item, email: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Telefon</label>
                      <Input
                        value={ref.phone}
                        onChange={(e) =>
                          updateCVData((data) => ({
                            ...data,
                            references: data.references.map((item) =>
                              item.id === ref.id ? { ...item, phone: e.target.value } : item,
                            ),
                          }))
                        }
                        placeholder="+998 XX XXX XX XX"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={() =>
                  updateCVData((data) => ({
                    ...data,
                    references: [
                      ...data.references,
                      {
                        id: Date.now().toString(),
                        name: "",
                        position: "",
                        company: "",
                        email: "",
                        phone: "",
                      },
                    ],
                  }))
                }
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Referens qo'shish
              </Button>
            </div>
          </SectionCard>

          {/* Additional Info */}
          <SectionCard title="Qo'shimcha Ma'lumotlar" section="additional">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Kurslar</label>
                <Textarea
                  value={cvData.additional_info.courses.join("\n")}
                  onChange={(e) =>
                    updateCVData((data) => ({
                      ...data,
                      additional_info: {
                        ...data.additional_info,
                        courses: e.target.value.split("\n").filter(Boolean),
                      },
                    }))
                  }
                  placeholder="Har bir qatorga bitta kurs"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Hobbiylar/Qiziqishlar</label>
                <Textarea
                  value={cvData.additional_info.hobbies.join("\n")}
                  onChange={(e) =>
                    updateCVData((data) => ({
                      ...data,
                      additional_info: {
                        ...data.additional_info,
                        hobbies: e.target.value.split("\n").filter(Boolean),
                      },
                    }))
                  }
                  placeholder="Har bir qatorga bitta hobby"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Professional Aʼzoliklari</label>
                <Textarea
                  value={cvData.additional_info.memberships.join("\n")}
                  onChange={(e) =>
                    updateCVData((data) => ({
                      ...data,
                      additional_info: {
                        ...data.additional_info,
                        memberships: e.target.value.split("\n").filter(Boolean),
                      },
                    }))
                  }
                  placeholder="Har bir qatorga bitta a'zollik"
                  rows={2}
                />
              </div>
            </div>
          </SectionCard>

          <div className="pb-8" />
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/3 border-l bg-gradient-to-br from-slate-50 to-slate-100 overflow-y-auto p-6">
        <div className="w-full">
          {/* A4 CV Preview */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden" style={{ aspectRatio: "210/297" }}>
            <div className="h-full overflow-hidden flex flex-col p-8 text-sm bg-white space-y-3">
              {/* Header */}
              <div className="border-b-2 border-blue-600 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                      {cvData.personal_information.full_name || "Your Name"}
                    </h1>
                    <p className="text-gray-600 text-xs mt-1">
                      {cvData.personal_information.address || "City, Country"}
                    </p>
                  </div>
                  {cvData.personal_information.photo_url && (
                    <img
                      src={cvData.personal_information.photo_url || "/placeholder.svg"}
                      alt="Profile"
                      className="w-14 h-14 rounded-lg object-cover border-2 border-blue-600"
                    />
                  )}
                </div>
                <div className="flex gap-3 mt-2 text-xs text-gray-600 flex-wrap">
                  {cvData.personal_information.email && <span>{cvData.personal_information.email}</span>}
                  {cvData.personal_information.phone && <span>•</span>}
                  {cvData.personal_information.phone && <span>{cvData.personal_information.phone}</span>}
                </div>
              </div>

              {/* Summary */}
              {cvData.summary && (
                <div>
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1 text-blue-700">
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 text-xs leading-relaxed line-clamp-3">{cvData.summary}</p>
                </div>
              )}

              {/* Work Experience */}
              {cvData.experience.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1 text-blue-700">
                    Work Experience
                  </h2>
                  <div className="space-y-1">
                    {cvData.experience.slice(0, 2).map((exp) => (
                      <div key={exp.id} className="text-xs">
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-gray-900">{exp.position}</span>
                          <span className="text-gray-500 text-xs">{exp.start_date}</span>
                        </div>
                        <p className="text-gray-600 text-xs">{exp.company}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {cvData.education.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1 text-blue-700">
                    Education
                  </h2>
                  <div className="space-y-1">
                    {cvData.education.slice(0, 2).map((edu) => (
                      <div key={edu.id} className="text-xs">
                        <div className="font-semibold text-gray-900">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </div>
                        <p className="text-gray-600 text-xs">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {cvData.skills.technical.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1 text-blue-700">
                    Skills
                  </h2>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {cvData.skills.technical.slice(0, 6).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
