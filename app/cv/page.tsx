"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CVPreview } from "@/components/cv-preview"
import { saveCVData, loadCVData, getDefaultCVData, clearCVData } from "@/lib/cv-storage"
import type { ObjectiveData } from "@/lib/types"
import { Trash2, Plus, X } from "lucide-react"

export default function CVPage() {
  const [cvData, setCVData] = useState<ObjectiveData>(getDefaultCVData())
  const [zoom, setZoom] = useState(1)
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    work: false,
    family: false,
  })

  useEffect(() => {
    const savedData = loadCVData()
    if (savedData) {
      setCVData(savedData)
    }
  }, [])

  useEffect(() => {
    saveCVData(cvData)
  }, [cvData])

  const handleReset = () => {
    if (confirm("Barcha ma'lumotlarni o'chirmoqchimisiz?")) {
      clearCVData()
      setCVData(getDefaultCVData())
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCVData({
          ...cvData,
          personalInfo: {
            ...cvData.personalInfo,
            photo: event.target?.result as string,
          },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePersonalInfoChange = (field: keyof ObjectiveData["personalInfo"], value: string | boolean) => {
    setCVData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [field]: value,
      },
    })
  }

  const handleAddWorkExperience = () => {
    setCVData({
      ...cvData,
      workExperience: [
        ...cvData.workExperience,
        {
          id: Date.now().toString(),
          startDate: "",
          endDate: "",
          isCurrent: false,
          description: "",
        },
      ],
    })
  }

  const handleUpdateWorkExperience = (id: string, field: string, value: string | boolean) => {
    setCVData({
      ...cvData,
      workExperience: cvData.workExperience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const handleRemoveWorkExperience = (id: string) => {
    setCVData({
      ...cvData,
      workExperience: cvData.workExperience.filter((exp) => exp.id !== id),
    })
  }

  const handleAddFamilyMember = () => {
    setCVData({
      ...cvData,
      familyMembers: [
        ...cvData.familyMembers,
        {
          id: Date.now().toString(),
          relationship: "",
          fullName: "",
          birthInfo: "",
          occupation: "",
          location: "",
        },
      ],
    })
  }

  const handleUpdateFamilyMember = (id: string, field: string, value: string) => {
    setCVData({
      ...cvData,
      familyMembers: cvData.familyMembers.map((member) => (member.id === id ? { ...member, [field]: value } : member)),
    })
  }

  const handleRemoveFamilyMember = (id: string) => {
    setCVData({
      ...cvData,
      familyMembers: cvData.familyMembers.filter((member) => member.id !== id),
    })
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-8">
        {/* Form Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">CV Builder</h1>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <Trash2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Tozalash</span>
            </Button>
          </div>

          {/* Personal Information Section */}
          <Card>
            <CardHeader className="cursor-pointer hover:bg-accent" onClick={() => toggleSection("personal")}>
              <CardTitle className="text-lg">Shaxsiy Ma'lumotlar</CardTitle>
            </CardHeader>
            {expandedSections.personal && (
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">F.I.O</label>
                  <Input
                    value={cvData.personalInfo.fullName}
                    onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                    placeholder="To'liq ismingiz"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Hozirgi Ish Joyi</label>
                  <Input
                    value={cvData.personalInfo.currentWorkplace}
                    onChange={(e) => handlePersonalInfoChange("currentWorkplace", e.target.value)}
                    placeholder="Ish joyi"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">Tug'ilgan Yili</label>
                    <Input
                      value={cvData.personalInfo.birthYear}
                      onChange={(e) => handlePersonalInfoChange("birthYear", e.target.value)}
                      placeholder="1990"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tug'ilgan Joyi</label>
                    <Input
                      value={cvData.personalInfo.birthPlace}
                      onChange={(e) => handlePersonalInfoChange("birthPlace", e.target.value)}
                      placeholder="Shahar"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Millati</label>
                  <Input
                    value={cvData.personalInfo.nationality}
                    onChange={(e) => handlePersonalInfoChange("nationality", e.target.value)}
                    placeholder="O'zbek"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Partiyaviyiligi</label>
                  <Input
                    value={cvData.personalInfo.partyAffiliation}
                    onChange={(e) => handlePersonalInfoChange("partyAffiliation", e.target.value)}
                    placeholder="Partiya"
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-sm mb-3">Ta'lim Ma'lumotlari</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Ma'lumoti</label>
                      <Input
                        value={cvData.personalInfo.educationLevel}
                        onChange={(e) => handlePersonalInfoChange("educationLevel", e.target.value)}
                        placeholder="Oliy"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Tamomlagan</label>
                      <Input
                        value={cvData.personalInfo.educationCompletion}
                        onChange={(e) => handlePersonalInfoChange("educationCompletion", e.target.value)}
                        placeholder="Universitet nomi"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Mutaxassisligi</label>
                      <Input
                        value={cvData.personalInfo.specialization}
                        onChange={(e) => handlePersonalInfoChange("specialization", e.target.value)}
                        placeholder="Mutaxassislik"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-sm mb-3">Ilmiy Darajalar</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Ilmiy Darajasi</label>
                      <Input
                        value={cvData.personalInfo.scientificDegree}
                        onChange={(e) => handlePersonalInfoChange("scientificDegree", e.target.value)}
                        placeholder="Doktor"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Ilmiy Unvoni</label>
                      <Input
                        value={cvData.personalInfo.scientificTitle}
                        onChange={(e) => handlePersonalInfoChange("scientificTitle", e.target.value)}
                        placeholder="Professor"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-sm mb-3">Qo'shimcha Ma'lumotlar</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Chet Tillarini Bilish</label>
                      <Input
                        value={cvData.personalInfo.foreignLanguages}
                        onChange={(e) => handlePersonalInfoChange("foreignLanguages", e.target.value)}
                        placeholder="Ingliz, Rus"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Davlat Mukofotlari</label>
                      <Textarea
                        value={cvData.personalInfo.stateAwards}
                        onChange={(e) => handlePersonalInfoChange("stateAwards", e.target.value)}
                        placeholder="Mukofotlar"
                        rows={2}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Deputat Lavozimi</label>
                      <Input
                        value={cvData.personalInfo.deputyPositions}
                        onChange={(e) => handlePersonalInfoChange("deputyPositions", e.target.value)}
                        placeholder="Lavozim"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Rasm</label>
                      <Input type="file" accept="image/*" onChange={handlePhotoUpload} />
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Work Experience Section */}
          <Card>
            <CardHeader
              className="cursor-pointer hover:bg-accent flex flex-row items-center justify-between"
              onClick={() => toggleSection("work")}
            >
              <CardTitle className="text-lg">Ish Tajribasi</CardTitle>
              <span className="text-xs bg-muted px-2 py-1 rounded">{cvData.workExperience.length}</span>
            </CardHeader>
            {expandedSections.work && (
              <CardContent className="space-y-4">
                {cvData.workExperience.map((exp, index) => (
                  <div key={exp.id} className="border rounded-lg p-3 space-y-3 bg-muted/30">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">Ish tajribasi #{index + 1}</h4>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveWorkExperience(exp.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-medium">Boshlanish Sanasi</label>
                        <Input
                          type="date"
                          value={exp.startDate}
                          onChange={(e) => handleUpdateWorkExperience(exp.id, "startDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium">Tugash Sanasi</label>
                        <Input
                          type="date"
                          value={exp.endDate}
                          onChange={(e) => handleUpdateWorkExperience(exp.id, "endDate", e.target.value)}
                          disabled={exp.isCurrent}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.isCurrent}
                        onChange={(e) => handleUpdateWorkExperience(exp.id, "isCurrent", e.target.checked)}
                      />
                      <label htmlFor={`current-${exp.id}`} className="text-xs font-medium">
                        Hozir ishlayapman
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-medium">Tavsifi</label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => handleUpdateWorkExperience(exp.id, "description", e.target.value)}
                        placeholder="Ish tajribasi tavsifi"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}

                <Button onClick={handleAddWorkExperience} variant="outline" className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Ish tajribasi qo'shish
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Family Members Section */}
          <Card>
            <CardHeader
              className="cursor-pointer hover:bg-accent flex flex-row items-center justify-between"
              onClick={() => toggleSection("family")}
            >
              <CardTitle className="text-lg">Oila Aʼzolari</CardTitle>
              <span className="text-xs bg-muted px-2 py-1 rounded">{cvData.familyMembers.length}</span>
            </CardHeader>
            {expandedSections.family && (
              <CardContent className="space-y-4">
                {cvData.familyMembers.map((member, index) => (
                  <div key={member.id} className="border rounded-lg p-3 space-y-3 bg-muted/30">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">Oila a'zosi #{index + 1}</h4>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveFamilyMember(member.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div>
                      <label className="text-xs font-medium">Munosabati</label>
                      <Input
                        value={member.relationship}
                        onChange={(e) => handleUpdateFamilyMember(member.id, "relationship", e.target.value)}
                        placeholder="Ota, Ona, Aka, Opa..."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium">F.I.O</label>
                      <Input
                        value={member.fullName}
                        onChange={(e) => handleUpdateFamilyMember(member.id, "fullName", e.target.value)}
                        placeholder="To'liq ismi"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Tug'ilgan Ma'lumoti</label>
                      <Input
                        value={member.birthInfo}
                        onChange={(e) => handleUpdateFamilyMember(member.id, "birthInfo", e.target.value)}
                        placeholder="Tug'ilgan yili va joyi"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Kasbi</label>
                      <Input
                        value={member.occupation}
                        onChange={(e) => handleUpdateFamilyMember(member.id, "occupation", e.target.value)}
                        placeholder="Kasbi"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Joylashgan Joyi</label>
                      <Input
                        value={member.location}
                        onChange={(e) => handleUpdateFamilyMember(member.id, "location", e.target.value)}
                        placeholder="Shahar, Davlat"
                      />
                    </div>
                  </div>
                ))}

                <Button onClick={handleAddFamilyMember} variant="outline" className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Oila a'zosi qo'shish
                </Button>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-2">
          <Card className="sticky top-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>CV Ko'rinishi</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                  −
                </Button>
                <span className="text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}>
                  +
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center overflow-auto max-h-[calc(100vh-200px)]">
              <CVPreview data={cvData} zoom={zoom} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
