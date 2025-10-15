import jsPDF from "jspdf"
import type { ResumeData } from "./types"

export async function exportToPDF(resumeData: ResumeData, filename: string) {
  try {
    // Use browser's print functionality which fully supports modern CSS
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      throw new Error('Please allow popups to export PDF')
    }

    const element = document.getElementById('resume-preview')
    if (!element) {
      throw new Error('Resume preview element not found')
    }

    // Get all stylesheets
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n')
        } catch (e) {
          // Handle CORS issues with external stylesheets
          const link = document.querySelector(`link[href="${(styleSheet as any).href}"]`)
          return link ? `<link rel="stylesheet" href="${(styleSheet as any).href}">` : ''
        }
      })
      .join('\n')

    // Create print document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${filename}</title>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            
            body {
              margin: 0;
              padding: 0;
              background: white;
            }
            
            .print-container {
              width: 210mm;
              min-height: 297mm;
              background: white;
              margin: 0 auto;
            }
            
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              
              .print-container {
                margin: 0;
                box-shadow: none;
              }
            }
            
            ${styles}
          </style>
        </head>
        <body>
          <div class="print-container">
            ${element.outerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 100);
            }
          </script>
        </body>
      </html>
    `)
    
    printWindow.document.close()
  } catch (error) {
    console.error('Error exporting PDF:', error)
    throw error
  }
}
