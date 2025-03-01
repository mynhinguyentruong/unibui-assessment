import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import * as React from "react";
import { Button } from "./ui/button";

export function SearchMenu() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="max-w-3xl border border-input bg-muted "
        onClick={() => setOpen(true)}
      >
        <p className="text-xs font-normal text-muted-foreground tracking-wide  transition-colors hover:bg-accent hover:text-accent-foreground ">
          Quick search menu for job title, company,...{" "}
          <kbd className="ml-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ">
            <span className="text-xs hover:text-black">⌘</span>K
          </kbd>
        </p>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to quickly search job title, job type..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Part-time jobs</CommandItem>
            <CommandItem>Contract jobs</CommandItem>
            <CommandItem>Software Engineer Internship</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
