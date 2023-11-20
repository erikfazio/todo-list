import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../supabase";

const Login = () => {
  return (
    <div>
      <div className="container mx-auto">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
        />
      </div>
    </div>
  );
};

export default Login;
