import { useAuth } from "../context/AuthContext";

export const useHasRole = (role) => {
    const { user } = useAuth();
    return user?.username === role;
  };
  