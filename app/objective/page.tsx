"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ObjectivePreview } from "@/components/objective-preview"
import type { ObjectiveData } from "@/lib/types"
import {
  saveObjectiveData,
  loadObjectiveData,
  getDefaultObjectiveData,
  clearObjectiveData,
} from "@/lib/objective-storage"
import { exportToPDF } from "@/lib/pdf-export"
import { Plus, Trash2, Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ObjectiveBuilder() {
  const [objectiveData, setObjectiveData] = useState<ObjectiveData>(getDefaultObjectiveData())
  const [zoom, setZoom] = useState(0.5)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const savedData = loadObjectiveData()
    if (savedData) {
      setObjectiveData(savedData)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      saveObjectiveData(objectiveData)
    }, 1000)

    return () => clearTimeout(timer)
  }, [objectiveData])

  const handleReset = () => {
    if (confirm("Barcha ma'lumotlarni o'chirib tashlamoqchisiz? Bu amalni qaytarib bo'lmaydi.")) {
      clearObjectiveData()
      setObjectiveData(getDefaultObjectiveData())
    }
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await exportToPDF(objectiveData, `${objectiveData.personalInfo.fullName || "ma'lumotnoma"}.pdf`)
    } catch (error) {
      console.error("Export failed:", error)
      alert("PDF export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const addWorkExperience = () => {
    setObjectiveData({
      ...objectiveData,
      workExperience: [
        ...objectiveData.workExperience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const updateWorkExperience = (id: string, field: string, value: string) => {
    setObjectiveData({
      ...objectiveData,
      workExperience: objectiveData.workExperience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const deleteWorkExperience = (id: string) => {
    setObjectiveData({
      ...objectiveData,
      workExperience: objectiveData.workExperience.filter((exp) => exp.id !== id),
    })
  }

  const addFamilyMember = () => {
    setObjectiveData({
      ...objectiveData,
      familyMembers: [
        ...objectiveData.familyMembers,
        {
          id: Date.now().toString(),
          relationship: "",
          fullName: "",
          birthYear: "",
          birthPlace: "",
          occupation: "",
          location: "",
        },
      ],
    })
  }

  const updateFamilyMember = (id: string, field: string, value: string) => {
    setObjectiveData({
      ...objectiveData,
      familyMembers: objectiveData.familyMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member,
      ),
    })
  }

  const deleteFamilyMember = (id: string) => {
    setObjectiveData({
      ...objectiveData,
      familyMembers: objectiveData.familyMembers.filter((member) => member.id !== id),
    })
  }

  return (
    <div className="min-h-screen bg-muted/30 w-full">
      <header className="border-b bg-background sticky top-0 z-30 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between gap-2">
          <h1 className="text-xl lg:text-2xl font-bold pl-12 lg:pl-0">Ma'lumotnoma Builder</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="hidden sm:flex bg-transparent">
              <RotateCcw className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Qayta o'rnatish</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} className="sm:hidden bg-transparent">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={handleExportPDF} disabled={isExporting}>
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">{isExporting ? "Yuklanmoqda..." : "PDF Yuklab olish"}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="space-y-4 lg:space-y-6 w-full">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 gap-1 h-auto p-1">
                <TabsTrigger value="personal" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Shaxsiy Ma'lumot
                </TabsTrigger>
                <TabsTrigger value="experience" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Mehnat Faoliyati
                </TabsTrigger>
                <TabsTrigger value="family" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Qarindoshlari
                </TabsTrigger>
              </TabsList>

              {/* TAB 1: Personal Information */}
              <TabsContent value="personal">
                <Card className="p-4 lg:p-6">
                  <h2 className="text-lg lg:text-xl font-semibold mb-4">Shaxsiy Ma'lumot</h2>
                  <div className="space-y-4">
                    {/* Photo Upload */}
                    <div>
                      <Label htmlFor="photo">Surati</Label>
                      <div className="flex items-center gap-4">
                        {objectiveData.personalInfo.photo && (
                          <div className="w-20 h-24 border-2 border-gray-200">
                            <img
                              src={objectiveData.personalInfo.photo || "/placeholder.svg"}
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
                                  setObjectiveData({
                                    ...objectiveData,
                                    personalInfo: {
                                      ...objectiveData.personalInfo,
                                      photo: reader.result as string,
                                    },
                                  })
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                            className="cursor-pointer"
                          />
                          {objectiveData.personalInfo.photo && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setObjectiveData({
                                  ...objectiveData,
                                  personalInfo: {
                                    ...objectiveData.personalInfo,
                                    photo: "",
                                  },
                                })
                              }
                              className="mt-2"
                            >
                              O'chirish
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="fullName">To'liq Ismi</Label>
                      <Input
                        id="fullName"
                        value={objectiveData.personalInfo.fullName}
                        onChange={(e) =>
                          setObjectiveData({
                            ...objectiveData,
                            personalInfo: {
                              ...objectiveData.personalInfo,
                              fullName: e.target.value,
                            },
                          })
                        }
                        placeholder="Familiya Ismi Otasining ismi"
                      />
                    </div>

                    <div>
                      <Label htmlFor="currentWorkplace">Hozirgi Ish Joyi (Ixtiyoriy)</Label>
                      <textarea
                        id="currentWorkplace"
                        value={objectiveData.personalInfo.currentWorkplace}
                        onChange={(e) =>
                          setObjectiveData({
                            ...objectiveData,
                            personalInfo: {
                              ...objectiveData.personalInfo,
                              currentWorkplace: e.target.value,
                            },
                          })
                        }
                        placeholder="Hozirgi ish joyi va lavozimi..."
                        className="w-full p-2 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                        rows={2}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="birthYear">Tug'ilgan Yili</Label>
                        <Input
                          id="birthYear"
                          value={objectiveData.personalInfo.birthYear}
                          onChange={(e) =>
                            setObjectiveData({
                              ...objectiveData,
                              personalInfo: {
                                ...objectiveData.personalInfo,
                                birthYear: e.target.value,
                              },
                            })
                          }
                          placeholder="29.11.2003"
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthPlace">Tug'ilgan Joyi</Label>
                        <Input
                          id="birthPlace"
                          value={objectiveData.personalInfo.birthPlace}
                          onChange={(e) =>
                            setObjectiveData({
                              ...objectiveData,
                              personalInfo: {
                                ...objectiveData.personalInfo,
                                birthPlace: e.target.value,
                              },
                            })
                          }
                          placeholder="Shahar, Viloyat"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nationality">Millati</Label>
                        <Input
                          id="nationality"
                          value={objectiveData.personalInfo.nationality}
                          onChange={(e) =>
                            setObjectiveData({
                              ...objectiveData,
                              personalInfo: {
                                ...objectiveData.personalInfo,
                                nationality: e.target.value,
                              },
                            })
                          }
                          placeholder="O'zbek"
                        />
                      </div>
                      <div>
                        <Label htmlFor="partyAffiliation">Partiyaviyligi</Label>
                        <div className="flex gap-2">
                          <Input
                            id="partyAffiliation"
                            value={objectiveData.personalInfo.partyAffiliation}
                            onChange={(e) =>
                              setObjectiveData({
                                ...objectiveData,
                                personalInfo: {
                                  ...objectiveData.personalInfo,
                                  partyAffiliation: e.target.value,
                                },
                              })
                            }
                            placeholder="Turmush qurgan / Turmush qurmagan"
                            disabled={objectiveData.personalInfo.partyAffiliationNo}
                          />
                          <label className="flex items-center gap-2 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={objectiveData.personalInfo.partyAffiliationNo}
                              onChange={(e) =>
                                setObjectiveData({
                                  ...objectiveData,
                                  personalInfo: {
                                    ...objectiveData.personalInfo,
                                    partyAffiliationNo: e.target.checked,
                                    partyAffiliation: e.target.checked ? "yo'q" : "",
                                  },
                                })
                              }
                            />
                            <span className="text-sm">yo'q</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="educationLevel">Ta'lim Darajasi</Label>
                        <Input
                          id="educationLevel"
                          value={objectiveData.personalInfo.educationLevel}
                          onChange={(e) =>
                            setObjectiveData({
                              ...objectiveData,
                              personalInfo: {
                                ...objectiveData.personalInfo,
                                educationLevel: e.target.value,
                              },
                            })
                          }
                          placeholder="Bakalavr, Magistr"
                        />
                      </div>
                      <div>
                        <Label htmlFor="educationCompletion">Ta'limni Tamomlagan</Label>
                        <Input
                          id="educationCompletion"
                          value={objectiveData.personalInfo.educationCompletion}
                          onChange={(e) =>
                            setObjectiveData({
                              ...objectiveData,
                              personalInfo: {
                                ...objectiveData.personalInfo,
                                educationCompletion: e.target.value,
                              },
                            })
                          }
                          placeholder="Universitet nomi va yili"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="specialization">Mutaxassisligi</Label>
                        <Input
                          id="specialization"
                          value={objectiveData.personalInfo.specialization}
                          onChange={(e) =>
                            setObjectiveData({
                              ...objectiveData,
                              personalInfo: {
                                ...objectiveData.personalInfo,
                                specialization: e.target.value,
                              },
                            })
                          }
                          placeholder="Mutaxassislik soha"
                        />
                      </div>
                      <div>
                        <Label htmlFor="scientificDegree">Ilmiy Darajasi</Label>
                        <div className="flex gap-2">
                          <Input
                            id="scientificDegree"
                            value={objectiveData.personalInfo.scientificDegree}
                            onChange={(e) =>
                              setObjectiveData({
                                ...objectiveData,
                                personalInfo: {
                                  ...objectiveData.personalInfo,
                                  scientificDegree: e.target.value,
                                },
                              })
                            }
                            placeholder="PhD, DSc"
                            disabled={objectiveData.personalInfo.scientificDegreeNo}
                          />
                          <label className="flex items-center gap-2 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={objectiveData.personalInfo.scientificDegreeNo}
                              onChange={(e) =>
                                setObjectiveData({
                                  ...objectiveData,
                                  personalInfo: {
                                    ...objectiveData.personalInfo,
                                    scientificDegreeNo: e.target.checked,
                                    scientificDegree: e.target.checked ? "yo'q" : "",
                                  },
                                })
                              }
                            />
                            <span className="text-sm">yo'q</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scientificTitle">Ilmiy Unvoni</Label>
                        <div className="flex gap-2">
                          <Input
                            id="scientificTitle"
                            value={objectiveData.personalInfo.scientificTitle}
                            onChange={(e) =>
                              setObjectiveData({
                                ...objectiveData,
                                personalInfo: {
                                  ...objectiveData.personalInfo,
                                  scientificTitle: e.target.value,
                                },
                              })
                            }
                            placeholder="Professor, Dotsent"
                            disabled={objectiveData.personalInfo.scientificTitleNo}
                          />
                          <label className="flex items-center gap-2 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={objectiveData.personalInfo.scientificTitleNo}
                              onChange={(e) =>
                                setObjectiveData({
                                  ...objectiveData,
                                  personalInfo: {
                                    ...objectiveData.personalInfo,
                                    scientificTitleNo: e.target.checked,
                                    scientificTitle: e.target.checked ? "yo'q" : "",
                                  },
                                })
                              }
                            />
                            <span className="text-sm">yo'q</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="foreignLanguages">Chet Tillarini Biladi</Label>
                        <div className="flex gap-2">
                          <textarea
                            id="foreignLanguages"
                            value={objectiveData.personalInfo.foreignLanguages}
                            onChange={(e) =>
                              setObjectiveData({
                                ...objectiveData,
                                personalInfo: {
                                  ...objectiveData.personalInfo,
                                  foreignLanguages: e.target.value,
                                },
                              })
                            }
                            placeholder="Ingliz tili, Rus tili..."
                            className="w-full p-2 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                            rows={2}
                            disabled={objectiveData.personalInfo.foreignLanguagesNo}
                          />
                          <label className="flex items-center gap-2 whitespace-nowrap pt-2">
                            <input
                              type="checkbox"
                              checked={objectiveData.personalInfo.foreignLanguagesNo}
                              onChange={(e) =>
                                setObjectiveData({
                                  ...objectiveData,
                                  personalInfo: {
                                    ...objectiveData.personalInfo,
                                    foreignLanguagesNo: e.target.checked,
                                    foreignLanguages: e.target.checked ? "yo'q" : "",
                                  },
                                })
                              }
                            />
                            <span className="text-sm">yo'q</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="stateAwards">Davlat Mukofofi Bilan Taqdirlanganni</Label>
                      <div className="flex gap-2">
                        <textarea
                          id="stateAwards"
                          value={objectiveData.personalInfo.stateAwards}
                          onChange={(e) =>
                            setObjectiveData({
                              ...objectiveData,
                              personalInfo: {
                                ...objectiveData.personalInfo,
                                stateAwards: e.target.value,
                              },
                            })
                          }
                          placeholder="Mukofotlar va farzandlar soni..."
                          className="w-full p-2 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                          rows={2}
                          disabled={objectiveData.personalInfo.stateAwardsNo}
                        />
                        <label className="flex items-center gap-2 whitespace-nowrap pt-2">
                          <input
                            type="checkbox"
                            checked={objectiveData.personalInfo.stateAwardsNo}
                            onChange={(e) =>
                              setObjectiveData({
                                ...objectiveData,
                                personalInfo: {
                                  ...objectiveData.personalInfo,
                                  stateAwardsNo: e.target.checked,
                                  stateAwards: e.target.checked ? "yo'q" : "",
                                },
                              })
                            }
                          />
                          <span className="text-sm">yo'q</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="deputyPositions">Deputat va Saylanadigan Organlar A'zoligi</Label>
                      <div className="flex gap-2">
                        <textarea
                          id="deputyPositions"
                          value={objectiveData.personalInfo.deputyPositions}
                          onChange={(e) =>
                            setObjectiveData({
                              ...objectiveData,
                              personalInfo: {
                                ...objectiveData.personalInfo,
                                deputyPositions: e.target.value,
                              },
                            })
                          }
                          placeholder="Respublika, viloyat, shahar va tuman Kengashi deputati..."
                          className="w-full p-2 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                          rows={2}
                          disabled={objectiveData.personalInfo.deputyPositionsNo}
                        />
                        <label className="flex items-center gap-2 whitespace-nowrap pt-2">
                          <input
                            type="checkbox"
                            checked={objectiveData.personalInfo.deputyPositionsNo}
                            onChange={(e) =>
                              setObjectiveData({
                                ...objectiveData,
                                personalInfo: {
                                  ...objectiveData.personalInfo,
                                  deputyPositionsNo: e.target.checked,
                                  deputyPositions: e.target.checked ? "yo'q" : "",
                                },
                              })
                            }
                          />
                          <span className="text-sm">yo'q</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* TAB 2: Work Experience */}
              <TabsContent value="experience">
                <Card className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg lg:text-xl font-semibold">Mehnat Faoliyati</h2>
                    <Button onClick={addWorkExperience} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Qo'shish
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {objectiveData.workExperience.map((exp) => (
                      <div key={exp.id} className="border rounded-lg p-3 lg:p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Ish Tajribasi</h3>
                          <Button variant="ghost" size="sm" onClick={() => deleteWorkExperience(exp.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label>Boshlanish Vaqti</Label>
                            <Input
                              value={exp.startDate}
                              onChange={(e) => updateWorkExperience(exp.id, "startDate", e.target.value)}
                              placeholder="09/2021"
                            />
                          </div>
                          <div>
                            <Label>Tugallash Vaqti</Label>
                            <Input
                              value={exp.endDate}
                              onChange={(e) => updateWorkExperience(exp.id, "endDate", e.target.value)}
                              placeholder="07/2025"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Tavsifi</Label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateWorkExperience(exp.id, "description", e.target.value)}
                            placeholder="09/2021-07/2025 yy. - Muxammad al-Xorazmiy nomidagi Toshkent Axborot texnologiyalari universiteti talabasi"
                            className="w-full p-2 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}

                    {objectiveData.workExperience.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        Mehnat faoliyati qo'shilmagan. "Qo'shish" tugmasini bosing.
                      </p>
                    )}
                  </div>
                </Card>
              </TabsContent>

              {/* TAB 3: Family Members */}
              <TabsContent value="family">
                <Card className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg lg:text-xl font-semibold">Qarindoshlari Jadvali</h2>
                    <Button onClick={addFamilyMember} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Qo'shish
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {objectiveData.familyMembers.map((member) => (
                      <div key={member.id} className="border rounded-lg p-3 lg:p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Oila A'zosi</h3>
                          <Button variant="ghost" size="sm" onClick={() => deleteFamilyMember(member.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>

                        <div>
                          <Label>Qarindoshligi</Label>
                          <Input
                            value={member.relationship}
                            onChange={(e) => updateFamilyMember(member.id, "relationship", e.target.value)}
                            placeholder="Otasi, Onasi, Turmush o'rtog'i, Farzandi"
                          />
                        </div>

                        <div>
                          <Label>To'liq Ismi</Label>
                          <Input
                            value={member.fullName}
                            onChange={(e) => updateFamilyMember(member.id, "fullName", e.target.value)}
                            placeholder="Familiya Ismi Otasining ismi"
                          />
                        </div>

                        <div>
                          <Label>Tug'ilgan Yili va Joyi</Label>
                          <Input
                            value={member.birthInfo}
                            onChange={(e) => updateFamilyMember(member.id, "birthInfo", e.target.value)}
                            placeholder="1975 yil, Nofaqada O'zbekiston Respublikasi"
                          />
                        </div>

                        <div>
                          <Label>Ish Joyi va Lavozimi</Label>
                          <Input
                            value={member.occupation}
                            onChange={(e) => updateFamilyMember(member.id, "occupation", e.target.value)}
                            placeholder="Lavozim va muassasa"
                          />
                        </div>

                        <div>
                          <Label>Turar Joyi</Label>
                          <Input
                            value={member.location}
                            onChange={(e) => updateFamilyMember(member.id, "location", e.target.value)}
                            placeholder="Shahar, Viloyat"
                          />
                        </div>
                      </div>
                    ))}

                    {objectiveData.familyMembers.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        Oila a'zolari qo'shilmagan. "Qo'shish" tugmasini bosing.
                      </p>
                    )}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:sticky lg:top-24 h-fit order-first lg:order-last">
            <Card className="p-3 lg:p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base lg:text-lg font-semibold">Ko'rish</h2>
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
                <ObjectivePreview data={objectiveData} zoom={zoom} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
