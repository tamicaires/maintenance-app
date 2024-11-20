import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { Spinner } from "../Spinner";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  emptyText?: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  isFiltered?: boolean;
  value?: string;
  disabled?: boolean;
}

export function Select({
  options,
  placeholder = "Selecione uma opção",
  emptyText = "Nenhuma opção encontrada",
  onChange,
  isLoading = false,
  isFiltered = false,
  value,
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const selected = options.find((option) => option.value === value);
      setSelectedOption(selected || null);
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option: Option) => {
    if (disabled) return;
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    if (event.key === " ") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === "ArrowDown" && isOpen) {
      event.preventDefault();
      const firstOption = containerRef.current?.querySelector(
        '[role="option"]'
      ) as HTMLElement;
      firstOption?.focus();
    }
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent, option: Option) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOptionSelect(option);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const options = containerRef.current?.querySelectorAll('[role="option"]');
      const currentIndex = Array.from(options || []).indexOf(
        event.target as HTMLElement
      );
      const nextIndex =
        event.key === "ArrowDown"
          ? (currentIndex + 1) % options!.length
          : (currentIndex - 1 + options!.length) % options!.length;
      (options![nextIndex] as HTMLElement).focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && isFiltered && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isFiltered]);

  return (
    <div ref={containerRef} className="relative">
      <div
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="select-options"
        className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-background border border-input rounded-md shadow-sm ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        }`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
      {isOpen && !disabled && (
        <div
          id="select-options"
          role="listbox"
          className="absolute z-10 w-full mt-2 bg-card border border-input rounded-md shadow-lg"
        >
          {isFiltered && (
            <div className="p-1 border-b border-input">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-md focus:outline-none bg-card"
                  placeholder="Procurar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <Spinner size="small" />
            </div>
          ) : (
            <ul className="py-1 max-h-60 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    tabIndex={-1}
                    aria-selected={selectedOption?.value === option.value}
                    className="flex items-center gap-3 px-3 py-2 justify-between cursor-pointer hover:bg-accent focus:bg-accent focus:outline-none"
                    onClick={() => handleOptionSelect(option)}
                    onKeyDown={(e) => handleOptionKeyDown(e, option)}
                  >
                    <div className="flex flex-col leading-none">
                      <span>{option.label}</span>
                      {option.description && (
                        <span className="text-muted-foreground text-xs">
                          {option.description}
                        </span>
                      )}
                    </div>
                    {selectedOption?.value === option.value && (
                      <div className="ml-0 bg-green-500 bg-opacity-15 p-1 rounded-full">
                        <Check className="w-3.5 h-3.5 text-green-500 ml-auto" />
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-muted-foreground">
                  {emptyText}
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}