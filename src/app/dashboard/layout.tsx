"use client";
import { ReactNode, FC, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { checkTokenExpiration } from "@/utils/helper-functions";
import { useRouter } from "next/navigation";
import { loginSuccess } from "../../redux/slices/auth";
import { useAppDispatch } from "../../redux/hooks";

export default function Layout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const jwtToken = localStorage?.getItem("token");
    const isTokenExpired = checkTokenExpiration(jwtToken);
    setLoading(false);

    if (isTokenExpired) {
      // console.log("Token has expired.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/signin");
    } else {
      // console.log("Token is valid and has not expired.");
      const storedUser = localStorage?.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        dispatch(loginSuccess(JSON.parse(storedUser)));
      }
    }
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <BeatLoader />
      </div>
    );

  if (user) {
    return <div>{children}</div>;
  }
}
