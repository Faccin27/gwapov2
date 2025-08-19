"use client"

import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Database, Users, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface DatabaseBentoContentProps {
  isHovered: boolean
}

const users = [
  { id: "#001", name: "Guilherme Deitosi", email: "guideitosi@gwapo.com", status: "active", lastLogin: "2 min ago" },
  { id: "#002", name: "Willian Gwapore", email: "willdev@gwapo.com", status: "active", lastLogin: "1 hour ago" },
  { id: "#003", name: "Alicia Faccin", email: "aliciafaccin@gwapo.com", status: "inactive", lastLogin: "2 days ago" },
  { id: "#004", name: "Diana Prince", email: "diana@gwapo.com", status: "active", lastLogin: "5 min ago" },
  { id: "#005", name: "Edward Wilson", email: "edward@gwapo.com", status: "active", lastLogin: "30 min ago" },
]

const DatabaseBentoContent: React.FC<DatabaseBentoContentProps> = ({ isHovered }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      {/* Database stats */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
          <Database className="w-3 h-3" />
          <span>PostgreSQL</span>
        </div>
        <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
          <Activity className="w-3 h-3" />
          <span>Online</span>
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 p-4 rounded-lg border border-border shadow-lg w-full h-full flex flex-col overflow-hidden",
          "transition-all duration-300",
          isHovered ? "bg-background/90" : "bg-background/70",
        )}
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-foreground text-lg font-semibold">Users Database</h3>
          <span className="ml-auto text-sm text-muted-foreground">{users.length} records</span>
        </div>

        <div className="flex-grow overflow-hidden">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
                <TableHead className="text-muted-foreground-dark py-3 text-xs font-semibold">ID</TableHead>
                <TableHead className="text-muted-foreground-dark py-3 text-xs font-semibold">Name</TableHead>
                <TableHead className="text-muted-foreground-dark py-3 text-xs font-semibold">Email</TableHead>
                <TableHead className="text-muted-foreground-dark py-3 text-xs font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className={cn(
                    "transition-all duration-200 ease-in-out border-b border-border/50",
                    "hover:bg-zinc-700/10 hover:text-primary-light hover:shadow-sm hover:scale-[1.02]",
                    hoveredRowId === user.id && "bg-primary/15 text-primary-light shadow-md scale-[1.02]",
                  )}
                  onMouseEnter={() => setHoveredRowId(user.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground py-3">{user.id}</TableCell>
                  <TableCell className="font-medium text-foreground py-3 text-sm">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground py-3 text-sm">{user.email}</TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          user.status === "active" ? "bg-green-500" : "bg-gray-500",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs font-medium capitalize",
                          user.status === "active" ? "text-green-400" : "text-gray-400",
                        )}
                      >
                        {user.status}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Connection indicator */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Connected to database
          </div>
          <div className="text-xs text-muted-foreground">Last sync: just now</div>
        </div>
      </div>
    </div>
  )
}

export default DatabaseBentoContent
