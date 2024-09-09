import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Spinner } from "../Spinner";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  emptyText?: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  isFiltered?: boolean;
  value?: string;
}

export function Select({
  options,
  placeholder = "Select an option",
  emptyText = "Nenhuma opção encontrada",
  onChange,
  isLoading = false,
  isFiltered = false,
  value,
}: CustomSelectProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

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
    setSelectedOption(option);
    onChange(option.value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-between w-full px-3 py-2 text-sm bg-background border border-input rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full mt-2 bg-card border border-input rounded-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {isFiltered && (
          <div className="p-1 border-b border-input">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
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
            <Spinner size="small" color="primary" />
          </div>
        ) : (
          <ul className="py-1">
            {(isFiltered ? filteredOptions : options).map((option) => (
              <DropdownMenuItem
                key={option.value}
                className="flex gap-3"
                onSelect={() => handleOptionSelect(option)}
              >
                <span>{option.label}</span>
                {selectedOption?.value === option.value && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
              </DropdownMenuItem>
            ))}
            {filteredOptions.length === 0 && isFiltered && (
              <li className="px-3 py-2 text-sm text-muted-foreground">
                {emptyText}
              </li>
            )}
          </ul>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
