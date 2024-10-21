import { motion, AnimatePresence } from "framer-motion";
import { Search, Building2, Clock, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { NavBar } from "@/components/NavBar";
import { useSelectCompany } from "./hooks/useSelectCompany";
import { useAppSelector } from "@/store/hook/app-selector";
import { selectAuth } from "@/store/selectors";

function CompanySelection() {
  const { user } = useAppSelector(selectAuth);
  const {
    searchTerm,
    setSearchTerm,
    select,
    isLoading,
    defaultCompany,
    filteredCompanies,
    handleCompanySelect,
  } = useSelectCompany();

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-background via-primary/5 to-secondary/10`}
    >
      <NavBar isCompanySelection />
      <main className="container mx-auto pt-20">
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">
              Bem-vindo de volta{user ? `, ${user.name}` : ""}!
            </CardTitle>
            <CardDescription>
              Selecione uma empresa para continuar seu trabalho.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Suas Empresas</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">Pesquisar Empresas</h4>
                <Input
                  type="text"
                  placeholder="Digite o nome da empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Tabs defaultValue="recentes" className="w-full">
          <TabsList className="mb-4 bg-background">
            <TabsTrigger value="recentes">Recentes</TabsTrigger>
            <TabsTrigger value="todas">Todas as Empresas</TabsTrigger>
          </TabsList>
          <TabsContent value="recentes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <Card key={index} className="cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[200px]" />
                              <Skeleton className="h-4 w-[160px]" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                : filteredCompanies.slice(0, 3).map((company) => (
                    <motion.div
                      key={company.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="cursor-pointer hover:bg-primary/5 transition-all duration-200 overflow-hidden shadow-md hover:shadow-lg hover:border-primary/20 border border-transparent"
                        onClick={() => handleCompanySelect(company.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle className="flex items-center">
                                {company.name}
                                {defaultCompany === company.id && (
                                  <Badge variant="secondary" className="ml-2">
                                    Padrão
                                  </Badge>
                                )}
                              </CardTitle>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompanySelect(company.id, true);
                              }}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  defaultCompany === company.id
                                    ? "fill-yellow-400"
                                    : ""
                                }`}
                              />
                            </Button>
                          </div>
                          <CardDescription className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Último acesso: {"12/12/2024"}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {/* <div className="flex items-center justify-between"> */}
                          {/* <Badge
                              variant={
                                company. === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {company.status === "active"
                                ? "Ativo"
                                : "Inativo"}
                            </Badge> */}
                          {/* <span className="text-sm text-muted-foreground">
                              {company.phone} projetos
                            </span>
                          </div> */}
                        </CardContent>
                        <CardFooter className="bg-primary/5 flex justify-end p-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80"
                            onClick={() => {
                              select(company.id); // Chama a função select para setar a companhia
                              // Redirecionamento ou outras ações podem ser feitas aqui
                            }}
                          >
                            Acessar <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="todas">
            <ScrollArea className="h-[600px] rounded-md border p-4 shadow-inner">
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCompanies.map((company) => (
                    <motion.div
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className="cursor-pointer hover:bg-primary/5 transition-all duration-200 overflow-hidden shadow-md hover:shadow-lg hover:border-primary/20 border border-transparent"
                        onClick={() => handleCompanySelect(company.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle className="flex items-center">
                                {company.name}
                                {defaultCompany === company.id && (
                                  <Badge variant="secondary" className="ml-2">
                                    Padrão
                                  </Badge>
                                )}
                              </CardTitle>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompanySelect(company.id, true);
                              }}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  defaultCompany === company.id
                                    ? "fill-yellow-400"
                                    : ""
                                }`}
                              />
                            </Button>
                          </div>
                          <CardDescription className="flex items-center">
                            <Building2 className="w-4 h-4 mr-1" />
                            ID: {company.id}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {/* <div className="flex items-center justify-between">
                            <Badge
                              variant={
                                company.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {company.status === "active"
                                ? "Ativo"
                                : "Inativo"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {company.projects} projetos
                            </span>
                          </div> */}
                        </CardContent>
                        <CardFooter className="bg-primary/5 flex justify-end p-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80"
                          >
                            Acessar <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default CompanySelection;
