import ContextProvider from "@/components/ui/ContextProvider";
import { Toaster } from "../components/ui/sonner";
import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main className="w-screen h-screen no-scrollbar overflow-x-hidden">
      <ContextProvider>
        <Outlet />
      </ContextProvider>
      <Toaster />
    </main>
  );
}
