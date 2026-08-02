"use client";

import { Search, X } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchUiProps = {
  className?: string;
};

export function SearchUi({ className }: SearchUiProps) {
  const [open, setOpen] = useState(false);
  const inputId = useId();

  return (
    <div className={cn("relative flex items-center", className)}>
      <div
        className={cn(
          "overflow-hidden transition-[width,opacity] duration-200 ease-out",
          open ? "w-48 opacity-100 sm:w-64" : "w-0 opacity-0",
        )}
      >
        <Input
          id={inputId}
          type="search"
          name="search"
          placeholder="Search AiX Media"
          aria-label="Search AiX Media"
          className="h-9 border-border bg-surface px-3 text-sm"
          autoComplete="off"
        />
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={open ? "Close search" : "Open search"}
        aria-expanded={open}
        aria-controls={inputId}
        onClick={() => setOpen((current) => !current)}
        className="text-muted-foreground hover:text-foreground"
      >
        {open ? <X /> : <Search />}
      </Button>
    </div>
  );
}
