import { trpc } from "@/lib/trpc";
import type { User } from "@prisma/client";
import { useMemo } from "react";
import { useRouteData } from "./use-route-data";

export type AuthUser = Pick<
  User,
  | "id"
  | "avatarHash"
  | "avatarUrl"
  | "name"
  | "surname"
  | "email"
  | "confirmedAt"
>;

export const useAuth = () => {
  const { user } = useRouteData<{
    user: AuthUser;
  }>("root");

  const isLoggedIn = useMemo(() => !!user?.id, [user]);

  const login = trpc.auth.login.useMutation();

  const logout = trpc.auth.logout.useMutation();

  const register = trpc.auth.register.useMutation();

  return { user, isLoggedIn, login, logout, register };
};
