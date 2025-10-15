"use client"

import type { ResumeData } from "@/lib/types"
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from "lucide-react"

interface ResumePreviewProps {
  data: ResumeData
  zoom: number
}

function formatRichText(text: string) {
  if (!text) return ""

  // Convert markdown-style formatting to HTML
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
    .replace(/^• (.+)$/gm, "<li>$1</li>") // Bullet points

  // Wrap list items in ul
  if (formatted.includes("<li>")) {
    formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
  }

  return formatted
}

export function ResumePreview({ data, zoom }: ResumePreviewProps) {
  const { personalInfo, summary, experiences, education, projects, skills, languages } = data

  return (
    <div
      id="resume-preview"
      className="resume-preview bg-white"
      style={{ 
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        transform: `scale(${zoom})`, 
        transformOrigin: "top center",
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        marginBottom: zoom < 1 ? `${(1 - zoom) * 297}mm` : '0'
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{personalInfo.jobTitle || "Job Title"}</h2>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <span>{personalInfo.github}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 pb-1 border-b-2 border-gray-300">Professional Summary</h3>
          <div
            className="text-sm text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatRichText(summary) }}
          />
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 pb-1 border-b-2 border-gray-300">Work Experience</h3>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-semibold text-base">{exp.position}</h4>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div
                  className="text-sm text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatRichText(exp.description) }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 pb-1 border-b-2 border-gray-300">Education</h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-base">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                  </div>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 pb-1 border-b-2 border-gray-300">Projects</h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-base">{project.name}</h4>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    {project.technologies && <p className="text-sm text-gray-600 italic">{project.technologies}</p>}
                  </div>
                  <span className="text-sm text-gray-500">
                    {project.startDate} - {project.current ? "Present" : project.endDate}
                  </span>
                </div>
                <div
                  className="text-sm text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatRichText(project.description) }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 pb-1 border-b-2 border-gray-300">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 pb-1 border-b-2 border-gray-300">Languages</h3>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <div key={lang.id} className="text-sm">
                <span className="font-medium">{lang.name}</span>
                <span className="text-gray-600"> - {lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
