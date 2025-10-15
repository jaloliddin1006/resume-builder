"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ResumePreview } from "@/components/resume-preview"
import type { ResumeData, Experience, Education, Language, Project } from "@/lib/types"
import { saveResumeData, loadResumeData, getDefaultResumeData, clearResumeData } from "@/lib/storage"
import { exportToPDF } from "@/lib/pdf-export"
import { Plus, Trash2, Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(getDefaultResumeData())
  const [zoom, setZoom] = useState(0.5)
  const [isExporting, setIsExporting] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  useEffect(() => {
    const savedData = loadResumeData()
    if (savedData) {
      setResumeData(savedData)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      saveResumeData(resumeData)
    }, 1000)

    return () => clearTimeout(timer)
  }, [resumeData])

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data? This action cannot be undone.")) {
      clearResumeData()
      setResumeData(getDefaultResumeData())
    }
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await exportToPDF(resumeData, `${resumeData.personalInfo.fullName || "resume"}.pdf`)
    } catch (error) {
      console.error("Export failed:", error)
      alert("PDF export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setResumeData({
      ...resumeData,
      experiences: [...resumeData.experiences, newExp],
    })
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData({
      ...resumeData,
      experiences: resumeData.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const deleteExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experiences: resumeData.experiences.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    }
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu],
    })
  }

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const deleteEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    })
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const deleteSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    })
  }

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: "",
      level: "",
    }
    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, newLang],
    })
  }

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    })
  }

  const deleteLanguage = (id: string) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter((lang) => lang.id !== id),
    })
  }

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: "",
      link: "",
      startDate: "",
      endDate: "",
      current: false,
    }
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    })
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const deleteProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((proj) => proj.id !== id),
    })
  }

  return (
    <div className="min-h-screen bg-muted/30 w-full">
      <header className="border-b bg-background sticky top-0 z-30 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between gap-2">
          <h1 className="text-xl lg:text-2xl font-bold pl-12 lg:pl-0">Resume Builder</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="hidden sm:flex bg-transparent">
              <RotateCcw className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Reset Resume</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} className="sm:hidden bg-transparent">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={handleExportPDF} disabled={isExporting}>
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">{isExporting ? "Exporting..." : "Download PDF"}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="space-y-4 lg:space-y-6 w-full">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1 h-auto p-1">
                <TabsTrigger value="personal" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Personal
                </TabsTrigger>
                <TabsTrigger value="summary" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Summary
                </TabsTrigger>
                <TabsTrigger value="experience" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Education
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="skills" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Skills
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="p-4 lg:p-6">
                  <h2 className="text-lg lg:text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    {/* Photo Upload */}
                    <div>
                      <Label htmlFor="photo">Photo</Label>
                      <div className="flex items-center gap-4">
                        {resumeData.personalInfo.photo && (
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                            <img
                              src={resumeData.personalInfo.photo}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                  setResumeData({
                                    ...resumeData,
                                    personalInfo: {
                                      ...resumeData.personalInfo,
                                      photo: reader.result as string,
                                    },
                                  })
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                            className="cursor-pointer"
                          />
                          {resumeData.personalInfo.photo && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setResumeData({
                                  ...resumeData,
                                  personalInfo: {
                                    ...resumeData.personalInfo,
                                    photo: "",
                                  },
                                })
                              }
                              className="mt-2"
                            >
                              Remove Photo
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                fullName: e.target.value,
                              },
                            })
                          }
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          value={resumeData.personalInfo.jobTitle}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                jobTitle: e.target.value,
                              },
                            })
                          }
                          placeholder="Software Engineer"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                email: e.target.value,
                              },
                            })
                          }
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                phone: e.target.value,
                              },
                            })
                          }
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={resumeData.personalInfo.address}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            personalInfo: {
                              ...resumeData.personalInfo,
                              address: e.target.value,
                            },
                          })
                        }
                        placeholder="City, Country"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                linkedin: e.target.value,
                              },
                            })
                          }
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={resumeData.personalInfo.github}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                github: e.target.value,
                              },
                            })
                          }
                          placeholder="github.com/johndoe"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="portfolio">Portfolio</Label>
                      <Input
                        id="portfolio"
                        value={resumeData.personalInfo.portfolio}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            personalInfo: {
                              ...resumeData.personalInfo,
                              portfolio: e.target.value,
                            },
                          })
                        }
                        placeholder="johndoe.com"
                      />
                    </div>

                    {/* Custom Fields */}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-base">Additional Information</Label>
                        <Button
                          onClick={() => {
                            const newField = {
                              id: Date.now().toString(),
                              label: "",
                              value: "",
                            }
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                customFields: [...resumeData.personalInfo.customFields, newField],
                              },
                            })
                          }}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Other
                        </Button>
                      </div>

                      {resumeData.personalInfo.customFields.map((field) => (
                        <div key={field.id} className="grid sm:grid-cols-2 gap-4 mb-3 items-end">
                          <div>
                            <Label htmlFor={`label-${field.id}`}>Label</Label>
                            <Input
                              id={`label-${field.id}`}
                              value={field.label}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  personalInfo: {
                                    ...resumeData.personalInfo,
                                    customFields: resumeData.personalInfo.customFields.map((f) =>
                                      f.id === field.id ? { ...f, label: e.target.value } : f
                                    ),
                                  },
                                })
                              }
                              placeholder="e.g., Website, Telegram"
                            />
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <Label htmlFor={`value-${field.id}`}>Value</Label>
                              <Input
                                id={`value-${field.id}`}
                                value={field.value}
                                onChange={(e) =>
                                  setResumeData({
                                    ...resumeData,
                                    personalInfo: {
                                      ...resumeData.personalInfo,
                                      customFields: resumeData.personalInfo.customFields.map((f) =>
                                        f.id === field.id ? { ...f, value: e.target.value } : f
                                      ),
                                    },
                                  })
                                }
                                placeholder="Enter value"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setResumeData({
                                  ...resumeData,
                                  personalInfo: {
                                    ...resumeData.personalInfo,
                                    customFields: resumeData.personalInfo.customFields.filter(
                                      (f) => f.id !== field.id
                                    ),
                                  },
                                })
                              }
                              className="mt-6"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="summary">
                <Card className="p-4 lg:p-6">
                  <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                  <RichTextEditor
                    value={resumeData.summary}
                    onChange={(value) => setResumeData({ ...resumeData, summary: value })}
                    placeholder="Write a brief summary about yourself... Use **bold**, *italic*, or • bullet points"
                  />
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg lg:text-xl font-semibold">Work Experience</h2>
                    <Button onClick={addExperience} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {resumeData.experiences.map((exp) => (
                      <div key={exp.id} className="border rounded-lg p-3 lg:p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Experience Entry</h3>
                          <Button variant="ghost" size="sm" onClick={() => deleteExperience(exp.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              placeholder="Tech Corp"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                              placeholder="Jan 2020"
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                              placeholder="Dec 2022"
                              disabled={exp.current}
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
                          />
                          <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
                        </div>

                        <div>
                          <Label>Description</Label>
                          <RichTextEditor
                            value={exp.description}
                            onChange={(value) => updateExperience(exp.id, "description", value)}
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                      </div>
                    ))}

                    {resumeData.experiences.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        No experience added yet. Click "Add" to get started.
                      </p>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg lg:text-xl font-semibold">Education</h2>
                    <Button onClick={addEducation} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="border rounded-lg p-3 lg:p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Education Entry</h3>
                          <Button variant="ghost" size="sm" onClick={() => deleteEducation(edu.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div>
                            <Label>Field of Study</Label>
                            <Input
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                              placeholder="Computer Science"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            placeholder="University Name"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                              placeholder="2016"
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                              placeholder="2020"
                              disabled={edu.current}
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`current-edu-${edu.id}`}
                            checked={edu.current}
                            onCheckedChange={(checked) => updateEducation(edu.id, "current", checked)}
                          />
                          <Label htmlFor={`current-edu-${edu.id}`}>Currently studying</Label>
                        </div>
                      </div>
                    ))}

                    {resumeData.education.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        No education added yet. Click "Add" to get started.
                      </p>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="projects">
                <Card className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg lg:text-xl font-semibold">Projects</h2>
                    <Button onClick={addProject} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {resumeData.projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-3 lg:p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Project Entry</h3>
                          <Button variant="ghost" size="sm" onClick={() => deleteProject(project.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>

                        <div>
                          <Label>Project Name</Label>
                          <Input
                            value={project.name}
                            onChange={(e) => updateProject(project.id, "name", e.target.value)}
                            placeholder="E-commerce Platform"
                          />
                        </div>

                        <div>
                          <Label>Technologies Used</Label>
                          <Input
                            value={project.technologies}
                            onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>

                        <div>
                          <Label>Project Link (Optional)</Label>
                          <Input
                            value={project.link}
                            onChange={(e) => updateProject(project.id, "link", e.target.value)}
                            placeholder="https://github.com/username/project"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              value={project.startDate}
                              onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                              placeholder="Jan 2023"
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              value={project.endDate}
                              onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                              placeholder="Mar 2023"
                              disabled={project.current}
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`current-project-${project.id}`}
                            checked={project.current}
                            onCheckedChange={(checked) => updateProject(project.id, "current", checked)}
                          />
                          <Label htmlFor={`current-project-${project.id}`}>Currently working on this</Label>
                        </div>

                        <div>
                          <Label>Description</Label>
                          <RichTextEditor
                            value={project.description}
                            onChange={(value) => updateProject(project.id, "description", value)}
                            placeholder="Describe the project, your role, and key achievements..."
                          />
                        </div>
                      </div>
                    ))}

                    {resumeData.projects.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        No projects added yet. Click "Add" to get started.
                      </p>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <div className="space-y-6">
                  <Card className="p-4 lg:p-6">
                    <h2 className="text-lg lg:text-xl font-semibold mb-4">Skills</h2>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addSkill()}
                          placeholder="Add a skill (e.g., JavaScript, React)"
                        />
                        <Button onClick={addSkill}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <div key={index} className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-full">
                            <span className="text-sm">{skill}</span>
                            <button
                              onClick={() => deleteSkill(index)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {resumeData.skills.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">No skills added yet.</p>
                      )}
                    </div>
                  </Card>

                  <Card className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg lg:text-xl font-semibold">Languages</h2>
                      <Button onClick={addLanguage} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {resumeData.languages.map((lang) => (
                        <div key={lang.id} className="flex items-center gap-4 p-3 border rounded-lg">
                          <Input
                            value={lang.name}
                            onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                            placeholder="Language name"
                            className="flex-1"
                          />
                          <Input
                            value={lang.level}
                            onChange={(e) => updateLanguage(lang.id, "level", e.target.value)}
                            placeholder="Level (e.g., Native, Fluent)"
                            className="flex-1"
                          />
                          <Button variant="ghost" size="sm" onClick={() => deleteLanguage(lang.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      ))}

                      {resumeData.languages.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">No languages added yet.</p>
                      )}
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:sticky lg:top-24 h-fit order-first lg:order-last">
            <Card className="p-3 lg:p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base lg:text-lg font-semibold">Preview</h2>
                <div className="flex items-center gap-1 lg:gap-2">
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-xs lg:text-sm text-muted-foreground min-w-[2.5rem] lg:min-w-[3rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-auto max-h-[50vh] lg:max-h-[calc(100vh-12rem)] bg-gray-100 p-2 lg:p-4 flex items-start justify-center">
                <ResumePreview data={resumeData} zoom={zoom} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
