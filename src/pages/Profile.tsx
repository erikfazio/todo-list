import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { Input } from "@/components/ui/input";
import useUsersQuery from "@/hooks/users/useUsersQuery";
import useUserByIdQuery from "@/hooks/users/useUserByIdQuery";
import useUpdateUserByUserIdMutation from "@/hooks/users/useUpdateUserByUserIdMutation";

function Profile() {
  const { data: profile, isLoading: isProfileLoading } = useUserByIdQuery();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const { user, isAdmin, signOut } = useAuth();
  const { data: users, isLoading: isUsersLoading } = useUsersQuery();
  const updateProfile = useUpdateUserByUserIdMutation();

  const handleUpdateProfile = () => {
    updateProfile.mutate({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
    });
  };

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Profile</h1>
        <Button variant="outline" onClick={handleUpdateProfile}>
          Update profile
        </Button>
      </div>
      <div className="container mx-auto flex flex-col gap-y-8">
        <Input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
    </main>
  );
}

export default Profile;
