import { LogIn } from "lucide-react";
import { LoginForm } from "~/components/route-components/Auth/Login-Form";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { getToken } from "~/components/route-components/getLocalStorage";
import { LoginRequest, type LoginReq } from "~/redux/features/authSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = getToken();
  const [attemptedLogin, setAttemptedLogin] = useState(false);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  // ✅ Show toast after login attempt
  useEffect(() => {
    if (!attemptedLogin || !data) return;
    const showToast = data.success ? toast.success : toast.error;
    showToast(data.statusCode, {
      description: data.message,
      position: "top-right",
      richColors: true,
    });
    if (data?.success) {
      navigate("/dashboard", { replace: true });
    }
  }, [attemptedLogin, data, navigate]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    data: LoginReq
  ) => {
    e.preventDefault();
    dispatch(
      LoginRequest({
        req: data,
      })
    );
    setAttemptedLogin(true);
  };

  // ✅ Don't show form if logged in
  if (token || data?.success) return null;

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <LogIn className="size-4" />
            </div>
            Dk Global Fashion Wear Ltd.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/login.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginPage;
