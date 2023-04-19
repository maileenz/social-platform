import { useRouteLoaderData } from "@remix-run/react";

export const useRouteData = <T>(routeId: string): T => {
  return useRouteLoaderData(routeId) as T;
};
