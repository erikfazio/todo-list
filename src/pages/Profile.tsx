import useUserByIdQuery from "@/hooks/users/useUserByIdQuery";
import ProfileForm from "@/components/ProfileForm";
import { useAuth } from "@/context/AuthProvider";

function Profile() {
  const { user } = useAuth();
  const { data: profile, isLoading: isProfileLoading } = useUserByIdQuery(
    user.id
  );

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      {!isProfileLoading && profile && (
        <>
          <div className="flex justify-between">
            <h1 className="font-bold text-4xl">Profile</h1>
          </div>
          {!isProfileLoading && <ProfileForm defaultValues={profile} />}
        </>
      )}
    </main>
  );
}

export default Profile;
