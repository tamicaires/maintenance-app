import * as React from "react";
import {
  AlertCircle,
  Box,
  Calendar,
  Check,
  ChevronRight,
  Circle,
  Clipboard,
  Clock,
  Edit2,
  Eye,
  File,
  Folder,
  Grid,
  Home,
  Image,
  Link2,
  Map,
  MessageSquare,
  Paperclip,
  Pin,
  Plus,
  Settings,
  ShoppingCart,
  Star,
  Sun,
  Trash2,
  User,
  Wallet,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICONS_PER_PAGE = 28;

const icons = [
  { name: "Edit2", component: Edit2 },
  { name: "Paperclip", component: Paperclip },
  { name: "Pin", component: Pin },
  { name: "Eye", component: Eye },
  { name: "MessageSquare", component: MessageSquare },
  { name: "Folder", component: Folder },
  { name: "File", component: File },
  { name: "Grid", component: Grid },
  { name: "Box", component: Box },
  { name: "Circle", component: Circle },
  { name: "ShoppingCart", component: ShoppingCart },
  { name: "Trash2", component: Trash2 },
  { name: "Wallet", component: Wallet },
  { name: "Link2", component: Link2 },
  { name: "Box", component: Box },
  { name: "Image", component: Image },
  { name: "Clock", component: Clock },
  { name: "Sun", component: Sun },
  { name: "Bell", component: AlertCircle },
  { name: "Map", component: Map },
  { name: "Home", component: Home },
  { name: "ChevronRight", component: ChevronRight },
  { name: "Star", component: Star },
  { name: "Settings", component: Settings },
  { name: "Star", component: Star },
  { name: "Clipboard", component: Clipboard },
  { name: "Calendar", component: Calendar },
  { name: "Check", component: Check },
  { name: "User", component: User },
];

interface IconSelectorProps {
  onSelect: (iconName: string) => void;
  triggerText?: string;
  triggerVariant?: ButtonProps["variant"];
  triggerClassName?: string;
  selectedIcon?: string | null;
  showIcon?: boolean;
}

export function IconSelector({
  onSelect,
  triggerText = "Escolha um ícone",
  triggerVariant = "outline",
  triggerClassName,
  showIcon = false,
  selectedIcon: controlledSelectedIcon,
}: IconSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [internalSelectedIcon, setInternalSelectedIcon] = React.useState<
    string | null
  >(null);

  const selectedIcon = controlledSelectedIcon ?? internalSelectedIcon;

  const totalPages = Math.ceil(icons.length / ICONS_PER_PAGE);
  const currentPageIcons = icons.slice(
    page * ICONS_PER_PAGE,
    (page + 1) * ICONS_PER_PAGE
  );

  const handleSelect = () => {
    if (selectedIcon) {
      onSelect(selectedIcon);
      setOpen(false);
    }
  };

  const SelectedIconComponent = selectedIcon
    ? icons.find((icon) => icon.name === selectedIcon)?.component
    : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {selectedIcon && SelectedIconComponent ? (
          <Button
            variant={triggerVariant}
            className={cn("gap-2 font-normal text-zinc-800", triggerClassName)}
          >
            <div className="p-2 bg-primary/15 rounded-full">
              <SelectedIconComponent className="h-5 w-5 text-primary" />
            </div>
            {/* {selectedIcon} */}
          </Button>
        ) : (
          <Button
            variant={triggerVariant}
            className={cn("gap-2 font-normal text-zinc-800", triggerClassName)}
          >
            <div className="p-1.5 bg-primary/15 rounded-full">
              {showIcon && <Plus className="h-4 w-4 text-primary" />}
            </div>
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selecione um ícone</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-7 gap-2 py-4">
          {currentPageIcons.map((icon, index) => {
            const Icon = icon.component;
            return (
              <Button
                key={`${icon.name}-${index}`}
                variant="outline"
                className={`py-6 rounded-lg hover:bg-gray-100 transition-colors ${
                  selectedIcon === icon.name
                    ? "bg-primary text-white hover:bg-primary/80"
                    : ""
                }`}
                onClick={() => setInternalSelectedIcon(icon.name)}
              >
                <Icon className="w-7 h-7" />
              </Button>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-1 ">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                page === index ? "bg-red-500" : "bg-gray-200"
              }`}
              onClick={() => setPage(index)}
            />
          ))}
        </div>
        <div className="flex justify-between gap-2 mt-2 w-full">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSelect}
            disabled={!selectedIcon}
            className="w-full"
          >
            Escolher
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
