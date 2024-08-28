import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Profile } from "../Profile";
import ThemeToggle from "../Toggle";
import { Notification } from "../Notification";
import { getUserLocalStorage } from "@/utils/auth";

export function NavBar() {
  const user = getUserLocalStorage();

  if (!user) return null;
  return (
    <nav className="fixed bg-background border-b w-full sm:pl-12">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="hidden sm:flex sm:items-center">
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Cadastros</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Transportadoras</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              {/* <BellIcon className="h-5 w-5" /> */}
              <Notification />
              <span className="sr-only">Notificações</span>
              <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Profile showAvatar name={user.name} showHello />
          </div>
        </div>
      </div>
    </nav>
  );
}
