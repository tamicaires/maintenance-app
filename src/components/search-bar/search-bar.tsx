import * as React from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  lists?: { value: string; label: string }[];
  onSearch?: (value: string) => void;
  onListChange?: (value: string) => void;
  isCollapsible?: boolean;
}

export function SearchBar({
  className,
  placeholder = "Busque por algo...",
  onSearch,
  onListChange,
  isCollapsible = false,
}: SearchBarProps) {
  const [isExpanded, setIsExpanded] = React.useState(!isCollapsible);
  const [searchValue, setSearchValue] = React.useState("");

  const searchRef = React.useRef<HTMLDivElement>(null);
  onListChange;
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch?.("");
  };

  const toggleExpand = () => {
    if (isCollapsible) {
      setIsExpanded(!isExpanded);
      if (!isExpanded) {
        setTimeout(() => {
          const input = searchRef.current?.querySelector("input");
          input?.focus();
        }, 100);
      }
    }
  };

  React.useEffect(() => {
    if (!isCollapsible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        isExpanded &&
        !searchValue
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCollapsible, isExpanded, searchValue]);

  return (
    <div
      ref={searchRef}
      className={cn(
        "relative flex items-center",
        isCollapsible && !isExpanded ? "w-10" : "w-full max-w-2xl",
        className
      )}
    >
      {isCollapsible && !isExpanded ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={toggleExpand}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </Button>
      ) : (
        <div className="relative flex justify-center items-center rounded-md border bg-background shadow-sm transition-all duration-200">
          <div className="flex h-10 flex-1 items-center">
            <Command className="flex-1" shouldFilter={false}>
              <CommandInput
                placeholder={placeholder}
                value={searchValue}
                onValueChange={handleSearchChange}
                className="h-9 border-0 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 rounded-full"
              />
              {searchValue && (
                <CommandList>
                  <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem>Criar "{searchValue}"</CommandItem>
                  </CommandGroup>
                </CommandList>
              )}
            </Command>
            {searchValue && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={handleClear}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
