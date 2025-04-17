import { PrivateRoutes } from "@/shared/enums/routes";
import { authenticate, cleanError, logout } from "@/store/features/auth";
import { useAppSelector } from "@/store/hook/app-selector";
import { selectAuth } from "@/store/selectors";
import { AppDispatch } from "@/store/store";
import { loginSchema } from "@/validations/login";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export type LoginFormValues = z.infer<typeof loginSchema>;

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useAppSelector(selectAuth);

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        description: "Tente novamente",
        action: {
          label: "Fechar",
          onClick: () => {
            console.log("closing...");
          },
        },
      });
      dispatch(cleanError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await dispatch(authenticate(data.email, data.password));
      navigate(PrivateRoutes.Home);
      reloadPage();
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await dispatch(authenticate(email, password));
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const isAuthenticated = !!user;

  return {
    user,
    isLoading,
    handleSubmit,
    error,
    login,
    logout: logoutUser,
    isAuthenticated,
  };
};
