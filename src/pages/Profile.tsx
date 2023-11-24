import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { Input } from "@/components/ui/input";
import useUsersQuery from "@/hooks/users/useUsersQuery";
import useUserByIdQuery from "@/hooks/users/useUserByIdQuery";
import { useForm } from "react-hook-form";
import useUpdateUserByUserIdMutation from "@/hooks/users/useUpdateUserByUserIdMutation";

function Profile() {
  const { data: profile, isLoading: isProfileLoading } = useUserByIdQuery();
  const { user } = useAuth();
  const updateProfile = useUpdateUserByUserIdMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateProfile = (data: any) => {
    console.log(data);
    updateProfile.mutate({
      id: user.id,
      ...data,
    });
  };

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      {!isProfileLoading && (
        <>
          <div className="flex justify-between">
            <h1 className="font-bold text-4xl">Profile</h1>
            <Button variant="outline" onClick={handleUpdateProfile}>
              Update profile
            </Button>
          </div>
          <form
            className="container mx-auto flex flex-col gap-y-8"
            onSubmit={handleSubmit(handleUpdateProfile)}
          >
            <Input
              type="text"
              placeholder="First name"
              {...register("first_name", { required: true })}
            />
            {errors.first_name && <span>This field is required</span>}
            <Input
              type="text"
              placeholder="Last name"
              {...register("last_name", { required: true })}
            />
            {errors.last_name && <span>This field is required</span>}
            <Input type="submit" />
          </form>
        </>
      )}
    </main>
  );
}

export default Profile;
