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
          <div className="text-center mb-8">
            <h1 className="text-lg font-bold mb-2">MA'LUMOTNOMA</h1>
            <h2 className="text-base font-semibold">{personalInfo.fullName}</h2>
          </div>

          {/* Current Workplace and Photo */}
          <div className="flex gap-8 mb-8">
            <div className="flex-1">
              {personalInfo.currentWorkplace && (
                <p className="text-sm font-semibold mb-4">{personalInfo.currentWorkplace}</p>
              )}
            </div>
            {/* Photo on right */}
            {personalInfo.photo && (
              <div className="w-28 h-36 border-2 border-gray-800 flex-shrink-0">
                <img
                  src={personalInfo.photo || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Birth Year and Place at top */}
          <div className="grid grid-cols-2 gap-8 mb-6 text-xs">
            <div>
              <p className="font-semibold">Tug'ilgan yili:</p>
              <p>({personalInfo.birthYear})</p>
            </div>
            <div>
              <p className="font-semibold">Tug'ilgan joyi:</p>
              <p>({personalInfo.birthPlace})</p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-8 text-xs">
            {/* Left Column */}
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Millati:</p>
                <p>({personalInfo.nationality})</p>
              </div>

              <div>
                <p className="font-semibold">Ma'lumoti:</p>
                <p>({personalInfo.educationLevel})</p>
              </div>

              {personalInfo.specialization && (
                <div>
                  <p className="font-semibold">Ma'lumoti bo'yicha mutaxasisligi:</p>
                  <p>({personalInfo.specialization})</p>
                </div>
              )}

              <div>
                <p className="font-semibold">Ilmiy darajasi:</p>
                <p>({personalInfo.scientificDegree})</p>
              </div>

              <div>
                <p className="font-semibold">Qaysi chet tillarini biladi:</p>
                <p>({personalInfo.foreignLanguages})</p>
              </div>

              <div>
                <p className="font-semibold">Davlat mukofoti bilan taqdirlanganmi:</p>
                <p>({personalInfo.stateAwards})</p>
              </div>

              <div>
                <p className="font-semibold">
                  Xalq deputatlari respublika, viloyat, shahar va tuman Kengashi deputatimi yoki boshqa saylanadigan
                  organlarning a'zosimi:
                </p>
                <p>({personalInfo.deputyPositions})</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Partiyaviyligi:</p>
                <p>({personalInfo.partyAffiliation})</p>
              </div>

              <div>
                <p className="font-semibold">Tamomlagan:</p>
                <p>({personalInfo.educationCompletion})</p>
              </div>

              <div>
                <p className="font-semibold">Ilmiy unvoni:</p>
                <p>({personalInfo.scientificTitle})</p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-400">
              <h2 className="text-center font-bold text-xs mb-4">MEHNAT FAOLIYATI</h2>
              <div className="space-y-2">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex gap-4">
                      <div className="font-semibold whitespace-nowrap">
                        {exp.startDate}-{exp.isCurrent ? "х.х.в." : exp.endDate} йил.
                      </div>
                      <div className="flex-1">- {exp.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
