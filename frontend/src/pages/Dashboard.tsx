import React, { useContext, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconCreateTaskContext from "@/contexts/showCreateTaskIcon";
import UseQueryTasks from "@/components/ui/UseQueryTasks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Dashboard() {
  const { setIsShowIconCreateTask } = useContext(IconCreateTaskContext);

  const tabs = [
    {
      component: (
        <UseQueryTasks status_tasks="todo" status_next="in_progress" />
      ),
      name: "Todo",
    },
    {
      component: (
        <UseQueryTasks status_tasks="in_progress" status_next="in_review" />
      ),
      name: "In Progress",
    },
    {
      component: <UseQueryTasks status_tasks="in_review" status_next="done" />,
      name: "In Review",
    },
    {
      component: <UseQueryTasks status_tasks="done" status_next="in_review" />,
      name: "Done",
    },
  ];

  useEffect(() => setIsShowIconCreateTask(true), [setIsShowIconCreateTask]);

  return (
    <main className="px-5">
      <Tabs defaultValue="Todo" className="w-full ">
        <div className="py-5 sticky top-10">
          <TabsList className="w-full ">
            {tabs.map((value, index) => {
              return (
                <TabsTrigger value={value.name} key={index}>
                  {value.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <Separator className="bg-[#0f85fa]" />

        {/* <div className="mt-4 px-10 flex gap-2 items-center w-full justify-center">
          <Input type="search" placeholder="Search..." className="h-10 max-w-xl" />
          <Button className="w-30 h-10" >Search</Button>
        </div> */}

        {tabs.map((value, index) => {
          return (
            <TabsContent
              value={value.name}
              className="w-full  mt-2 mb-5"
              key={index}
            >
              <main className="w-full ">{value.component}</main>
            </TabsContent>
          );
        })}
      </Tabs>
    </main>
  );
}
