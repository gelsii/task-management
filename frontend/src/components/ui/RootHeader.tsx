import { Menu, PenSquareIcon, Settings } from "lucide-react";
import { useContext, useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Label } from "./label";
import IconCreateTaskContext from "@/contexts/showCreateTaskIcon";
import ActivateNavsContext from "@/contexts/activateNavsContext";

export default function RootHeader() {
  const { isShowIconCreateTask } = useContext(IconCreateTaskContext);
  const { activeNavs, setActiveNavs } = useContext(ActivateNavsContext);

  const navigate = useNavigate();

  const navs = [
    {
      url: "/dashboard?id=923847bad123bsdbal92",
      name: "Dashboard",
    },
    {
      url: "/dashboard/settings?id=923847bad123bsdbal92",
      name: "Settings",
    },
  ];

  return (
    <>
      <section className="w-full sticky top-0 bg-[#156ec6] z-100 h-12 rounded-br-2xl rounded-bl-2xl">
        <nav className="w-full h-full">
          <li className="w-full h-full flex justify-around px-8 items-center">
            {navs.map((value, index) => {
              return (
                <Label
                  key={index}
                  onClick={() => {
                    setActiveNavs(value.name);
                    navigate(value.url, { replace: true });
                  }}
                  className={`text-lg font-bold relative h-full  `}
                >
                  {value.name}
                  {activeNavs === value.name && (
                    <div className="absolute w-full rounded-2xl h-1 bg-[#05274a] bottom-2"></div>
                  )}
                </Label>
              );
            })}

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-101 mr-5 mt-4">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex gap-2">
                    <Settings /> Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </li>
        </nav>
      </section>

      {isShowIconCreateTask && (
        <div
          className="fixed bottom-7 right-7 w-15 h-15 z-100 bg-[#0f85fa] flex justify-center items-center rounded-full duration-300 hover:bg-[#0e72d6]"
          onClick={() => {
            setActiveNavs("");
            navigate("/dashboard/create-task", { replace: true });
          }}
        >
          <PenSquareIcon className="w-8 h-8" />
        </div>
      )}
    </>
  );
}
