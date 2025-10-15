"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Settings2, ChevronDown } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import html2canvas from "html2canvas"
import type { JSX } from "react"

const languages = [
  { value: "python", label: "Python", icon: "PY" },
  { value: "javascript", label: "JavaScript", icon: "JS" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "cpp", label: "C++", icon: "C++" },
  { value: "rust", label: "Rust", icon: "🦀" },
  { value: "go", label: "Go", icon: "GO" },
]

const themes = [
  { value: "dracula", label: "Dracula - Dark", bg: "#282a36", text: "#f8f8f2" },
  { value: "monokai", label: "Monokai", bg: "#272822", text: "#f8f8f2" },
  { value: "github-dark", label: "GitHub Dark", bg: "#0d1117", text: "#c9d1d9" },
  { value: "nord", label: "Nord", bg: "#2e3440", text: "#d8dee9" },
  { value: "one-dark", label: "One Dark", bg: "#282c34", text: "#abb2bf" },
]

const gradients = [
  { value: "spring", label: "Spring warmth", colors: ["#fbc2eb", "#a6c1ee"] },
  { value: "sunset", label: "Sunset", colors: ["#ff9a9e", "#fecfef"] },
  { value: "ocean", label: "Ocean", colors: ["#a8edea", "#fed6e3"] },
  { value: "forest", label: "Forest", colors: ["#d299c2", "#fef9d7"] },
  { value: "purple", label: "Purple dream", colors: ["#c471f5", "#fa71cd"] },
  { value: "mint", label: "Mint", colors: ["#89f7fe", "#66a6ff"] },
]

const backgroundTypes = [
  { value: "solid", label: "Solid" },
  { value: "gradient", label: "Gradient" },
]

const fontFamilies = [
  { value: "roboto", label: "Roboto Mono" },
  { value: "fira", label: "Fira Code" },
  { value: "jetbrains", label: "JetBrains Mono" },
  { value: "source", label: "Source Code Pro" },
  { value: "cascadia", label: "Cascadia Code" },
]

const fontSizes = [
  { value: "12", label: "12px" },
  { value: "14", label: "14px" },
  { value: "16", label: "16px" },
  { value: "18", label: "18px" },
  { value: "20", label: "20px" },
]

const tabSizes = [
  { value: "2", label: "2 spaces" },
  { value: "4", label: "4 spaces" },
  { value: "8", label: "8 spaces" },
]

