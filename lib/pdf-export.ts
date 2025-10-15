import jsPDF from "jspdf"
import type { ResumeData } from "./types"

// Helper function to format rich text to plain text for PDF
function formatRichTextForPDF(text: string): string[] {
  if (!text) return []

  // Remove markdown formatting and split into lines
  const lines = text
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers
    .replace(/\*(.*?)\*/g, "$1") // Remove italic markers
    .split("\n")
    .filter((line) => line.trim())

  return lines
}

// Helper to wrap text to fit within a width
function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const width = doc.getTextWidth(testLine)

    if (width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  })

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

export async function exportToPDF(resumeData: ResumeData, filename: string) {
  try {
    // Create PDF with A4 dimensions
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const contentWidth = pageWidth - 2 * margin
    let yPosition = margin

    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text("resume.builder.app", pageWidth - margin, 10, { align: "right" })

    // Reset text color for content
    doc.setTextColor(0, 0, 0)

    const { personalInfo, summary, experiences, education, projects, skills, languages } = resumeData

    // Helper to check if we need a new page
    const checkNewPage = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
        // Add website name on new page too
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text("resume.builder.app", pageWidth - margin, 10, { align: "right" })
        doc.setTextColor(0, 0, 0)
        return true
      }
      return false
    }

    // Header - Name and Title
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(personalInfo.fullName || "Your Name", margin, yPosition)
    yPosition += 8

    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 100, 100)
    doc.text(personalInfo.jobTitle || "Job Title", margin, yPosition)
    yPosition += 10

    doc.setTextColor(0, 0, 0)

    // Contact Information
    doc.setFontSize(9)
    doc.setTextColor(80, 80, 80)
    const contactInfo: string[] = []
    if (personalInfo.email) contactInfo.push(`Email: ${personalInfo.email}`)
    if (personalInfo.phone) contactInfo.push(`Phone: ${personalInfo.phone}`)
    if (personalInfo.address) contactInfo.push(`Address: ${personalInfo.address}`)
    if (personalInfo.linkedin) contactInfo.push(`LinkedIn: ${personalInfo.linkedin}`)
    if (personalInfo.github) contactInfo.push(`GitHub: ${personalInfo.github}`)
    if (personalInfo.portfolio) contactInfo.push(`Portfolio: ${personalInfo.portfolio}`)

    const contactLine = contactInfo.join(" | ")
    const wrappedContact = wrapText(doc, contactLine, contentWidth)
    wrappedContact.forEach((line) => {
      doc.text(line, margin, yPosition)
      yPosition += 4
    })
    yPosition += 5

    // Summary
    if (summary) {
      checkNewPage(20)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("PROFESSIONAL SUMMARY", margin, yPosition)
      yPosition += 2
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 5

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      const summaryLines = formatRichTextForPDF(summary)
      summaryLines.forEach((line) => {
        const wrappedLines = wrapText(doc, line, contentWidth)
        wrappedLines.forEach((wrappedLine) => {
          checkNewPage(5)
          doc.text(wrappedLine, margin, yPosition)
          yPosition += 5
        })
      })
      yPosition += 5
    }

    // Work Experience
    if (experiences.length > 0) {
      checkNewPage(20)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("WORK EXPERIENCE", margin, yPosition)
      yPosition += 2
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 7

      experiences.forEach((exp) => {
        checkNewPage(25)

        // Position and Company
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text(exp.position, margin, yPosition)

        // Date on the right
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100)
        const dateText = `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
        yPosition += 5

        doc.setFontSize(10)
        doc.setTextColor(80, 80, 80)
        doc.text(exp.company, margin, yPosition)
        yPosition += 5

        // Description
        doc.setTextColor(0, 0, 0)
        doc.setFont("helvetica", "normal")
        const descLines = formatRichTextForPDF(exp.description)
        descLines.forEach((line) => {
          const cleanLine = line.replace(/^• /, "• ")
          const wrappedLines = wrapText(doc, cleanLine, contentWidth)
          wrappedLines.forEach((wrappedLine) => {
            checkNewPage(5)
            doc.text(wrappedLine, margin, yPosition)
            yPosition += 4.5
          })
        })
        yPosition += 5
      })
    }

    // Education
    if (education.length > 0) {
      checkNewPage(20)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("EDUCATION", margin, yPosition)
      yPosition += 2
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 7

      education.forEach((edu) => {
        checkNewPage(20)

        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text(edu.degree, margin, yPosition)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100)
        const dateText = `${edu.startDate} - ${edu.current ? "Present" : edu.endDate}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
        yPosition += 5

        doc.setFontSize(10)
        doc.setTextColor(80, 80, 80)
        doc.text(edu.institution, margin, yPosition)
        yPosition += 4
        if (edu.field) {
          doc.text(edu.field, margin, yPosition)
          yPosition += 4
        }
        yPosition += 4
        doc.setTextColor(0, 0, 0)
      })
    }

    // Projects
    if (projects.length > 0) {
      checkNewPage(20)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("PROJECTS", margin, yPosition)
      yPosition += 2
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 7

      projects.forEach((project) => {
        checkNewPage(25)

        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text(project.name, margin, yPosition)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100)
        const dateText = `${project.startDate} - ${project.current ? "Present" : project.endDate}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
        yPosition += 5

        if (project.technologies) {
          doc.setFontSize(9)
          doc.setTextColor(80, 80, 80)
          doc.setFont("helvetica", "italic")
          doc.text(project.technologies, margin, yPosition)
          yPosition += 4
        }

        if (project.link) {
          doc.setFont("helvetica", "normal")
          doc.setTextColor(0, 0, 255)
          doc.text(project.link, margin, yPosition)
          yPosition += 5
        }

        doc.setTextColor(0, 0, 0)
        doc.setFont("helvetica", "normal")
        const descLines = formatRichTextForPDF(project.description)
        descLines.forEach((line) => {
          const cleanLine = line.replace(/^• /, "• ")
          const wrappedLines = wrapText(doc, cleanLine, contentWidth)
          wrappedLines.forEach((wrappedLine) => {
            checkNewPage(5)
            doc.text(wrappedLine, margin, yPosition)
            yPosition += 4.5
          })
        })
        yPosition += 5
      })
    }

    // Skills
    if (skills.length > 0) {
      checkNewPage(20)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("SKILLS", margin, yPosition)
      yPosition += 2
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 7

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      const skillsText = skills.join(" • ")
      const wrappedSkills = wrapText(doc, skillsText, contentWidth)
      wrappedSkills.forEach((line) => {
        checkNewPage(5)
        doc.text(line, margin, yPosition)
        yPosition += 5
      })
      yPosition += 5
    }

    // Languages
    if (languages.length > 0) {
      checkNewPage(20)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("LANGUAGES", margin, yPosition)
      yPosition += 2
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 7

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      languages.forEach((lang) => {
        checkNewPage(5)
        doc.text(`${lang.name} - ${lang.level}`, margin, yPosition)
        yPosition += 5
      })
    }

    // Save the PDF
    doc.save(filename)
  } catch (error) {
    console.error("Error exporting PDF:", error)
    throw error
  }
}
