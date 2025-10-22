"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  Menu,
  X,
  LayoutDashboard,
  FileCheck,
  Target,
  Linkedin,
  Github,
  Send,
  Code2,
  Youtube,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const dashboardItems = [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]

const projects = [
  { name: "Resume builder", href: "/resume", icon: FileText },
  { name: "CV builder", href: "/cv", icon: FileCheck },
  { name: "Objective builder", href: "/objective", icon: Target },
]

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mamatmusayev/", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/jaloliddin1006", icon: Github },
  { name: "Telegram", href: "https://t.me/mamatmusayev_uz", icon: Send },
  { name: "LeetCode", href: "https://leetcode.com/u/Jaloliddin1006/", icon: Code2 },
  { name: "YouTube", href: "https://youtube.com/mamatmusayev.uz", icon: Youtube },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside
        className={cn(
          "w-64 border-r bg-background flex flex-col transition-transform duration-300 ease-in-out",
          "fixed lg:fixed top-0 left-0 h-screen z-40",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header - Fixed at top */}
        <div className="p-6 pt-16 lg:pt-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">D</span>
            </div>
            <span className="font-bold text-xl">Defonic</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-6 overflow-y-auto min-h-0">
          <div>
            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Dashboard
            </h3>
            <div className="space-y-1">
              {dashboardItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-secondary text-foreground font-medium"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Loyihalar
            </h3>
            <div className="space-y-1">
              {projects.map((project) => {
                const Icon = project.icon
                const isActive = pathname === project.href
                return (
                  <Link
                    key={project.href}
                    href={project.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-secondary text-foreground font-medium"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {project.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t flex-shrink-0">
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>
      </aside>
    </>
  )
}
