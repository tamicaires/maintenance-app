import React, { useState, useEffect, useRef } from "react";
import { Spinner } from "../Spinner";

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Option[];
  placeholder?: string;
  emptyText?: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  placeholder = "Select an option",
  emptyText = "Nenhuma opção encontrada",
  onChange,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div ref={comboboxRef} className="relative w-full">
      <div
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-background border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={handleToggle}
      >
        <span className={`${selectedOption ? "" : ""}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-44 mt-1 right-6 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-1 border-b border-gray-300">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="w-full pl-10 pr-3 py-2 text-sm rounded-md focus:outline-none "
                placeholder="Procurar frota"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <Spinner size="small" color="primary" />
            </div>
          ) : (
            <ul className="max-h-60 overflow-auto py-1">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="pl-8 pr-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label}
                </li>
              ))}
              {filteredOptions.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-500">{emptyText}</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
