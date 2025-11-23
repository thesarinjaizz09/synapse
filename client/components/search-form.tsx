import { Search } from "lucide-react"

import { Label } from "@/components/ui/label"
import { SidebarInput } from "@/components/ui/sidebar"
import { GlobalSearchProps } from "./globals/global-views"

export function SearchForm({ value, onChange, placeholder }: GlobalSearchProps) {
  return (
    <div className="relative">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <SidebarInput
        id="search"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-9 p-3 pl-8 w-sm"
      />
      <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
    </div>
  )
}
