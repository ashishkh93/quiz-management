import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EyeIcon, LockIcon, MailIcon } from "lucide-react";
import React from "react";

const Login = () => {
  return (
    <div className="bg-[#f6f6f6] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#f6f6f6] w-full p-20">
        <Card className="relative h-full mx-auto border border-solid border-[#cfd4d9] shadow-DA rounded-2xl">
          {/* Left side with image and logo */}
          <div className="absolute h-full top-[3px] left-[3px]">
            <div className="h-full rounded-2xl bg-[url(/mask-group.png)] bg-[100%_100%]">
              <div className="relative w-full h-full top-[30px] left-[30px] bg-[#ffffff40] rounded-[32px] border-[10px] border-solid border-[#ffffff] shadow-[0px_0px_31px_#0e2a451a] backdrop-blur-[20.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(20.5px)_brightness(100%)]">
                <img
                  className="absolute max-w-[450px] max-h-[588px] -top-5 left-[-19px] object-cover"
                  alt="Image"
                  src="/images/login-bg-image.png"
                />
              </div>
            </div>

            <div className="flex flex-col w-[200px] items-center gap-[60px] absolute top-[201px] left-[124px]">
              <img
                className="relative"
                alt="Logo"
                src="/images/logo.png"
              />
            </div>
          </div>

          {/* Right side with login form */}
          <CardContent className="absolute w-[561px] h-[402px] top-[163px] left-[675px]">
            {/* Form fields */}
            <div className="absolute w-[559px] h-[186px] top-[88px] left-0">
              <div className="inline-flex flex-col items-start gap-6 relative">
                {/* Email field */}
                <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
                  <label className="relative w-fit mt-[-1.00px] font-normal text-[#3b3a3a] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                    Email Address
                  </label>

                  <div className="relative w-full h-14">
                    <div className="relative h-14 flex items-center">
                      <div className="absolute left-[17px] z-10 text-[#3b3a3a]">
                        <MailIcon className="w-5 h-5" />
                      </div>
                      <Input
                        className="h-14 pl-12 rounded-2xl border border-solid border-[#adadad]"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Password field */}
                <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
                  <label className="relative w-fit mt-[-1.00px] font-normal text-[#3b3a3a] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                    Password
                  </label>

                  <div className="relative w-full h-14">
                    <div className="relative h-14 flex items-center">
                      <div className="absolute left-[17px] z-10 text-[#3b3a3a]">
                        <LockIcon className="w-5 h-5" />
                      </div>
                      <Input
                        type="password"
                        className="h-14 pl-12 pr-12 rounded-2xl border border-solid border-[#adadad]"
                        placeholder="Enter your password"
                      />
                      <div className="absolute right-[17px] z-10 text-[#3b3a3a] cursor-pointer">
                        <EyeIcon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign In button */}
            <Button className="absolute w-[298px] h-[54px] top-[348px] left-0 rounded-xl bg-gradient-to-r from-[#71D561] to-[#00A32E] shadow-10 font-bold text-lg">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
