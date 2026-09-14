import { NotFound } from "@/components/ui/NotFound";
import UseAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router-dom";
import type { errorResponse } from "@/interface/errorResponse";
import type { AxiosError } from "axios";
import RootHeader from "@/components/ui/RootHeader";
import { Button } from "@/components/ui/button";
import type { successResponse } from "@/interface/successResponse";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const { isLoading, isSuccess, error, isError } = useQuery<
    successResponse,
    AxiosError<errorResponse>
  >({
    queryKey: ["api", "users", "access", "dashboard"],
    retry: 0,
    queryFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST_SERVER}/access`,
        method: "post",
        config: {
          withCredentials: true,
        },
      }),

    refetchInterval: 5000,
  });

  if (isLoading) return <h1>loading...</h1>;

  return (
    <>
      <section className="w-full h-full no-scrollbar">
        {isSuccess && (
          <div className="w-full h-full">
            <RootHeader />
            <Outlet />
          </div>
        )}
        {isError && (
          <NotFound
            status_error={error.status}
            message={error.response?.data.detail}
          >
            <Button onClick={() => navigate("/auth/signin")}>
              Sign In Account
            </Button>
          </NotFound>
        )}
      </section>
    </>
  );
}
