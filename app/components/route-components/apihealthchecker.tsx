import { useEffect, useState } from "react";
import { toast } from "sonner";
import { baseUrl } from "./data";
import { useAppDispatch } from "~/redux/hooks/hook";
import { logout } from "~/redux/features/authSlice";

const API_URL = `${baseUrl}/health`;

export function ApiHealthChecker() {
  const [isApiUp, setIsApiUp] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkApi = async () => {
      try {
        const res = await fetch(API_URL, { method: "GET" });
        if (res.ok) {
          if (!isApiUp) {
            toast.success("✅ API is back online", {
              position: "top-right",
              richColors: true,
            });
            setIsApiUp(true);
          }
        } else {
          throw new Error("Bad response");
        }
      } catch (err) {
        if (isApiUp) {
          toast.error("⚠️ API is down", {
            description: "The server is not responding.",
            position: "top-right",
            richColors: true,
          });
          setIsApiUp(false);
          // dispatch(logout());
        }
      }
    };

    checkApi(); // run immediately
    interval = setInterval(checkApi, 30000); // check every 30s

    return () => clearInterval(interval);
  }, [isApiUp]);

  return null;
}
