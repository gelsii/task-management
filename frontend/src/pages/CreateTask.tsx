import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { type MouseEvent, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import IconCreateTaskContext from "@/contexts/showCreateTaskIcon";
import ActivateNavsContext from "@/contexts/activateNavsContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "@/hooks/useAxios";
import type { AxiosError } from "axios";
import type { errorResponse } from "@/interface/errorResponse";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { successResponse } from "@/interface/successResponse";

export default function CreateTask() {
  const navigate = useNavigate();

  const { setIsShowIconCreateTask } = useContext(IconCreateTaskContext);

  useEffect(() => setIsShowIconCreateTask(false), [setIsShowIconCreateTask]);

  const [formTask, setFormTask] = useState({
    date: "",
    content: "",
    taskType: "",
  });
  const [isEnableCreateTask, setIsEnableCreateTask] = useState(true);

  const queryClient = useQueryClient();

  const { setActiveNavs } = useContext(ActivateNavsContext);

  useEffect(() => setActiveNavs(" "), [setActiveNavs]);

  const { mutate, isPending } = useMutation<
    successResponse,
    AxiosError<errorResponse>,
    object
  >({
    mutationFn: (req_data: any) =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST_SERVER}/tasks`,
        method: "post",
        config: {
          withCredentials: true,
          data: req_data,
        },
      }),
    onSuccess: (data) => {
      toast.success(data.detail);

      queryClient.invalidateQueries({ queryKey: ["users", "tasks", "todo"] });
      queryClient.refetchQueries({
        queryKey: ["users", "tasks", "todo"],
      });

      setIsEnableCreateTask(false);
      setTimeout(() => setIsEnableCreateTask(true), 10000);
    },
    onError: (error) => toast.error(error.response?.data.detail),
  });

  const handleCreateTaskButton = (e: SubmitEvent) => {
    e.preventDefault();

    if (isEnableCreateTask) {
      mutate(formTask);
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-start items-center">
      <div className="w-full h-fit  flex gap-2 justify-start items-start fixed left-10">
        <Button
          className="bg-[#21467f] text-white mt-5 hover:bg-[#1f3d6c]"
          onClick={() => {
            navigate("/dashboard", { replace: true });
            setActiveNavs("Dashboard");
          }}
        >
          <ArrowLeftCircle /> Back
        </Button>
      </div>

      <main className="flex gap-2 w-full h-full my-10  md:my-0">
        <div className="w-full h-full hidden bg-linear-to-br from-[#210947] via-[#085287] to-[#0f32fa] rounded-tl-2xl rounded-bl-2xl order-2 justify-center flex-col  items-center lg:flex">
          <div className="w-20 h-20 bg-[#1a1b22] flex justify-center items-center rounded-2xl">
            <ClipboardList className="w-10 h-10" />
          </div>

          <h1 className="mt-5 text-2xl font-black">
            Create Your <span className="text-[#0f85fa]">Task</span> Now!
          </h1>
          <p className="text-center max-w-xl">
            Turn your ideas into action by creating a task. Stay organized,
            track your progress, and get things done one step at a time.
          </p>
        </div>

        <div className="w-full h-full flex flex-col justify-center items-center px-4 ">
          <Card className="w-full max-w-xl h-fit lg:py-10 ">
            <CardHeader className=" px-6 lg:px-10">
              <CardTitle className=" text-2xl  font-bold">
                Create your <span className="text-[#0f85fa]">Task</span>
              </CardTitle>
              <CardDescription>
                Add the details of your task to stay organized. Set a title,
                description, and other important information. Keep track of your
                tasks and manage them easily.
              </CardDescription>
            </CardHeader>
            <CardContent className=" px-6 lg:px-10">
              <form
                onSubmit={handleCreateTaskButton}
                className=" w-full rounded-xl grid gap-6"
              >
                <div className="flex gap-5 justify-around items-center">
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="taskDate">Task Date: </Label>
                    <Input
                      type="date"
                      id="taskDate"
                      placeholder="ex.Code"
                      maxLength={20}
                      className="h-10"
                      required
                      onChange={(e) =>
                        setFormTask({ ...formTask, date: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2 w-full">
                    <Label htmlFor="taskType">Task Type: </Label>
                    <Input
                      type="text"
                      id="taskType"
                      placeholder="ex.Code"
                      maxLength={20}
                      className="h-10"
                      required
                      onChange={(e) =>
                        setFormTask({ ...formTask, taskType: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="taskContent">Task Content: </Label>
                  <Textarea
                    className="resize-none h-80"
                    id="taskContent"
                    required
                    onChange={(e) =>
                      setFormTask({ ...formTask, content: e.target.value })
                    }
                  ></Textarea>
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  disabled={!isEnableCreateTask || isPending}
                  className="h-10"
                >
                  {isPending ? "Creating..." : "Create"}
                </Button>

                {!isEnableCreateTask && (
                  <p className="text-red-500 text-sm">
                    Please wait a 10 seconds to create again a task.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </section>
  );
}
