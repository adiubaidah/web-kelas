import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ServiceAuth from "../../actions/authentication"
// import { User } from "@/types";

interface ProtectedRouteProps {
    
    children?: React.ReactNode
    redirectPath: string
}

const ProtectedRoute = ({

    redirectPath = '/',
    children,
  }: ProtectedRouteProps) => {

    const {isPending, isError} = useQuery({
      queryKey: ["isAuth"],
      queryFn: ServiceAuth.isAuth,
      retry: false,
      staleTime: 1000 * 60 * 60
    })
    
    if(isPending) {
      return <span>Loading...</span>
    }

    if (isError) {
      return <Navigate to={redirectPath} replace={true} />;
    }
    
    return children ? children : <Outlet />;
  };

  export default ProtectedRoute