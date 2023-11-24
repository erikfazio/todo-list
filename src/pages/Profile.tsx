import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { Input } from "@/components/ui/input";
import useUsersQuery from "@/hooks/users/useUsersQuery";
import useUserByIdQuery from "@/hooks/users/useUserByIdQuery";

function Profile() {
  const { data: profile, isLoading: isProfileLoading } = useUserByIdQuery();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState(profile?.["last_name"]);
  const { user, isAdmin, signOut } = useAuth();
  const { data: users, isLoading: isUsersLoading } = useUsersQuery();

  console.log(profile);

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Profile</h1>
        <Button variant="outline">Update profile</Button>
      </div>
      <div className="container mx-auto flex flex-col gap-y-8">
        <Input type="text" placeholder="First name" value={firstName} />
        <Input type="text" placeholder="Last name" value={lastName} />
      </div>
    </main>
  );
}

export default Profile;
function useProfileQuery(): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
