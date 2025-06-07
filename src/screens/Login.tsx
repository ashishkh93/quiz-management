"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import LoginThumbnail from "@/components/auth/LoginThumbnail";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#f6f6f6] overflow-hidden">
      <div className="bg-[#f6f6f6] w-full p-20">
        <Card className="w-full max-w-[1100px] mx-auto border border-[#cfd4d9] shadow-DA rounded-2xl">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10">
            <LoginThumbnail />
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
