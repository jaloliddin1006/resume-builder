"use client"

import { useRef } from "react"
import { Bold, Italic, Strikethrough, UnderlineIcon, List, ListOrdered, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className = "" }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const applyFormat = (format: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    if (!selectedText && format !== "bullet" && format !== "numbered") return

    let formattedText = ""
    let newCursorPos = end

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        newCursorPos = end + 4
        break
      case "italic":
        formattedText = `*${selectedText}*`
        newCursorPos = end + 2
        break
      case "strikethrough":
        formattedText = `~~${selectedText}~~`
        newCursorPos = end + 4
        break
      case "underline":
        formattedText = `__${selectedText}__`
        newCursorPos = end + 4
        break
      case "bullet":
        formattedText = selectedText ? `• ${selectedText}` : "• "
        newCursorPos = end + 2
        break
      case "numbered":
        formattedText = selectedText ? `1. ${selectedText}` : "1. "
        newCursorPos = end + 3
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        newCursorPos = end + 3
        break
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end)
    onChange(newValue)

    // Restore focus and cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-1 p-2 border border-b-0 rounded-t-lg bg-muted/30">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat("bold")}
          title="Bold"
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat("italic")}
          title="Italic"
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat("strikethrough")}
          title="Strikethrough"
          className="h-8 w-8 p-0"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat("underline")}
          title="Underline"
          className="h-8 w-8 p-0"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat("bullet")}
          title="Bullet List"
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat("numbered")}
          title="Numbered List"
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat("link")}
          title="Insert Link"
          className="h-8 w-8 p-0"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[150px] p-3 border rounded-b-lg resize-y focus:outline-none focus:ring-2 focus:ring-ring"
        rows={6}
      />
    </div>
  )
}
