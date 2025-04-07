import { usePermissions } from "@/core/permissions/permissions-provider"
import { Can, CanAll, CanAny, IsAdmin } from "@/core/permissions/can"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldAlert, ShieldCheck, RefreshCw } from "lucide-react"

export default function ExamplePermissionsPage() {
  const { ability, loading, refreshPermissions } = usePermissions()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Exemplo de Permissões</h1>
        <Button onClick={refreshPermissions} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Atualizar Permissões
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Permissões do Usuário</CardTitle>
          <CardDescription>Lista de permissões disponíveis para o usuário atual</CardDescription>
        </CardHeader>
        <CardContent>
          {ability && ability.rules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ability.rules.map((rule, index) => (
                <div key={index} className="bg-muted p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="font-medium">{rule.action}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Sujeito:</span> {rule.subject}
                  </div>
                  {rule.conditions && (
                    <div className="text-sm text-muted-foreground mt-2">
                      <span className="font-medium">Condições:</span> {JSON.stringify(rule.conditions)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Sem permissões</AlertTitle>
              <AlertDescription>Nenhuma permissão encontrada para o usuário atual.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Exemplos de Componentes de Permissão</CardTitle>
            <CardDescription>Demonstração dos componentes de permissão em ação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Componente Can</h3>
              <div className="space-y-2">
                <Can action="read" subject="Company">
                  <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Permissão Concedida</AlertTitle>
                    <AlertDescription>Você tem permissão para ler empresas.</AlertDescription>
                  </Alert>
                </Can>

                <Can
                  action="delete"
                  subject="Company"
                  fallback={
                    <Alert variant="destructive">
                      <ShieldAlert className="h-4 w-4" />
                      <AlertTitle>Permissão Negada</AlertTitle>
                      <AlertDescription>Você não tem permissão para excluir empresas.</AlertDescription>
                    </Alert>
                  }
                >
                  <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Permissão Concedida</AlertTitle>
                    <AlertDescription>Você tem permissão para excluir empresas.</AlertDescription>
                  </Alert>
                </Can>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Componente CanAll</h3>
              <CanAll
                abilities={[
                  ["read", "Carrier"],
                  ["update", "Carrier"],
                ]}
                fallback={
                  <Alert variant="destructive">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>Permissão Negada</AlertTitle>
                    <AlertDescription>Você precisa de permissão para ler E atualizar transportadoras.</AlertDescription>
                  </Alert>
                }
              >
                <Alert>
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>Permissão Concedida</AlertTitle>
                  <AlertDescription>Você tem permissão para ler E atualizar transportadoras.</AlertDescription>
                </Alert>
              </CanAll>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Componente CanAny</h3>
              <CanAny
                abilities={[
                  ["create", "Fleet"],
                  ["update", "Fleet"],
                ]}
                fallback={
                  <Alert variant="destructive">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>Permissão Negada</AlertTitle>
                    <AlertDescription>Você precisa de permissão para criar OU atualizar frotas.</AlertDescription>
                  </Alert>
                }
              >
                <Alert>
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>Permissão Concedida</AlertTitle>
                  <AlertDescription>Você tem permissão para criar OU atualizar frotas.</AlertDescription>
                </Alert>
              </CanAny>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Componente IsAdmin</h3>
              <IsAdmin
                fallback={
                  <Alert variant="destructive">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>Acesso Restrito</AlertTitle>
                    <AlertDescription>Esta seção é visível apenas para administradores.</AlertDescription>
                  </Alert>
                }
              >
                <Alert>
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>Acesso de Administrador</AlertTitle>
                  <AlertDescription>Você tem acesso de administrador.</AlertDescription>
                </Alert>
              </IsAdmin>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uso do Hook usePermissions</CardTitle>
            <CardDescription>Exemplos de como usar o hook usePermissions em componentes</CardDescription>
          </CardHeader>
          <CardContent>
            <PermissionsExample />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PermissionsExample() {
  const { can, canAll, canAny, isAdmin } = usePermissions()

  const canReadCompany = can("read", "Company")
  const canManageUser = can("manage", "User")
  const canReadAndCreateCarrier = canAll([
    ["read", "Carrier"],
    ["create", "Carrier"],
  ])
  const canReadOrCreateFleet = canAny([
    ["read", "Fleet"],
    ["create", "Fleet"],
  ])
  const userIsAdmin = isAdmin()

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-md">
        <code className="text-sm">
          {`const { can, canAll, canAny, isAdmin } = usePermissions();

const canReadCompany = can("read", "Company");
const canManageUser = can("manage", "User");
const canReadAndCreateCarrier = canAll([
  ["read", "Carrier"],
  ["create", "Carrier"]
]);
const canReadOrCreateFleet = canAny([
  ["read", "Fleet"],
  ["create", "Fleet"]
]);
const userIsAdmin = isAdmin();`}
        </code>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>can("read", "Company")</span>
          <span className={canReadCompany ? "text-green-500" : "text-red-500"}>{canReadCompany ? "Sim" : "Não"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>can("manage", "User")</span>
          <span className={canManageUser ? "text-green-500" : "text-red-500"}>{canManageUser ? "Sim" : "Não"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>canAll([["read", "Carrier"], ["create", "Carrier"]])</span>
          <span className={canReadAndCreateCarrier ? "text-green-500" : "text-red-500"}>
            {canReadAndCreateCarrier ? "Sim" : "Não"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>canAny([["read", "Fleet"], ["create", "Fleet"]])</span>
          <span className={canReadOrCreateFleet ? "text-green-500" : "text-red-500"}>
            {canReadOrCreateFleet ? "Sim" : "Não"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>isAdmin()</span>
          <span className={userIsAdmin ? "text-green-500" : "text-red-500"}>{userIsAdmin ? "Sim" : "Não"}</span>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Exemplo de uso em botões:</h3>
        <div className="flex flex-wrap gap-2">
          <Button disabled={!canReadCompany}>Ver Empresas</Button>
          <Button disabled={!canManageUser}>Gerenciar Usuários</Button>
          <Button disabled={!canReadAndCreateCarrier}>Gerenciar Transportadoras</Button>
          <Button disabled={!canReadOrCreateFleet} variant="outline">
            Acessar Frotas
          </Button>
          <Button disabled={!userIsAdmin} variant="destructive">
            Ações de Admin
          </Button>
        </div>
      </div>
    </div>
  )
}
