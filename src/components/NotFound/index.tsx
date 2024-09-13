import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PrivateRoutes } from "@/shared/enums/routes";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-background">
        <CardHeader>
          <CardTitle className="text-center">
            <span className="text-[200px] font-extrabold text-primary">
              404
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl text-muted-foreground pb-8">
            Oops! Parece que você está perdido.
          </p>
          <Link to={PrivateRoutes.Home}>
            <Button className="w-full" size="lg">
              <HomeIcon className="mr-2 h-4 w-4" />
              Voltar para o Inicio
            </Button>
          </Link>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p>
            Se você acredita que chegou aqui por erro,{" "}
            <Link to="/contato" className="text-primary hover:underline">
              entre em contato com o suporte.
            </Link>
            .
          </p>
        </CardFooter>
      </div>
    </div>
  );
}
