import { GuestGuard } from "@/auth/context/guard/guest-guard";

export default function Layout({ children }: IChildren) {
  return <GuestGuard>{children}</GuestGuard>;
}
