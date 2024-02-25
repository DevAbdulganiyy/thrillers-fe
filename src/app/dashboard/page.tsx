"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAppDispatch } from "../../redux/hooks";
import { useAppSelector } from "../../redux/hooks";
import userService from "@/services/user";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";
import { BeatLoader } from "react-spinners";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { Portal } from "@/components/Portal";
import transactionService from "@/services/transaction";
import { NewTransactionSchema } from "@/schema/transactionSchema";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { TRANSACTION_FEE } from "@/utils/constant";

const Page = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const res = useQuery("users", userService.getAllUsers);

  const methods = useForm({
    mode: "onChange",

    resolver: yupResolver(NewTransactionSchema),
  });

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
    }
  }, [methods, methods.formState.isSubmitSuccessful]);

  const { isLoading, data, refetch } = useQuery(
    ["user", user.id],
    userService.getUser
  );

  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data));
    // console.log(data, user.id);

    try {
      await transactionService.create({
        amount: data?.amount,
        sender: `${user?.id}`,
        receiver: data?.receiver,
        ttype: "debit",
      });

      setShowDropdown(false);
      refetch();
    } catch (error: any) {
      console.error("Unable to transfer credits", error);
      toast.error("Unable to transfer credits");
    }
  };

  const resp = useQuery(
    ["transactions"],
    transactionService.getUserTransactions
  );

  //   const { mutate, ...result } = useMutation(transactionService.create, {
  //     onSuccess: () => {
  //       refetch();
  //       setShowDropdown(false);
  //     },
  //     onError: () => {
  //       toast.error("Unable to process operation at this time");
  //     },
  //   });

  //   console.log(res?.data);

  return (
    <div className="min-h-screen p-4">
      {" "}
      <span
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/signin");
        }}
        className="cursor-pointer fixed top-1 right-1 text-red-500 flex gap-x-1 px-[14.5px] py-2.5 items-center h-[28px] rounded-md"
      >
        Log out
      </span>
      <div className="flex flex-col gap-y-3 text-black text-lg">
        <div>First Name: {data?.firstName}</div>
        <div>Last Name: {data?.lastName}</div>
        <div>Email: {data?.email}</div>
        <div>Account Balance: {data?.credits}</div>
        <div>
          <button
            onClick={() => {
              setShowDropdown(true);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Transfer credits
          </button>
        </div>
      </div>
      {showDropdown && (
        <Portal
          onClose={() => {
            setShowDropdown(false);
          }}
        >
          <div className="w-[483px] bg-white rounded-[16px] flex flex-col">
            <div className="p-4 text-lg font-bold">
              Transfer Credits to a friend
            </div>
            <FormProvider {...methods}>
              <form
                className="w-lg mx-auto"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <Input
                  label="Amount"
                  placeholder="0"
                  type="number"
                  htmlFor="amount"
                  name="amount"
                />
                <Select
                  label="Select a user to transfer credits to"
                  htmlFor="receiver"
                  id="receiver"
                  name="receiver"
                  items={res?.data?.data.filter((userr: any) => {
                    return (
                      userr?.id !== user?.id && userr?.role.name !== "Admin"
                    );
                  })}
                />
                <button
                  type="submit"
                  disabled={
                    methods.formState.isSubmitting || !methods.formState.isValid
                  }
                  className="mt-5 w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-blue-600 disabled:hover:bg-blue-200 disabled:cursor-not-allowed font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {methods.formState.isSubmitting ? (
                    <BeatLoader />
                  ) : (
                    "Transfer credits"
                  )}
                </button>
              </form>
            </FormProvider>
            <div className="w-full rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-8 px-6 py-4 pb-8">
              {/* <button
                type="button"
                className="w-[207px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                onClick={() => {
                  setShowDropdown(false);
                }}
              >
                Cancel
              </button>
              <button
                disabled={result?.isLoading}
                // onClick={() => {
                //   mutate({ userId: id });
                // }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {result?.isLoading ? "Loading" : "Transfer credits"}
              </button> */}
            </div>
          </div>
        </Portal>
      )}
      <div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Transaction List</h2>
          <ul>
            {resp?.data?.map((transaction: any, index: number) => (
              <li key={index} className="border-b border-b-[4px] py-4">
                <div>
                  <span
                    className={`mr-2 ${
                      transaction?.sender?.id === user?.id
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction?.sender?.id === user?.id ? "-" : "+"}
                    {transaction.amount}
                  </span>
                  {transaction?.sender?.id === user?.id ? "Debit" : "Credit"}
                </div>
                <span>Transfer fee: {TRANSACTION_FEE} credit</span>
                <div>
                  <span className="font-semibold">Sender:</span>{" "}
                  {transaction.sender.firstName} {transaction.sender.lastName}
                </div>
                <div>
                  <span className="font-semibold">Receiver:</span>{" "}
                  {transaction.receiver?.firstName}{" "}
                  {transaction.receiver.lastName}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* {resp?.data?.map((transaction: any) => {
          return <div>{transaction?.amount}</div>;
        })} */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
