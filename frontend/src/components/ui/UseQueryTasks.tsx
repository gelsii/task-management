import type { errorResponse } from "@/interface/errorResponse";
import type { tasksResponse } from "@/interface/tasksResponse";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import UseAxios from "../../hooks/useAxios";
import { NotFound } from "@/components/ui/NotFound";
import TaskCard from "./TaskCard";
import type { statusTypes } from "@/interface/statusTasks";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Skeleton } from "./skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

type UseQueryTasksProps = {
  status_tasks: statusTypes;
  status_next: statusTypes;
};

const UseQueryTasks = (props: UseQueryTasksProps) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery<
    tasksResponse,
    AxiosError<errorResponse>
  >({
    queryKey: ["users", "tasks", `${props.status_tasks}`],
    retry: 0,
    queryFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST_SERVER}/tasks?status_task=${props.status_tasks}`,
        method: "get",
        config: {
          withCredentials: true,
        },
      }),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 10 }).map((value, index) => {
          return (
            <Card className="" key={index}>
              <CardHeader className="flex justify-between gap-3">
                <div className="grid gap-3">
                  <Skeleton className="w-40 h-4" />
                  <Skeleton className="w-20 h-4" />
                </div>

                <Skeleton className="w-7 h-2" />
              </CardHeader>
              <CardContent className="grid gap-5">
                <Skeleton className="w-full h-30" />

                <Skeleton className="w-full h-10" />
              </CardContent>
              <CardFooter className="justify-end">
                <Skeleton className="w-30 h-7" />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  }

  if (isError) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle className="text-2xl">
            {error.response?.data.detail}
          </EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription>
            We couldn’t find this task. You can create a new task and start
            working on something new.
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <>
      {isSuccess && (
        <div className=" xl:px-10">
          <div className="grid place-content-center grid-cols-1 min-[570px]:grid-cols-2 min-[800px]:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
            {data.detail.map((task, index) => {
              return (
                <TaskCard
                  key={index}
                  cardDescription={task.task_content}
                  cardDate={task.task_date}
                  cardType={task.task_type}
                  taskId={task._id}
                  statusTask={props.status_tasks}
                  status_next={props.status_next}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default UseQueryTasks;
