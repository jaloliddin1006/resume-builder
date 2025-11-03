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
  ChevronLeft,
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
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside
        className={cn(
          "border-r bg-gradient-to-b from-background to-background/95 flex flex-col transition-all duration-300 ease-in-out",
          "fixed lg:fixed top-0 left-0 h-screen z-40",
          isCollapsed ? "w-20 lg:w-20" : "w-64 lg:w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div
          className={cn(
            "flex-shrink-0 border-b transition-all duration-300 flex items-center justify-between",
            isCollapsed ? "p-3" : "p-4 pt-16 lg:pt-4",
          )}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className={cn(
                "rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                isCollapsed ? "w-8 h-8" : "w-10 h-10",
              )}
            >
              <span
                className={cn(
                  "text-primary-foreground font-bold transition-all duration-300",
                  isCollapsed ? "text-lg" : "text-xl",
                )}
              >
                D
              </span>
            </div>
            {!isCollapsed && <span className="font-bold text-base truncate">Defonic Tools</span>}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex flex-shrink-0 ml-2 hover:bg-secondary/60 transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <ChevronLeft className={cn("w-5 h-5 transition-transform duration-300", isCollapsed ? "rotate-180" : "")} />
          </Button>
        </div>

        <nav className="flex-1 px-2 space-y-4 overflow-y-auto min-h-0 py-4">
          <div>
            {!isCollapsed && (
              <h3 className="px-3 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Dashboard
              </h3>
            )}
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
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            {!isCollapsed && (
              <h3 className="px-3 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Loyihalar
              </h3>
            )}
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
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                    )}
                    title={isCollapsed ? project.name : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>{project.name}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Footer with social links only */}
        <div className="p-3 border-t flex-shrink-0">
          <div
            className={cn(
              "flex items-center justify-center gap-2 transition-all duration-300",
              isCollapsed ? "flex-col" : "flex-row flex-wrap",
            )}
          >
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  className="text-muted-foreground hover:text-primary hover:bg-secondary/50 p-2 rounded-lg transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </div>
      </aside>
    </>
  )
}