const highlightCode = (code: string, language: string, theme: { bg: string; text: string }): JSX.Element[] => {
  const keywords: Record<string, string[]> = {
    python: [
      "def",
      "class",
      "if",
      "else",
      "elif",
      "for",
      "while",
      "return",
      "import",
      "from",
      "as",
      "try",
      "except",
      "finally",
      "with",
      "lambda",
      "yield",
      "async",
      "await",
      "pass",
      "break",
      "continue",
      "raise",
      "assert",
      "global",
      "nonlocal",
      "del",
      "in",
      "is",
      "not",
      "and",
      "or",
    ],
    javascript: [
      "function",
      "const",
      "let",
      "var",
      "if",
      "else",
      "for",
      "while",
      "return",
      "import",
      "export",
      "from",
      "as",
      "try",
      "catch",
      "finally",
      "async",
      "await",
      "class",
      "extends",
      "new",
      "this",
      "super",
      "static",
      "typeof",
      "instanceof",
      "delete",
      "void",
      "yield",
      "break",
      "continue",
    ],
    java: [
      "public",
      "private",
      "protected",
      "class",
      "interface",
      "extends",
      "implements",
      "static",
      "final",
      "void",
      "int",
      "String",
      "boolean",
      "double",
      "float",
      "long",
      "short",
      "byte",
      "char",
      "if",
      "else",
      "for",
      "while",
      "return",
      "new",
      "this",
      "super",
      "try",
      "catch",
      "finally",
      "throw",
      "throws",
      "import",
      "package",
      "abstract",
      "synchronized",
      "volatile",
      "transient",
      "native",
      "strictfp",
    ],
    cpp: [
      "int",
      "void",
      "char",
      "float",
      "double",
      "bool",
      "class",
      "struct",
      "public",
      "private",
      "protected",
      "virtual",
      "static",
      "const",
      "if",
      "else",
      "for",
      "while",
      "return",
      "new",
      "delete",
      "this",
      "namespace",
      "using",
      "template",
      "typename",
      "try",
      "catch",
      "throw",
      "auto",
      "nullptr",
      "constexpr",
      "inline",
      "extern",
      "friend",
      "operator",
      "sizeof",
      "typedef",
      "union",
      "enum",
    ],
    rust: [
      "fn",
      "let",
      "mut",
      "const",
      "static",
      "if",
      "else",
      "match",
      "loop",
      "while",
      "for",
      "return",
      "struct",
      "enum",
      "trait",
      "impl",
      "pub",
      "mod",
      "use",
      "as",
      "where",
      "self",
      "Self",
      "super",
      "crate",
      "async",
      "await",
      "move",
      "ref",
      "type",
      "unsafe",
      "extern",
      "dyn",
      "break",
      "continue",
    ],
    go: [
      "func",
      "var",
      "const",
      "if",
      "else",
      "for",
      "range",
      "return",
      "struct",
      "interface",
      "type",
      "package",
      "import",
      "defer",
      "go",
      "chan",
      "select",
      "case",
      "default",
      "switch",
      "fallthrough",
      "break",
      "continue",
    ],
  }

  const builtins: Record<string, string[]> = {
    python: [
      "print",
      "len",
      "range",
      "str",
      "int",
      "float",
      "list",
      "dict",
      "set",
      "tuple",
      "bool",
      "type",
      "isinstance",
      "open",
      "input",
      "enumerate",
      "zip",
      "map",
      "filter",
      "sorted",
      "sum",
      "min",
      "max",
      "abs",
      "round",
      "all",
      "any",
    ],
    javascript: [
      "console",
      "log",
      "Array",
      "Object",
      "String",
      "Number",
      "Boolean",
      "Math",
      "Date",
      "JSON",
      "Promise",
      "setTimeout",
      "setInterval",
      "parseInt",
      "parseFloat",
      "isNaN",
      "isFinite",
    ],
    java: [
      "System",
      "out",
      "println",
      "print",
      "String",
      "Integer",
      "Double",
      "Boolean",
      "Math",
      "ArrayList",
      "HashMap",
      "HashSet",
      "List",
      "Map",
      "Set",
    ],
    cpp: [
      "std",
      "cout",
      "cin",
      "endl",
      "vector",
      "string",
      "map",
      "set",
      "pair",
      "make_pair",
      "printf",
      "scanf",
      "malloc",
      "free",
    ],
    rust: [
      "println",
      "print",
      "vec",
      "String",
      "Vec",
      "Option",
      "Some",
      "None",
      "Result",
      "Ok",
      "Err",
      "Box",
      "Rc",
      "Arc",
      "Cell",
      "RefCell",
    ],
    go: [
      "fmt",
      "Println",
      "Printf",
      "Sprintf",
      "make",
      "len",
      "cap",
      "append",
      "copy",
      "delete",
      "panic",
      "recover",
      "close",
    ],
  }

  const langKeywords = keywords[language] || []
  const langBuiltins = builtins[language] || []

  // Color scheme based on popular themes
  const colors = {
    keyword: "#ff79c6", // pink
    builtin: "#8be9fd", // cyan
    string: "#f1fa8c", // yellow
    comment: "#6272a4", // gray-blue
    number: "#bd93f9", // purple
    function: "#50fa7b", // green
    operator: "#ff79c6", // pink
  }

  const lines = code.split("\n")
  return lines.map((line, lineIndex) => {
    const tokens: JSX.Element[] = []
    let currentPos = 0

    // Check for comments
    const commentMatch = line.match(/(#|\/\/)(.*)$/)
    if (commentMatch) {
      const beforeComment = line.substring(0, commentMatch.index)
      const comment = line.substring(commentMatch.index!)

      // Process before comment
      if (beforeComment) {
        tokens.push(...tokenizeLine(beforeComment, langKeywords, langBuiltins, colors, currentPos))
        currentPos += beforeComment.length
      }

      // Add comment
      tokens.push(
        <span key={`comment-${lineIndex}-${currentPos}`} style={{ color: colors.comment }}>
          {comment}
        </span>,
      )
    } else {
      tokens.push(...tokenizeLine(line, langKeywords, langBuiltins, colors, currentPos))
    }

    return (
      <div key={lineIndex} className="font-mono" style={{ minHeight: "1.5em" }}>
        {tokens.length > 0 ? tokens : <span>{line || " "}</span>}
      </div>
    )
  })
}

const tokenizeLine = (
  line: string,
  keywords: string[],
  builtins: string[],
  colors: any,
  startPos: number,
): JSX.Element[] => {
  const tokens: JSX.Element[] = []
  let pos = 0

  // String regex
  const stringRegex = /(['"`])((?:\\.|(?!\1).)*?)\1/g
  // Number regex
  const numberRegex = /\b\d+\.?\d*\b/g
  // Word regex
  const wordRegex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g

  const matches: Array<{ start: number; end: number; type: string; value: string }> = []

  // Find all strings
  let match
  while ((match = stringRegex.exec(line)) !== null) {
    matches.push({ start: match.index, end: match.index + match[0].length, type: "string", value: match[0] })
  }

  // Find all numbers
  while ((match = numberRegex.exec(line)) !== null) {
    const isInString = matches.some((m) => m.type === "string" && match!.index >= m.start && match!.index < m.end)
    if (!isInString) {
      matches.push({ start: match.index, end: match.index + match[0].length, type: "number", value: match[0] })
    }
  }

  // Find all words
  while ((match = wordRegex.exec(line)) !== null) {
    const isInString = matches.some((m) => m.type === "string" && match!.index >= m.start && match!.index < m.end)
    const isNumber = matches.some((m) => m.type === "number" && match!.index >= m.start && match!.index < m.end)
    if (!isInString && !isNumber) {
      const word = match[0]
      let type = "text"
      if (keywords.includes(word)) type = "keyword"
      else if (builtins.includes(word)) type = "builtin"
      else if (line[match.index + word.length] === "(") type = "function"

      matches.push({ start: match.index, end: match.index + match[0].length, type, value: word })
    }
  }

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start)

  // Build tokens
  matches.forEach((m, i) => {
    // Add text before this match
    if (m.start > pos) {
      const text = line.substring(pos, m.start)
      tokens.push(
        <span key={`text-${startPos}-${pos}`} style={{ color: colors.text || "#f8f8f2" }}>
          {text}
        </span>,
      )
    }

    // Add the match
    const color =
      m.type === "string"
        ? colors.string
        : m.type === "number"
          ? colors.number
          : m.type === "keyword"
            ? colors.keyword
            : m.type === "builtin"
              ? colors.builtin
              : m.type === "function"
                ? colors.function
                : colors.text || "#f8f8f2"

    tokens.push(
      <span key={`${m.type}-${startPos}-${m.start}`} style={{ color }}>
        {m.value}
      </span>,
    )

    pos = m.end
  })

  // Add remaining text
  if (pos < line.length) {
    tokens.push(
      <span key={`text-${startPos}-${pos}`} style={{ color: colors.text || "#f8f8f2" }}>
        {line.substring(pos)}
      </span>,
    )
  }

  return tokens
}

export default function CodeToImage() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("python")
  const [theme, setTheme] = useState("dracula")
  const [backgroundType, setBackgroundType] = useState("gradient")
  const [gradient, setGradient] = useState("spring")
  const [fileName, setFileName] = useState("")
  const [fontFamily, setFontFamily] = useState("roboto")
  const [fontSize, setFontSize] = useState("16")
  const [tabSize, setTabSize] = useState("4")
  const [showLineNumbers, setShowLineNumbers] = useState(false)
  const [showFoldGutter, setShowFoldGutter] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const cursorPositionRef = useRef<number | null>(null)

  // Code templates for different languages
  const getLanguageTemplate = (lang: string): string => {
    const templates: Record<string, string> = {
      python: `# Python Example
def main():
    print("Hello, World!")
    
def add(a, b):
    return a + b

if __name__ == "__main__":
    main()`,
      javascript: `// JavaScript Example
function main() {
    console.log("Hello, World!");
}

const add = (a, b) => {
    return a + b;
};

// ES6 Class example
class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(value) {
        this.result += value;
        return this;
    }
}

main();`,
      java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
    
    public static int add(int a, int b) {
        return a + b;
    }
}`,
      cpp: `// C++ Example
#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      rust: `// Rust Example
fn main() {
    println!("Hello, World!");
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}`,
      go: `// Go Example
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}

func add(a, b int) int {
    return a + b
}

type Person struct {
    Name string
    Age  int
}`
    }
    return templates[lang] || ""
  }

  const selectedTheme = themes.find((t) => t.value === theme) || themes[0]
  const selectedGradient = gradients.find((g) => g.value === gradient) || gradients[0]
  const selectedLanguage = languages.find((l) => l.value === language) || languages[0]

  useEffect(() => {
    if (cursorPositionRef.current !== null && textareaRef.current) {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        if (textareaRef.current && cursorPositionRef.current !== null) {
          textareaRef.current.selectionStart = cursorPositionRef.current
          textareaRef.current.selectionEnd = cursorPositionRef.current
          textareaRef.current.focus()
          cursorPositionRef.current = null
        }
      }, 0)
    }
  }, [code])

  // Auto-set tab size based on language
  useEffect(() => {
    const languageTabSizes: Record<string, string> = {
      python: "4",
      javascript: "2", 
      java: "4",
      cpp: "4",
      rust: "4",
      go: "4"
    }
    
    const defaultTabSize = languageTabSizes[language] || "4"
    setTabSize(defaultTabSize)
  }, [language])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget
    const { selectionStart, selectionEnd, value } = textarea

    // Handle Tab key
    if (e.key === "Tab") {
      e.preventDefault()
      const spaces = " ".repeat(Number.parseInt(tabSize))
      const newValue = value.substring(0, selectionStart) + spaces + value.substring(selectionEnd)
      cursorPositionRef.current = selectionStart + spaces.length
      setCode(newValue)
      return
    }

    // Handle Space key - ensure spaces are preserved
    if (e.key === " ") {
      e.preventDefault()
      const newValue = value.substring(0, selectionStart) + " " + value.substring(selectionEnd)
      cursorPositionRef.current = selectionStart + 1
      setCode(newValue)
      return
    }

    // Handle Enter key for auto-indentation
    if (e.key === "Enter") {
      e.preventDefault()
      
      // Get all lines up to cursor position
      const textBeforeCursor = value.substring(0, selectionStart)
      const lines = textBeforeCursor.split("\n")
      const currentLine = lines[lines.length - 1] || ""
      
      // Get the indentation of the current line
      const currentIndent = currentLine.match(/^\s*/)?.[0] || ""
      const trimmedLine = currentLine.trim()
      
      // Determine the indentation for the next line
      let nextLineIndent = currentIndent
      
      // Check if we need extra indentation based on language syntax
      if (language === "python") {
        // Python-specific indentation rules
        if (trimmedLine.endsWith(":") || 
            /\b(def|class|if|elif|else|for|while|try|except|finally|with|async def)\b/.test(trimmedLine)) {
          nextLineIndent = currentIndent + " ".repeat(Number.parseInt(tabSize))
        }
        // Handle elif/else on same level as if
        if (trimmedLine.startsWith("elif ") || trimmedLine.startsWith("else:") || 
            trimmedLine.startsWith("except") || trimmedLine.startsWith("finally:")) {
          const indentLevel = Math.floor(currentIndent.length / Number.parseInt(tabSize))
          if (indentLevel > 0) {
            nextLineIndent = " ".repeat((indentLevel - 1) * Number.parseInt(tabSize))
          }
        }
      } else if (language === "javascript") {
        // JavaScript-specific indentation
        if (trimmedLine.endsWith("{") || 
            /\b(function|if|else|for|while|try|catch|finally|class|switch)\b/.test(trimmedLine) ||
            trimmedLine.includes("=>")) {
          nextLineIndent = currentIndent + " ".repeat(Number.parseInt(tabSize))
        }
        // Handle closing braces
        if (trimmedLine === "}" || trimmedLine.endsWith("};")) {
          const indentLevel = Math.floor(currentIndent.length / Number.parseInt(tabSize))
          if (indentLevel > 0) {
            nextLineIndent = " ".repeat((indentLevel - 1) * Number.parseInt(tabSize))
          }
        }
      } else if (language === "java") {
        // Java-specific indentation
        if (trimmedLine.endsWith("{") || 
            /\b(public|private|protected|if|else|for|while|try|catch|finally|class|interface|switch)\b/.test(trimmedLine)) {
          nextLineIndent = currentIndent + " ".repeat(Number.parseInt(tabSize))
        }
        if (trimmedLine === "}") {
          const indentLevel = Math.floor(currentIndent.length / Number.parseInt(tabSize))
          if (indentLevel > 0) {
            nextLineIndent = " ".repeat((indentLevel - 1) * Number.parseInt(tabSize))
          }
        }
      } else if (language === "cpp") {
        // C++ specific indentation
        if (trimmedLine.endsWith("{") || 
            /\b(if|else|for|while|try|catch|class|struct|namespace|switch)\b/.test(trimmedLine)) {
          nextLineIndent = currentIndent + " ".repeat(Number.parseInt(tabSize))
        }
        if (trimmedLine === "}") {
          const indentLevel = Math.floor(currentIndent.length / Number.parseInt(tabSize))
          if (indentLevel > 0) {
            nextLineIndent = " ".repeat((indentLevel - 1) * Number.parseInt(tabSize))
          }
        }
      } else if (language === "rust") {
        // Rust-specific indentation
        if (trimmedLine.endsWith("{") || 
            /\b(fn|if|else|for|while|loop|match|struct|impl|trait|mod)\b/.test(trimmedLine)) {
          nextLineIndent = currentIndent + " ".repeat(Number.parseInt(tabSize))
        }
        if (trimmedLine === "}") {
          const indentLevel = Math.floor(currentIndent.length / Number.parseInt(tabSize))
          if (indentLevel > 0) {
            nextLineIndent = " ".repeat((indentLevel - 1) * Number.parseInt(tabSize))
          }
        }
      } else if (language === "go") {
        // Go-specific indentation
        if (trimmedLine.endsWith("{") || 
            /\b(func|if|else|for|switch|select|type|struct)\b/.test(trimmedLine)) {
          nextLineIndent = currentIndent + " ".repeat(Number.parseInt(tabSize))
        }
        if (trimmedLine === "}") {
          const indentLevel = Math.floor(currentIndent.length / Number.parseInt(tabSize))
          if (indentLevel > 0) {
            nextLineIndent = " ".repeat((indentLevel - 1) * Number.parseInt(tabSize))
          }
        }
      }

      const newValue = value.substring(0, selectionStart) + "\n" + nextLineIndent + value.substring(selectionEnd)
      cursorPositionRef.current = selectionStart + 1 + nextLineIndent.length
      setCode(newValue)
      return
    }

    // Handle Backspace key
    if (e.key === "Backspace") {
      e.preventDefault()
      if (selectionStart !== selectionEnd) {
        // Delete selection
        const newValue = value.substring(0, selectionStart) + value.substring(selectionEnd)
        cursorPositionRef.current = selectionStart
        setCode(newValue)
      } else if (selectionStart > 0) {
        // Delete single character
        const newValue = value.substring(0, selectionStart - 1) + value.substring(selectionStart)
        cursorPositionRef.current = selectionStart - 1
        setCode(newValue)
      }
      return
    }

    // Handle bracket/quote auto-closing
    const pairs: Record<string, string> = {
      "(": ")",
      "[": "]",
      "{": "}",
      '"': '"',
      "'": "'",
      "`": "`",
    }

    if (pairs[e.key] && selectionStart === selectionEnd) {
      e.preventDefault()
      const closing = pairs[e.key]
      const newValue = value.substring(0, selectionStart) + e.key + closing + value.substring(selectionEnd)
      cursorPositionRef.current = selectionStart + 1
      setCode(newValue)
      return
    }

    // Handle closing bracket skip
    if ([")", "]", "}", '"', "'", "`"].includes(e.key)) {
      if (value[selectionStart] === e.key) {
        e.preventDefault()
        cursorPositionRef.current = selectionStart + 1
        return
      }
    }

    // Handle Ctrl+/ for comments
    if (e.ctrlKey && e.key === "/") {
      e.preventDefault()
      const lines = value.split("\n")
      const startLineIndex = value.substring(0, selectionStart).split("\n").length - 1
      const endLineIndex = value.substring(0, selectionEnd).split("\n").length - 1
      
      const commentChar = language === "python" ? "#" : "//"
      
      // Toggle comments for selected lines
      const newLines = lines.map((line, index) => {
        if (index >= startLineIndex && index <= endLineIndex) {
          const trimmed = line.trim()
          if (trimmed.startsWith(commentChar)) {
            // Uncomment
            return line.replace(new RegExp(`^(\\s*)${commentChar.replace("/", "\\/")}\\s?`), "$1")
          } else {
            // Comment
            const indent = line.match(/^\s*/)?.[0] || ""
            return indent + commentChar + " " + line.substring(indent.length)
          }
        }
        return line
      })
      
      setCode(newLines.join("\n"))
      return
    }

    // Handle regular character input
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault()
      const newValue = value.substring(0, selectionStart) + e.key + value.substring(selectionEnd)
      cursorPositionRef.current = selectionStart + 1
      setCode(newValue)
      return
    }

    // Handle Ctrl+D for duplicate line
    if (e.ctrlKey && e.key === "d") {
      e.preventDefault()
      const lines = value.split("\n")
      const lineIndex = value.substring(0, selectionStart).split("\n").length - 1
      const currentLine = lines[lineIndex]
      lines.splice(lineIndex + 1, 0, currentLine)
      
      setCode(lines.join("\n"))
      return
    }
  }

  const handleDownload = async () => {
    if (!previewRef.current) return

    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
      })

      const link = document.createElement("a")
      link.download = `${fileName || "code"}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error("Error generating image:", error)
    }
  }

  const getBackgroundStyle = () => {
    if (backgroundType === "gradient") {
      return {
        background: `linear-gradient(135deg, ${selectedGradient.colors[0]}, ${selectedGradient.colors[1]})`,
      }
    }
    return {
      background: selectedTheme.bg,
    }
  }

  const isFoldableLine = (line: string, index: number, lines: string[]) => {
    const trimmed = line.trim()
    // Check for Python function/class definitions
    if (trimmed.startsWith("def ") || trimmed.startsWith("class ")) return true
    // Check for opening braces in other languages
    if (trimmed.endsWith("{")) return true
    // Check for multi-line structures
    if (
      trimmed.endsWith(":") &&
      (trimmed.startsWith("if ") || trimmed.startsWith("for ") || trimmed.startsWith("while "))
    )
      return true
    return false
  }

  const codeLines = (code || "").split("\n")
  const displayCode = code || ""
  const highlightedCode = code ? highlightCode(displayCode, language, selectedTheme) : []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-4">
          <h1 className="text-xl lg:text-2xl font-bold font-mono ml-12 lg:ml-0">Code to Image Converter</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-full">
        <div className="mb-8 space-y-4">
          {/* First row of controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Highlight language</Label>
              <div className="flex gap-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{lang.icon}</span>
                          {lang.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCode(getLanguageTemplate(language))}
                  className="px-3 bg-transparent"
                  title="Load template"
                >
                  📝
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-border" style={{ backgroundColor: t.bg }} />
                        {t.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">File Name</Label>
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="code"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium opacity-0 pointer-events-none">Actions</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Settings2 className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96" align="end">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Settings2 className="w-4 h-4" />
                      Settings
                    </h3>

                    <div className="space-y-2">
                      <Label className="text-sm">Font Family</Label>
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontFamilies.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Font Size</Label>
                        <Select value={fontSize} onValueChange={setFontSize}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontSizes.map((size) => (
                              <SelectItem key={size.value} value={size.value}>
                                {size.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Tab Size</Label>
                        <Select value={tabSize} onValueChange={setTabSize}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {tabSizes.map((tab) => (
                              <SelectItem key={tab.value} value={tab.value}>
                                {tab.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="line-numbers"
                          checked={showLineNumbers}
                          onCheckedChange={(checked: boolean) => setShowLineNumbers(checked)}
                        />
                        <Label htmlFor="line-numbers" className="text-sm font-normal cursor-pointer">
                          Line numbers
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="fold-gutter"
                          checked={showFoldGutter}
                          onCheckedChange={(checked: boolean) => setShowFoldGutter(checked)}
                        />
                        <Label htmlFor="fold-gutter" className="text-sm font-normal cursor-pointer">
                          Fold gutter
                        </Label>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Second row of controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Background type</Label>
              <Select value={backgroundType} onValueChange={setBackgroundType}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {backgroundTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Gradient</Label>
              <Select value={gradient} onValueChange={setGradient} disabled={backgroundType !== "gradient"}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradients.map((g) => (
                    <SelectItem key={g.value} value={g.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded border border-border"
                          style={{
                            background: `linear-gradient(135deg, ${g.colors[0]}, ${g.colors[1]})`,
                          }}
                        />
                        {g.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium opacity-0 pointer-events-none">Download</Label>
              <Button onClick={handleDownload} className="w-full bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="w-full overflow-x-auto pb-8">
          <div ref={previewRef} className="rounded-2xl p-4 lg:p-8 w-full" style={getBackgroundStyle()}>
            <div
              className="rounded-lg overflow-hidden shadow-2xl"
              style={{
                backgroundColor: selectedTheme.bg,
                minWidth: "600px",
                width: "100%",
                maxWidth: "95vw",
              }}
            >
              {/* Window Controls */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 text-center">
                  {fileName && (
                    <span className="text-sm font-mono" style={{ color: selectedTheme.text, opacity: 0.7 }}>
                      {fileName}
                    </span>
                  )}
                </div>
                <div className="w-[52px]" />
              </div>

              {/* Code Editor */}
              <div className="p-6">
                <div className="flex gap-0">
                  {showFoldGutter && (
                    <div
                      className="flex flex-col pr-2 select-none"
                      style={{
                        color: selectedTheme.text,
                        opacity: 0.4,
                        fontSize: `${fontSize}px`,
                        lineHeight: "1.5",
                      }}
                    >
                      {codeLines.map((line, index) => (
                        <div
                          key={index}
                          className="font-mono flex items-center justify-center"
                          style={{ height: `${Number.parseInt(fontSize) * 1.5}px` }}
                        >
                          {isFoldableLine(line, index, codeLines) ? (
                            <ChevronDown className="w-3 h-3" />
                          ) : (
                            <span className="w-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {showLineNumbers && (
                    <div
                      className="flex flex-col pr-4 border-r select-none"
                      style={{
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        color: selectedTheme.text,
                        opacity: 0.4,
                        fontSize: `${fontSize}px`,
                        lineHeight: "1.5",
                      }}
                    >
                      {codeLines.map((_, index) => (
                        <div
                          key={index}
                          className="font-mono text-right"
                          style={{ height: `${Number.parseInt(fontSize) * 1.5}px` }}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex-1 relative">
                    {/* Visible textarea with syntax highlighting overlay */}
                    <Textarea
                      ref={textareaRef}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="font-mono border-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none resize-none bg-transparent relative z-10"
                      style={{
                        fontSize: `${fontSize}px`,
                        lineHeight: "1.5",
                        paddingLeft: showLineNumbers || showFoldGutter ? "12px" : "0",
                        color: code ? "transparent" : selectedTheme.text,
                        caretColor: selectedTheme.text,
                        minHeight: "500px",
                      }}
                      placeholder={
                        language === "python" ? "# Write your Python code here..." :
                        language === "javascript" ? "// Write your JavaScript code here..." :
                        language === "java" ? "// Write your Java code here..." :
                        language === "cpp" ? "// Write your C++ code here..." :
                        language === "rust" ? "// Write your Rust code here..." :
                        language === "go" ? "// Write your Go code here..." :
                        "// Write your code here..."
                      }
                    />
                    {/* Syntax highlighted display - only show when there's code */}
                    {code && (
                      <div
                        className="font-mono absolute inset-0 pointer-events-none"
                        style={{
                          fontSize: `${fontSize}px`,
                          lineHeight: "1.5",
                          paddingLeft: showLineNumbers || showFoldGutter ? "12px" : "0",
                          color: selectedTheme.text,
                          paddingTop: "8px",
                          paddingBottom: "8px",
                        }}
                      >
                        {highlightedCode}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
