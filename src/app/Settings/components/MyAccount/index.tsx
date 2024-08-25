import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MyAccount() {
  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Informações de perfil</CardTitle>
          <CardDescription>
            Usado para identificar você na companhia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-5">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input onChange={() => {}} value={"Thamires Carvalho"} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="Seu Nome"
                onChange={() => {}}
                value={"Thamires Carvalho"}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Solicitar Mudança</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
          <CardDescription>
            Empresa ao qual você está vinculado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Nome da Empreas"
            onChange={() => {}}
            value={"Vale das Carretas LTDA"}
            readOnly
          />
        </CardContent>
      </Card>
    </div>
  );
}
