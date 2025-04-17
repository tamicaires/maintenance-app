import loginImage from "@/assets/login-image.png";
import Image from "@/components/img/img";

import { Form } from "@/components/ui/form";
import useLogin from "../hooks/use-login";
import InputField from "@/components/forms/input-field";
import { Lock, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo/logo";

export default function LoginPage() {
  const { form, handleSubmit, isPending, canSubmit } = useLogin();
  return (
    <div className="min-h-screen flex flex-col xl:flex-row max-xl:justify-center">
      <div className="hidden xl:block relative w-full xl:w-3/6 h-64 xl:h-screen overflow-hidden">
      "oi"
        {/* <Image
          src={loginImage}
          alt="Tela Oficina Manutenção"
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        /> */}
      </div>

      <div className="w-full lg:w-3/6 flex items-center justify-center p-6 pt-20 sm:pt-0 lgp-12 bg-white mx-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap- text-center">
            <Logo showText />
            <h1 className="text-2xl font-bold">Entre na sua conta</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Digite seu email abaixo para entrar na sua conta
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                id="email"
                name="email"
                type="email"
                icon={Mail}
                label="E-mail"
                placeholder="seu@email.com"
              />
              <div>
                <div className="flex justify-end">
                  <button className="text-sm text-end text-primary hover:underline">
                    Esqueci minha senha
                  </button>
                </div>
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  label="Senha"
                  icon={Lock}
                  placeholder="Sua senha"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-6  text-white"
                disabled={isPending || !canSubmit}
                isLoading={isPending}
                loadingText="Entrando..."
              >
                <LogIn className="mr-2 h-5 w-5" />
                Entrar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
    // <div className="grid min-h-svh lg:grid-cols-2">
    //   <div className="flex flex-col gap-4 p-6 md:p-10">
    //     <div className="flex justify-center gap-2 md:justify-start">
    //       <a href="#" className="flex items-center gap-2 font-medium">
    //         <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
    //           <Logo className="h-2" />
    //         </div>
    //         Facter Truck
    //       </a>
    //     </div>
    //     <div className="flex flex-1 items-center justify-center">
    //       <div className="w-full max-w-xs">
    //         <LoginForm />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="relative hidden bg-muted lg:block">
    //     <Img
    //       source={loginImage}
    //       alt="Image"
    //       className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale "
    //     />
    //   </div>
    // </div>
  );
}
