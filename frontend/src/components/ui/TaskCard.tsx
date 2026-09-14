import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "./separator";
import MenuTaskInCard from "./MenuTaskInCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxios from "@/hooks/useAxios";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { errorResponse } from "@/interface/errorResponse";
import type { statusTypes } from "@/interface/statusTasks";
import type { tasksResponse } from "@/interface/tasksResponse";
import type { successResponse } from "@/interface/successResponse";
import { Label } from "./label";

type TaskCardProps = {
  taskId: string;
  cardDate: string;
  cardDescription: string;
  cardType: string;
  statusTask: statusTypes;
  status_next: statusTypes;
};

export default function TaskCard(props: TaskCardProps) {
  const queryClient = useQueryClient();

  const MovingStageMutation = useMutation<
    successResponse,
    AxiosError<errorResponse>
  >({
    mutationFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST_SERVER}/tasks?current_status=${props.statusTask}&status_req=${props.status_next}&id=${props.taskId}`,
        method: "put",
        config: {
          withCredentials: true,
        },
      }),
    onSuccess: (data) => {
      toast.success(data.detail);

      queryClient.invalidateQueries({
        queryKey: ["users", "tasks", `${props.statusTask}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "tasks", `${props.status_next}`],
      });

      queryClient.refetchQueries({
        queryKey: ["users", "tasks", `${props.statusTask}`],
      });
      queryClient.refetchQueries({
        queryKey: ["users", "tasks", `${props.status_next}`],
      });
    },
    onError: (error) => toast.error(error.response?.data.detail),
  });

  return (
    <section className="mt-5 w-full">
      <Card className="shadow-[0_0_2px_white] w-full  ">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>{props.cardDate}</CardTitle>
          </div>
          <MenuTaskInCard taskId={props.taskId} statusTask={props.statusTask} />
        </CardHeader>
        <CardContent className="grid gap-3">
          <p>{props.cardDescription}</p>

          <Separator />

          <div className="flex justify-start items-start gap-2 w-full">
            <div className="flex gap-2">
              <Label>Task Type: </Label>
              <Badge variant="default" className="rounded-sm mx-1 my-2 h-6">
                {props.cardType}
              </Badge>
            </div>
          </div>
        </CardContent>
        {props.statusTask != "done" && (
          <CardFooter className="flex gap-2 justify-end">
            <Button
              variant="secondary"
              className="h-9"
              disabled={MovingStageMutation.isPending}
              onClick={() => MovingStageMutation.mutate()}
            >
              {MovingStageMutation.isPending
                ? "Moving..."
                : `Move to ${props.status_next.replace("_", " ")}`}{" "}
              <ArrowRight />
            </Button>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}
