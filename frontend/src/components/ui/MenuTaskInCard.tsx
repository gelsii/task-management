import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Trash2Icon } from "lucide-react";

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
import { Separator } from "./separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "@/hooks/useAxios";
import type { AxiosError } from "axios";
import type { errorResponse } from "@/interface/errorResponse";
import { toast } from "sonner";

type MenuTaskInCardProps = {
  taskId: string;
  statusTask: string;
};

export default function MenuTaskInCard(props: MenuTaskInCardProps) {
  const queryClient = useQueryClient();

  const deleteTask = useMutation<{ detail: string }, AxiosError<errorResponse>>(
    {
      mutationFn: () =>
        UseAxios({
          url: `${import.meta.env.VITE_HOST_SERVER}/tasks?task_id=${props.taskId}&status_task=${props.statusTask}`,
          method: "delete",
          config: {
            withCredentials: true,
          },
        }),
      onSuccess: (data) => {
        toast.success(data.detail);

        queryClient.invalidateQueries({
          queryKey: ["users", "tasks", `${props.statusTask}`],
        });
        queryClient.refetchQueries({
          queryKey: ["users", "tasks", `${props.statusTask}`],
        });
      },
      onError: (error) => toast.error(error.response?.data.detail),
    },
  );

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>

            <Separator className="mb-2" />

            <AlertDialog>
              <AlertDialogTrigger className="w-full " asChild>
                <Button variant="destructive" className="w-full justify-start">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                    <Trash2Icon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    variant="outline"
                    disabled={deleteTask.isPending}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    disabled={deleteTask.isPending}
                    onClick={() => deleteTask.mutate()}
                  >
                    {deleteTask.isPending ? "Deleting" : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
