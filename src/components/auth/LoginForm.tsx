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
import { adminLoginService } from "@/api-service/auth.service";
import { setAuthCookie } from "@/app/actions/set-auth-cookie";
import { useAuthContext } from "@/auth/hooks/use-auth-context";
import { paths } from "@/routes/path";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    const loginRes = (await adminLoginService(data)) as IDefaultResponse;

    if ((loginRes?.data as ObjType)?.token) {
      await setAuthCookie({
        token: (loginRes?.data as ObjType)?.token as string,
      }); // Cookie is now securely stored
      await checkUserSession();
    }

    if (loginRes.status) {
      router.push(paths.dashboard.root);
    } else {
      toast.error(loginRes?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-start items-center w-full"
    >
      <div className="flex justify-start items-center w-full">
        <div className="flex flex-col items-start gap-6 w-full">
          <div className="text-2xl">
            Sign <span className="text-[#8ABB2A]">In</span>
          </div>
          {/* Email field */}
          <div className="w-full">
            <InputField
              label="Email Address"
              id="email"
              name="email"
              register={register}
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
          <Button className="w-full sm:w-[298px] md:w-[200px] lg::w-1/2 h-[54px] rounded-xl bg-gradient-to-r from-[#71D561] to-[#00A32E] shadow-10 font-bold text-lg mt-8 cursor-pointer">
            Sign In
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
