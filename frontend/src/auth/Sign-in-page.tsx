import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import UseAxios from "../hooks/useAxios";
import { type SubmitEvent } from "react";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { type errorResponse } from "../interface/errorResponse";
import Login4 from "@/components/ui/login4";
import type { tasksResponse } from "@/interface/tasksResponse";
import type { successResponse } from "@/interface/successResponse";

export default function SignInPage() {
  const navigate = useNavigate();

  // const [signinForm, setSigninForm] = useState<object>({
  //   email: "",
  //   password: "",
  // });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate, isPending } = useMutation<
    successResponse,
    AxiosError<errorResponse>,
    object
  >({
    mutationFn: (request_data: object) =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST_SERVER}/signin`,
        method: "post",
        config: {
          withCredentials: true,
          data: request_data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      }),
    onSuccess: (data) => {
      toast.success(data.detail);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => toast.error(error.response?.data.detail),
  });

  const handleSubmitSigin = (e: SubmitEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <section className="w-full h-full flex justify-center items-center">
      {/* <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <h1 className="justify-center items-center flex">
            <UserCircle className="w-20 h-20" />{" "}
          </h1>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <form onSubmit={handleSubmitSigin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="h-10"
                  required
                  onChange={(e) =>
                    setSigninForm({ ...signinForm, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="h-10"
                  required
                  onChange={(e) =>
                    setSigninForm({ ...signinForm, password: e.target.value })
                  }
                  placeholder="ex.admin123"
                />
              </div>
              {isError && (
                <p className="text-red-500 ml-1 text-xs">
                  {error.response?.data.detail}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "loading.." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <CardDescription>
            You don't have account? <Link to="/auth/signup">Sign Up</Link>
          </CardDescription>
        </CardFooter>
      </Card> */}
      <Login4
        email={setEmail}
        password={setPassword}
        onSubmitFN={handleSubmitSigin}
        disabledSubmitButton={isPending}
        isHaveUsernameInput={false}
        username="none"
        isHaveResetPassword={true}
        customize={{
          order_ui: [1, 2],
          headingImageBranding: "Secure Access",
          descriptionImageBranding:
            "Protect your account with secure access and keep your information safe. Always make sure your login details are kept private and only access your account from trusted devices.",
          headingForm: "Sign in Account",
          descriptionForm:
            "Sign in to your account to securely access your personal information and features.",
          textSubmitButton: "Sign In to your account",
          lastDescriptionForm: [
            "You don't have account?",
            " Create an account",
            "/auth/signup",
          ],
        }}
      />
    </section>
  );
}
