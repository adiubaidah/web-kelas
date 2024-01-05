import { Outlet, Navigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ServiceAuth from "../../actions/authentication";
// import { User } from "@/types";

interface UnauthorizedRouteProps {
  children?: React.ReactNode;
}

const UnauthorizedRoute = ({ children }: UnauthorizedRouteProps) => {
  const { isPending, isError } = useQuery({
    queryKey: ["isNotAuth"],
    queryFn: ServiceAuth.isNotAuth,
    retry: false,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    // jika error berarti terautentikasi
    return <Navigate to="/dashboard" />;
  }
  
  return children ? children : <Outlet />;
};

export default UnauthorizedRoute;
