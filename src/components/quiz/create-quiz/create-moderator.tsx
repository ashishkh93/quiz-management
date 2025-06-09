"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ModeratorFormValues, moderatorSchema } from "@/utils/schema/moderator.schema";
import { createNewModerator } from "@/api-service/moderator.service";

interface ModeratorFormProps {
    onCancel: () => void;
    isLoading?: boolean;
}

export const ModeratorForm: React.FC<ModeratorFormProps> = ({ onCancel, isLoading = false }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ModeratorFormValues>({
        resolver: zodResolver(moderatorSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: ModeratorFormValues) => {
        const moderatorRes = (await createNewModerator(data)) as IDefaultResponse;
        console.log('moderatorRes: ', moderatorRes);
        if (!moderatorRes.status) {
            toast.error(moderatorRes?.message ?? "Moderator created successfully!");
        } else {
            toast.success(moderatorRes?.message ?? "Moderator created successfully!");
            reset();
            onCancel()
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <Input id="name" placeholder="Enter name here" {...register("fullName")} />
                {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <Input id="email" type="email" placeholder="Enter email here" {...register("email")} />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <Input id="password" type="password" placeholder="Enter password here" {...register("password")} />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="outline" onClick={onCancel} className="px-8">
                    Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save"}
                </Button>
            </div>
        </form>
    );
};
