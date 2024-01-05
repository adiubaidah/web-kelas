import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import toastAction, { Toaster } from "react-hot-toast";

import { resetToast } from "@/reducers/toast";
import { Toast } from "@/types";

const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const toastState = useSelector((state: { toast: Toast }) => state.toast);
  useEffect(() => {
    if (toastState.isActive) {
      if (toastState.type === "success") {
        toastAction.success(toastState.message);
      } else if (toastState.type === "error") {
        toastAction.error(toastState.message);
      }
      dispatch(resetToast());
    }
  }, [toastState, dispatch]);
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default ToasterProvider;
