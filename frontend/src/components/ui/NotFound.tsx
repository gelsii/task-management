import { SearchIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import type { ReactNode } from "react";

type NotFoundPropsType = {
  message: string | undefined;
  status_error: number | undefined;
  children: ReactNode | undefined;
};

export function NotFound(props: NotFoundPropsType) {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <Empty>
        <EmptyHeader>
          <EmptyTitle className="text-2xl">
            {props.status_error} - {props.message}
          </EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription>{props.children}</EmptyDescription>
          <EmptyDescription>
            Need help? <a href="#">Contact support</a>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </section>
  );
}
