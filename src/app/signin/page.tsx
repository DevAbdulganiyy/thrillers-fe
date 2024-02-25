"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { SignInSchema } from "../../schema/authSchema";
import { loginSuccess } from "../../redux/slices/auth";
import authService from "../../services/auth";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import Input from "@/components/Input";
import { BeatLoader } from "react-spinners";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const methods = useForm({
    mode: "onChange",

    resolver: yupResolver(SignInSchema),
  });

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
    }
  }, [methods, methods.formState.isSubmitSuccessful]);

  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data));
    console.log(data);

    try {
      const response = await authService.login({
        email: data?.email,
        password: data?.password,
      });
      // console.log(response.user);
      dispatch(loginSuccess(response.user));
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials");
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <form
          className="h-screen max-w-sm mx-auto pt-4 lg:pt-10"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {/* <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              required
            />
          </div> */}
          <Input
            label="Email"
            placeholder="name@gmail.com"
            type="email"
            htmlFor="email"
            name="email"
          />
          {/* <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div> */}
          <Input
            label="Password"
            placeholder="*******"
            type="password"
            htmlFor="password"
            name="password"
          />
          <div className="mb-5">
            Not yet signed up?{" "}
            <Link href={"/signup"} className="text-blue-500">
              Sign up
            </Link>
          </div>
          <button
            type="submit"
            disabled={
              methods.formState.isSubmitting || !methods.formState.isValid
            }
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-600 disabled:hover:bg-blue-200 dark:focus:ring-blue-200 bg-blue-400 dark:bg-blue-500 disabled:cursor-not-allowed"
          >
            {methods.formState.isSubmitting ? <BeatLoader /> : "Login"}
          </button>
        </form>
      </FormProvider>
      <ToastContainer />
    </>
  );
}
