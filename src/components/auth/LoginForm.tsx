// @ts-nocheck

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/schema/login.schema";
import InputField from "../shared/input/InputField";
import {
  adminLoginService,
  adminNextLoginService,
} from "@/api-service/auth.service";
import { setAuthCookie } from "@/app/actions/set-auth-cookie";
import { useAuthContext } from "@/auth/hooks/use-auth-context";
import { paths } from "@/routes/path";
import GradientButton from "../molecules/gradient-button/gradient-button";
import { useBoolean } from "@/hooks/useBoolean";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const { checkUserSession } = useAuthContext();
  const loadingBool = useBoolean();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    loadingBool.onTrue();
    const loginRes = (await adminNextLoginService(data)) as IDefaultResponse;

    if (Number(loginRes?.status) === 200 && loginRes?.token) {
      await setAuthCookie({
        token: loginRes?.token as string,
      }); // Cookie is now securely stored
      await checkUserSession();
    }

    if (loginRes.status) {
      router.push(paths.quiz_management.root);
    } else {
      toast.error(loginRes?.message);
    }
    loadingBool.onFalse();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-start items-center w-full"
    >
      <div className="flex justify-start items-center w-full">
        <div className="flex flex-col items-start gap-6 w-full">
          <div className="text-2xl font-bold">
            Sign{" "}
            <span className="text-transparent bg-gradient-to-b from-[#8ABB2A] to-[#3C9B36] bg-clip-text">
              In
            </span>
          </div>

          {/* Email field */}
          <div className="w-full">
            <InputField
              label="Email Address"
              id="email"
              name="email"
              register={register}
              className="!rounded-2xl h-14"
              placeholder="Enter your email address"
              icon={MailIcon}
              error={errors?.email?.message}
            />
          </div>

          {/* Password field */}
          <div className="w-full">
            <InputField
              label="Password"
              id="password"
              name="password"
              register={register}
              className="!rounded-2xl h-14"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              icon={LockIcon}
              rightIcon={
                showPassword ? (
                  <EyeOffIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )
              }
              error={errors?.password?.message}
            />
          </div>

          {/* Sign In button */}
          <GradientButton
            fromGradient="from-[#82C63F]"
            toGradient="to-[#39B54A]"
            className="w-full sm:w-[298px] md:w-[200px] h-[45px] text-md font-bold rounded-[12px] bg-gradient-to-br from-[#82C63F] to-[#39B54A] shadow-[0px_2px_8px_0px_#0000003B]"
            loading={loadingBool.bool}
          >
            Sign In
          </GradientButton>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
