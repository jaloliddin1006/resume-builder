"use client"

import type { ObjectiveData } from "@/lib/types"

interface ObjectivePreviewProps {
  data: ObjectiveData
  zoom: number
}

export function ObjectivePreview({ data, zoom }: ObjectivePreviewProps) {
  const { personalInfo, workExperience, familyMembers } = data

  return (
    <div
      className="objective-preview-wrapper"
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "top center",
      }}
    >
      <div id="objective-preview" className="objective-preview bg-white p-8 text-sm leading-relaxed w-[210mm]">
        {/* Page 1 */}
        <div className="mb-12 pb-8 border-b-2 min-h-[297mm]">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-lg font-bold">MA'LUMOTNOMA</h1>
          </div>

          {/* Personal Info and Photo */}
          <div className="flex gap-6 mb-6">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="font-semibold">Tug'ilgan yili:</p>
                  <p>{personalInfo.birthYear}</p>
                </div>
                <div>
                  <p className="font-semibold">Tug'ilgan joyi:</p>
                  <p>{personalInfo.birthPlace}</p>
                </div>
                <div>
                  <p className="font-semibold">Millati:</p>
                  <p>{personalInfo.nationality}</p>
                </div>
                <div>
                  <p className="font-semibold">Partiyaviyligi:</p>
                  <p>{personalInfo.partyAffiliation}</p>
                </div>
              </div>

              {/* Education Info */}
              {personalInfo.educationLevel && (
                <div className="mt-4">
                  <p className="font-semibold text-xs mb-2">Ta'lim:</p>
                  <p className="text-xs">
                    {personalInfo.educationLevel} - {personalInfo.educationCompletion}
                  </p>
                  {personalInfo.specialization && (
                    <p className="text-xs">Mutaxassisligi: {personalInfo.specialization}</p>
                  )}
                </div>
              )}

              {/* Scientific Info */}
              {(personalInfo.scientificDegree || personalInfo.scientificTitle) && (
                <div className="mt-4">
                  <p className="font-semibold text-xs mb-2">Ilmiy Darajasi va Unvoni:</p>
                  {personalInfo.scientificDegree && (
                    <p className="text-xs">Darajasi: {personalInfo.scientificDegree}</p>
                  )}
                  {personalInfo.scientificTitle && <p className="text-xs">Unvoni: {personalInfo.scientificTitle}</p>}
                </div>
              )}

              {/* Foreign Languages */}
              {personalInfo.foreignLanguages && (
                <div className="mt-4">
                  <p className="font-semibold text-xs mb-2">Chet Tillarini Biladi:</p>
                  <p className="text-xs">{personalInfo.foreignLanguages}</p>
                </div>
              )}

              {/* State Awards */}
              {personalInfo.stateAwards && (
                <div className="mt-4">
                  <p className="font-semibold text-xs mb-2">Davlat Mukofofi:</p>
                  <p className="text-xs">{personalInfo.stateAwards}</p>
                </div>
              )}

              {/* Deputy Positions */}
              {personalInfo.deputyPositions && (
                <div className="mt-4">
                  <p className="font-semibold text-xs mb-2">Saylanadigan Organlar A'zoligi:</p>
                  <p className="text-xs">{personalInfo.deputyPositions}</p>
                </div>
              )}
            </div>

            {/* Photo */}
            {personalInfo.photo && (
              <div className="w-24 h-32 border-2 border-gray-400 flex-shrink-0">
                <img
                  src={personalInfo.photo || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mt-6">
              <h2 className="text-center font-bold text-xs mb-3">MEHNAT FAOLIYATI</h2>
              <div className="space-y-2">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <p className="font-semibold">
                      {exp.startDate}-{exp.endDate} yy. - {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t">
            <p className="text-xs font-semibold">{personalInfo.fullName}</p>
            {personalInfo.currentWorkplace && (
              <p className="text-xs text-gray-700 mt-1">{personalInfo.currentWorkplace}</p>
            )}
          </div>
        </div>

        {/* Page 2 - Family Members Table */}
        {familyMembers.length > 0 && (
          <div className="min-h-[297mm]">
            <h2 className="text-center font-bold text-xs mb-4">
              {personalInfo.fullName} ning yaqin qarindoshlari haqida ma'lumot
            </h2>
            <table className="w-full border-collapse border border-gray-400 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2 text-left">Qarin doshligi</th>
                  <th className="border border-gray-400 p-2 text-left">Familyasi, ismi va otasining ismi</th>
                  <th className="border border-gray-400 p-2 text-left">Tug'ilgan yili va joyi</th>
                  <th className="border border-gray-400 p-2 text-left">Ish joyi va lavozimi</th>
                  <th className="border border-gray-400 p-2 text-left">Turar joyi</th>
                </tr>
              </thead>
              <tbody>
                {familyMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="border border-gray-400 p-2">{member.relationship}</td>
                    <td className="border border-gray-400 p-2">{member.fullName}</td>
                    <td className="border border-gray-400 p-2">{member.birthInfo}</td>
                    <td className="border border-gray-400 p-2">{member.occupation}</td>
                    <td className="border border-gray-400 p-2">{member.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
