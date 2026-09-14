import UseAxios from "@/hooks/useAxios";
import { type errorResponse } from "@/interface/errorResponse";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["api", "users", "access", "auth"],
    retry: 0,
    queryFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST_SERVER}/access`,
        method: "post",
        config: {
          withCredentials: true,
        },
      }),
  });


  if (isLoading) return <h1>loading...</h1>;
  if (isSuccess) return <Navigate to="/dashboard" replace={true} />;

  return <section className="w-full h-full">{isError && <Outlet />}</section>;
}
