import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getToken } from "~/components/route-components/getLocalStorage";
import { LoadingTyping } from "~/components/route-components/Loading/loading-typing";

const RootRoute = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 1);

    return () => clearTimeout(timer);
  }, [checkingAuth, token]);

  // 1️⃣ Show loader while refreshToken is pending
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-black">
        <LoadingTyping />
      </div>
    );
  }

  return token ? navigate("/dashboard") : navigate("/auth/login");
};

export default RootRoute;
