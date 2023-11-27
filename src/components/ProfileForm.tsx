import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import useUpdateUserByUserIdMutation from "@/hooks/users/useUpdateUserByUserIdMutation";
import { useAuth } from "@/context/AuthProvider";

type FormData = {
  first_name: string;
  last_name: string;
};

const ProfileForm = ({ defaultValues }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      first_name: defaultValues.first_name,
      last_name: defaultValues.last_name,
    },
  });
  const { user } = useAuth();
  const updateProfile = useUpdateUserByUserIdMutation();

  const handleUpdateProfile = (data: FormData) => {
    updateProfile.mutate({
      id: user.id,
      ...data,
    });
  };

  return (
    <form
      className="container mx-auto flex flex-col px-0 gap-y-8"
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
      <Input type="submit" className="cursor-pointer" />
    </form>
  );
};

export default ProfileForm;
