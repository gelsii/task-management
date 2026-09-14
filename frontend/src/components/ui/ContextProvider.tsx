import ActivateNavsContext from "@/contexts/activateNavsContext";
import IconCreateTaskContext from "@/contexts/showCreateTaskIcon";
import { useState, type ReactNode } from "react";

type ContextProviderProps = {
  children: ReactNode;
};

export default function ContextProvider(props: ContextProviderProps) {
  const [isShowIconCreateTask, setIsShowIconCreateTask] = useState(true);
  const [activeNavs, setActiveNavs] = useState<string>("Dashboard");

  return (
    <section className="w-full h-full">
      <IconCreateTaskContext.Provider
        value={{ isShowIconCreateTask, setIsShowIconCreateTask }}
      >
        <ActivateNavsContext.Provider value={{ activeNavs, setActiveNavs }}>
          {props.children}
        </ActivateNavsContext.Provider>
      </IconCreateTaskContext.Provider>
    </section>
  );
}
