"use client"

import type { ObjectiveData } from "@/lib/types"

interface CVPreviewProps {
  data: ObjectiveData
  zoom: number
}

export function CVPreview({ data, zoom }: CVPreviewProps) {
  const { personalInfo } = data

  return (
    <div
      className="resume-preview-wrapper"
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "top center",
      }}
    >
      <div id="cv-preview" className="resume-preview bg-white">
        {/* Header with title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">MA'LUMOTNOMA</h1>
          <p className="text-sm text-gray-600">{personalInfo.fullName}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6 pb-4 border-b border-gray-300">
          <div>
            <p className="text-sm font-semibold">Tug'ilgan yili:</p>
            <p className="text-sm">{personalInfo.birthYear || "_______________"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Tug'ilgan joyi:</p>
            <p className="text-sm">{personalInfo.birthPlace || "_______________"}</p>
          </div>
        </div>

        {/* Current workplace */}
        {personalInfo.currentWorkplace && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Hozirgi ish joyi:</p>
            <p className="text-sm">{personalInfo.currentWorkplace}</p>
          </div>
        )}

        {/* Nationality */}
        {personalInfo.nationality && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Millati:</p>
            <p className="text-sm">{personalInfo.nationality}</p>
          </div>
        )}

        {/* Party affiliation */}
        {personalInfo.partyAffiliation && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Partiyaviyiligi:</p>
            <p className="text-sm">{personalInfo.partyAffiliation}</p>
          </div>
        )}

        {/* Education level */}
        {personalInfo.educationLevel && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Ma'lumoti:</p>
            <p className="text-sm">{personalInfo.educationLevel}</p>
          </div>
        )}

        {/* Education completion */}
        {personalInfo.educationCompletion && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Tamomlagan:</p>
            <p className="text-sm">{personalInfo.educationCompletion}</p>
          </div>
        )}

        {/* Specialization */}
        {personalInfo.specialization && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Ma'lumoti bo'yicha mutaxassisligi:</p>
            <p className="text-sm">{personalInfo.specialization}</p>
          </div>
        )}

        {/* Scientific degree */}
        {personalInfo.scientificDegree && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Ilmiy darajasi:</p>
            <p className="text-sm">{personalInfo.scientificDegree}</p>
          </div>
        )}

        {/* Scientific title */}
        {personalInfo.scientificTitle && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Ilmiy unvoni:</p>
            <p className="text-sm">{personalInfo.scientificTitle}</p>
          </div>
        )}

        {/* Foreign languages */}
        {personalInfo.foreignLanguages && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Chet tillarini bilish:</p>
            <p className="text-sm">{personalInfo.foreignLanguages}</p>
          </div>
        )}

        {/* State awards */}
        {personalInfo.stateAwards && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Davlat mukofotlari:</p>
            <p className="text-sm">{personalInfo.stateAwards}</p>
          </div>
        )}

        {/* Deputy positions */}
        {personalInfo.deputyPositions && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Deputat lavozimi:</p>
            <p className="text-sm">{personalInfo.deputyPositions}</p>
          </div>
        )}

        {/* Photo */}
        {personalInfo.photo && (
          <div className="mt-6 pt-4 border-t border-gray-300">
            <div className="w-32 h-40 border-2 border-gray-300 overflow-hidden">
              <img
                src={personalInfo.photo || "/placeholder.svg"}
                alt={personalInfo.fullName || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
