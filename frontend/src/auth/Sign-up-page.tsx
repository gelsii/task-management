import { UserCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useState, type SubmitEvent } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import UseAxios from "../hooks/useAxios";
import type { AxiosError } from "axios";
import type { errorResponse } from "../interface/errorResponse";
import Login4 from "@/components/ui/login4";
import type { successResponse } from "@/interface/successResponse";

export default function SignUpPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate, isPending } = useMutation<
    successResponse,
    AxiosError<errorResponse>,
    object
  >({
    mutationFn: (request_data: object) =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST_SERVER}/signup`,
        method: "post",
        config: {
          withCredentials: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: request_data,
        },
      }),
    onSuccess: (data) => toast.success(data.detail),
    onError: (error) =>
      toast.error(error.response?.data.detail || error.message),
  });

  const handleSubmitSignUp = (e: SubmitEvent): void => {
    e.preventDefault();
    mutate({ username, email, password });
  };

  return (
    <section className="w-full h-full flex justify-center items-center ">
      <Login4
        email={setEmail}
        password={setPassword}
        onSubmitFN={handleSubmitSignUp}
        disabledSubmitButton={isPending}
        isHaveUsernameInput={true}
        username={setUsername}
        isHaveResetPassword={false}
        customize={{
          order_ui: [2, 1],
          headingImageBranding: "Create Your Account",
          descriptionImageBranding:
            "Sign up to create your account. Get access to your personal features and settings. It only takes a few moments to get started.",
          headingForm: "Create Your Account",
          descriptionForm: "Sign up to create your account and get started.",
          textSubmitButton: "Create account",
          lastDescriptionForm: [
            "You already have an account?",
            " Sign in your account",
            "/auth/signin",
          ],
        }}
      />
    </section>
  );
}
