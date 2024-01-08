import { NavLink, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import ServiceAuth from "@/actions/authentication";
import { navLinksForAdmin } from "../../constant";

function NavbarForAdmin() {
  const logoutMutation = useMutation({
    mutationFn: ServiceAuth.logout,
  });

  if (logoutMutation.isSuccess) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <header className="container flex justify-between py-[45px]">
      <h1>Khusus Admin lur</h1>
      <Button
        variant={"destructive"}
        onClick={() => {
          logoutMutation.mutate();
        }}
      >
        Logout
      </Button>
      <ul className="flex gap-x-[40px]">
        {navLinksForAdmin.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.link}
              className={({ isActive }: { isActive: boolean }) =>
                `${isActive ? "text-white" : "text-second"} leading-7`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default NavbarForAdmin;
