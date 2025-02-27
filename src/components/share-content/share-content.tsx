import * as React from "react";
import { Check, Copy, Link, Mail, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../Toast/toast";

interface ShareContentProps {
  contentId: string;
  contentType: string;
  contentTitle: string;
  shareLink: string;
  onEmailShare?: (email: string) => Promise<void>;
  customShareOptions?: {
    label: string;
    value: string;
    icon: React.ReactNode;
    action: () => void;
  }[];
}

export function ShareContent({
  contentId,
  contentType,
  contentTitle,
  shareLink,
  onEmailShare,
  customShareOptions = [],
}: ShareContentProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [shareMethod, setShareMethod] = React.useState("link");
  const { toast: addToast, ToastComponent } = useToast();
  console.log(contentId)
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      addToast({
        type: "success",
        title: "Link copiado",
        message: "O link foi copiado para a área de transferência.",
        duration: 3000,
      });
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao copiar link",
        message: "Não foi possível copiar o link para a área de transferência.",
        duration: 3000,
      });
    }
  };

  const handleShare = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (shareMethod === "email" && email && onEmailShare) {
      try {
        await onEmailShare(email);
        addToast({
          type: "success",
          title: "E-mail enviado!",
          message: "Um convite foi enviado para o e-mail informado.",
          duration: 3000,
        });
      } catch (error) {
        addToast({
          type: "error",
          title: "Erro ao enviar e-mail",
          message:
            "Não foi possível enviar o convite. Por favor, tente novamente.",
          duration: 3000,
        });
      }
    } else if (shareMethod === "link") {
      copyToClipboard();
    } else {
      const customOption = customShareOptions.find(
        (option) => option.value === shareMethod
      );
      if (customOption) {
        customOption.action();
      }
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar {contentType}</DialogTitle>
          <DialogDescription>
            Compartilhe {contentType.toLowerCase()} "{contentTitle}" com outras
            pessoas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleShare}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="share-method" className="text-right">
                Método
              </Label>
              <Select
                value={shareMethod}
                onValueChange={(value) => setShareMethod(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o método de compartilhamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="link">Link</SelectItem>
                  {onEmailShare && (
                    <SelectItem value="email">E-mail</SelectItem>
                  )}
                  {customShareOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        {option.icon}
                        <span className="ml-2">{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {shareMethod === "email" && onEmailShare && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  E-mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite o e-mail"
                  className="col-span-3"
                  required
                />
              </div>
            )}
            {shareMethod === "link" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Link
                </Label>
                <div className="col-span-3 flex">
                  <Input
                    id="link"
                    name="link"
                    value={shareLink}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-l-none"
                    onClick={copyToClipboard}
                  >
                    {copySuccess ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">
              {shareMethod === "email" ? (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Convite
                </>
              ) : shareMethod === "link" ? (
                <>
                  <Link className="mr-2 h-4 w-4" />
                  Copiar Link
                </>
              ) : (
                <>
                  {
                    customShareOptions.find(
                      (option) => option.value === shareMethod
                    )?.icon
                  }
                  <span className="ml-2">Compartilhar</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <ToastComponent />
    </Dialog>
  );
}
