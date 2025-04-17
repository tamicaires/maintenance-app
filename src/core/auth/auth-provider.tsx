import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtService } from "./jwt-service";
import type { IUser } from "@/shared/types/auth";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "@/store/features/auth-slice";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: IUser | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUserState] = useState<IUser | null>(null);
  const router = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Verificar se o usuário já está autenticado
        const token = jwtService.getToken();
        if (token) {
          const userData = await jwtService.validateToken(token);
          if (userData) {
            setUserState(userData);
            dispatch(setUser(userData));
            setIsAuthenticated(true);
          } else {
            // Token inválido
            handleLogout();
          }
        }
      } catch (error) {
        console.error("Authentication initialization error:", error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado e tentando acessar rota protegida
    if (!isLoading && !isAuthenticated && !isPublicRoute(location.pathname)) {
      router("/login");
    }
  }, [isAuthenticated, isLoading, location.pathname, router]);

  const isPublicRoute = (path: string) => {
    const publicRoutes = [
      "/login",
      "/register",
      "/forgot-password",
      "/reset-password",
    ];
    return publicRoutes.includes(path);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await jwtService.login(email, password);
      setUserState(userData);
      dispatch(setUser(userData));
      setIsAuthenticated(true);
      router("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    jwtService.removeToken();
    setUserState(null);
    dispatch(clearUser());
    setIsAuthenticated(false);
  };

  const logout = () => {
    handleLogout();
    router("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
