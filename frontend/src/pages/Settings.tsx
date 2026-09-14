import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import UseAxios from "@/hooks/useAxios";
import type { errorResponse } from "@/interface/errorResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Info, LogOut, SettingsIcon, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { successResponse } from "@/interface/successResponse";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import ActivateNavsContext from "@/contexts/activateNavsContext";

type detailsResponse = {
  username: string;
  email: string;
  password: string;
};

export default function Settings() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { setActiveNavs } = useContext(ActivateNavsContext);

  const { data, isLoading } = useQuery<
    { detail: detailsResponse },
    AxiosError<errorResponse>
  >({
    queryKey: ["users", "settings", "details"],
    queryFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST_SERVER}/settings/details`,
        method: "post",
        config: {
          withCredentials: true,
        },
      }),
  });

  const logout = useMutation<successResponse, AxiosError<errorResponse>>({
    mutationFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST_SERVER}/settings/logout`,
        method: "post",
        config: {
          withCredentials: true,
        },
      }),
    onSuccess: (data) => {
      toast.success(data.detail);

      queryClient.invalidateQueries({
        queryKey: ["api", "users", "access", "dashboard"],
      });
      queryClient.refetchQueries({
        queryKey: ["api", "users", "access", "dashboard"],
      });

      navigate("/auth/signin", { replace: true });
    },
    onError: (error) => toast.error(error.response?.data.detail),
  });

  useEffect(() => setActiveNavs("Settings"), [setActiveNavs])

  if (isLoading) {
    return <h1>loading details...</h1>;
  }

  return (
    <section className="w-full flex flex-col h-full justify-center items-center ">
      {/* profile container */}

      <main className="w-full max-w-4xl flex flex-col h-full  justify-start items-start  px-5  border-r border-l border-[#868383] ">
        <h1 className="mt-4 flex gap-1 items-center text-[#0f85fa]">
          <SettingsIcon className="w-5 h-5 " /> Settings
        </h1>

        <Separator className="bg-[#0f85fa] my-2" />

        <div className="grid gap-4 w-full">
          <h1 className="flex gap-1 items-center">
            <Info className="w-5 h-5" />
            details
          </h1>

          <div className="flex gap-2">
            <Label>Username: </Label>
            <Input
              type="text"
              className="h-7"
              readOnly
              disabled
              defaultValue={data?.detail.username}
            />
          </div>
          <div className="flex gap-2">
            <Label>Email: </Label>
            <Input
              type="email"
              className="h-7"
              readOnly
              disabled
              defaultValue={data?.detail.email}
            />
          </div>
          <div className="flex gap-2">
            <Label>Password: </Label>
            <Input
              type="password"
              className="h-7"
              readOnly
              disabled
              defaultValue={data?.detail.password}
            />
          </div>
        </div>

        <Separator className="bg-[#0f85fa] my-5" />

        {/* logout container */}
        <div className="w-full">
          <AlertDialog>
            <AlertDialogTrigger asChild className="w-full">
              <Button variant="destructive">Logout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <LogOut />
                </AlertDialogMedia>
                <AlertDialogTitle>Logout Account?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to log out? Your current session will be
                  ended. You'll need to log in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  variant="outline"
                  disabled={logout.isPending}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => logout.mutate()}
                  disabled={logout.isPending}
                >
                  logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </section>
  );
}
