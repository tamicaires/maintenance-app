"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import EmptyState from "../states/empty-state";
import { Spinner } from "../Spinner";

export type IOption = {
  value: string;
  label: string;
  description?: string | null;
  icon?: React.ReactNode;
};

type SelectProps = {
  name: string;
  label?: string;
  description?: string;
  options: IOption[];
  placeholder?: string;
  emptyText?: string;
  isLoading?: boolean;
  isFiltered?: boolean;
  isClean?: boolean;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  multiple?: boolean;
  clearable?: boolean;
};

export function SelectField({
  name,
  label,
  description,
  options,
  placeholder = "Selecione uma opção",
  emptyText = "Nenhuma opção encontrada",
  isLoading = false,
  isFiltered = false,
  isClean = false,
  disabled = false,
  className = "",
  required = false,
  multiple = false,
  clearable = true,
}: SelectProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <SelectComponent
              options={options}
              placeholder={placeholder}
              emptyText={emptyText}
              onChange={field.onChange}
              isLoading={isLoading}
              isFiltered={isFiltered}
              isClean={isClean}
              value={field.value}
              disabled={disabled}
              className={className}
              onBlur={field.onBlur}
              multiple={multiple}
              clearable={clearable}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface SelectComponentProps {
  options: IOption[];
  placeholder?: string;
  emptyText?: string;
  onChange: (value: string | string[] | undefined) => void;
  onBlur?: () => void;
  isLoading?: boolean;
  isFiltered?: boolean;
  isClean?: boolean;
  value?: string | string[];
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  clearable?: boolean;
}

function SelectComponent({
  options,
  placeholder = "Selecione uma opção",
  emptyText = "Nenhuma opção encontrada",
  onChange,
  onBlur,
  isLoading = false,
  isFiltered = false,
  isClean = false,
  value,
  disabled = false,
  className,
  multiple = false,
  clearable = true,
}: SelectComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sincroniza o estado interno com o valor do formulário
  useEffect(() => {
    if (value === undefined) {
      setSelectedOptions([]);
      return;
    }

    if (multiple) {
      const values = Array.isArray(value) ? value : [value];
      const selected = options.filter((option) =>
        values.includes(option.value)
      );
      setSelectedOptions(selected);
    } else {
      const selected = options.find((option) => option.value === value);
      setSelectedOptions(selected ? [selected] : []);
    }
  }, [value, options, multiple]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option: IOption) => {
    if (disabled) return;

    if (multiple) {
      const isSelected = selectedOptions.some(
        (item) => item.value === option.value
      );
      let newSelectedOptions: IOption[];

      if (isSelected) {
        // Remove a opção se já estiver selecionada
        newSelectedOptions = selectedOptions.filter(
          (item) => item.value !== option.value
        );
      } else {
        // Adiciona a opção se não estiver selecionada
        newSelectedOptions = [...selectedOptions, option];
      }

      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions.map((opt) => opt.value));

      // Não fecha o dropdown em seleção múltipla
      setSearchTerm("");
    } else {
      // Comportamento padrão para seleção única
      setSelectedOptions([option]);
      onChange(option.value);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOptions([]);
    onChange(multiple ? [] : undefined);
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

  const handleOptionKeyDown = (event: React.KeyboardEvent, option: IOption) => {
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
        if (onBlur) onBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onBlur]);

  useEffect(() => {
    if (isOpen && isFiltered && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isFiltered]);

  const isOptionSelected = (option: IOption) => {
    return selectedOptions.some((item) => item.value === option.value);
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="select-options"
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-sm bg-background",
          isClean ? "" : "border border-input rounded-md shadow-sm",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
          className
        )}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-wrap gap-1 items-center flex-1 overflow-hidden">
          {selectedOptions.length > 0 ? (
            multiple ? (
              <div className="flex flex-wrap gap-1">
                {selectedOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant="secondary"
                    className="flex items-center gap-1 max-w-[200px] truncate rounded-sm"
                  >
                    {option.icon && (
                      <span className="flex-shrink-0">{option.icon}</span>
                    )}
                    <span className="truncate">{option.label}</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect(option);
                      }}
                    />
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 truncate">
                {selectedOptions[0].icon && (
                  <span className="flex-shrink-0">
                    {selectedOptions[0].icon}
                  </span>
                )}
                <span className="truncate">{selectedOptions[0].label}</span>
              </div>
            )
          ) : (
            <div className="text-muted-foreground">{placeholder}</div>
          )}
        </div>
        <div className="flex items-center gap-1 ml-1 flex-shrink-0">
          {clearable && selectedOptions.length > 0 && (
            <X
              className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={handleClear}
            />
          )}
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
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
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <Spinner />
            </div>
          ) : (
            <ul className="py-1 max-h-60 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    tabIndex={-1}
                    aria-selected={isOptionSelected(option)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 justify-between cursor-pointer hover:bg-accent focus:bg-accent focus:outline-none",
                      isOptionSelected(option) && "bg-primary/5 text-primary"
                    )}
                    onClick={() => handleOptionSelect(option)}
                    onKeyDown={(e) => handleOptionKeyDown(e, option)}
                  >
                    <div className="flex items-center gap-2">
                      {option.icon && (
                        <div className="flex-shrink-0 text-muted-foreground">
                          {option.icon}
                        </div>
                      )}
                      <div className="flex flex-col leading-none">
                        <span
                          className={cn(
                            "text-sm",
                            isOptionSelected(option) && "font-semibold"
                          )}
                        >
                          {option.label}
                        </span>
                        {option.description && (
                          <span className="text-muted-foreground text-xs">
                            {option.description}
                          </span>
                        )}
                      </div>
                    </div>
                    {isOptionSelected(option) && (
                      <div className="bg-primary/20 p-1 rounded-full">
                        <Check className="w-3.5 h-3.5 text-primary ml-auto" />
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <EmptyState message={emptyText} />
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SelectField;
