import { BellIcon, LogOutIcon, UserCircleIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { GetUser, logout } from "~/redux/features/authSlice";
import { useEffect } from "react";
import { getToken, getUserId } from "../getLocalStorage";
import LoadingSpinner from "../Loading/loading-spinner";

export function NavUser() {
  const { isMobile } = useSidebar();
  const dispatch = useAppDispatch();
  const { userData, loading } = useAppSelector((state) => state.auth);
  const token = getToken();
  const UserId = getUserId();

  // get user
  useEffect(() => {
    if (UserId && token) {
      dispatch(GetUser({ UserId, token }));
    }
  }, [dispatch, UserId, token]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={""} alt={"admin"} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {userData?.result?.userName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {userData?.result?.email}
                  </span>
                </div>
                {/* <MoreVerticalIcon className="ml-auto size-4" /> */}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={""} alt={"Admin"} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {" "}
                      {userData?.result?.userName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {userData?.result?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserCircleIcon />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
