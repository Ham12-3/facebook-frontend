import { useAppDispatch } from "@/redux/hooks";
import { refreshToken } from "@/services/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function verifyToken() {
      try {
        await refreshToken();
        router.push("/");
      } catch (error) {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        console.log("Your session has expired");
        console.log(error);
      }
    }
  }, []);
  return { router, pathname, dispatch };
};
