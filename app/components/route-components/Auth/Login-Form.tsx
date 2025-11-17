import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import LoadingSpinner from "../Loading/loading-spinner";
import { type LoginReq } from "~/redux/features/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { getToken } from "../getLocalStorage";

interface LoginFormProps extends React.ComponentProps<"form"> {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    formData: LoginReq
  ) => void;
}

export function LoginForm({
  className,
  handleSubmit,
  ...props
}: LoginFormProps) {
  const { loading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e, formData);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleFormSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Dashboard Login</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your username below to login
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="userName">User Name</FieldLabel>
          <Input
            id="userName"
            name="userName"
            type="text"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              to="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              required
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </Field>
        <Field>
          <FieldLabel className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
            <Checkbox
              checked={formData.rememberMe}
              onCheckedChange={(checked: boolean) =>
                setFormData({ ...formData, rememberMe: checked })
              }
              id="remember"
              className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">Remember Me</p>
            </div>
          </FieldLabel>
        </Field>
        <Field>
          <Button type="submit">
            {loading ? (
              <LoadingSpinner className="flex items-center justify-center" />
            ) : (
              "Login"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
