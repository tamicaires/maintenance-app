import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PublicRoutes } from "@/shared/enums/routes";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, useAuth } from "./hooks/signIn";
import { loginSchema } from "@/validations/login";
import useLogin from "../auth/login/hooks/use-login";

export function Login() {
  // const { handleSubmit, isLoading } = useAuth();

  // const form = useForm<LoginFormValues>({
  //   resolver: zodResolver(loginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  const { form, handleSubmit, isPending, canSubmit } = useLogin();

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Preencha seus dados para login
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className="grid gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link
                        to={PublicRoutes.ForgotPassword}
                        className="text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login com Google
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Não possui uma conta?{" "}
            <Link to={PublicRoutes.Register} className="underline">
              Registre-se
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block sm:flex sm:justify-center sm:items-center">
        <iframe
          src="https://lottie.host/embed/3f63ebb8-4b6f-4092-9fff-547182e857c5/LPa2cF9NRp.json"
          height={800}
          width={500}
          className="m-auto"
        ></iframe>
      </div>
    </div>
  );
}
