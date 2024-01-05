import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { openToast } from "@/reducers/toast";
import ServiceAuth from "../../actions/authentication";

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();

  const loginMutation = useMutation({
    mutationFn: ServiceAuth.login,
    onError: () => {
      dispatch(
        openToast({
          isActive: true,
          message: "Login gagal",
          type: "error",
        })
      );
    },
    onSuccess: () => {
         dispatch(
      openToast({
        isActive: true,
        message: "Login berhasil",
        type: "success",
      })
    );
    setTimeout(() => {
      navigate("/dashboard")
    }, 2000);
    }
  });

  // if (loginMutation.isSuccess) {
  //   dispatch(
  //     openToast({
  //       isActive: true,
  //       message: "Login berhasil",
  //       type: "success",
  //     })
  //   );
  //   setTimeout(() => {
  //     return <Navigate to={"/dashboard"} />;
  //   }, 4000);
  // }

  const onSubmit: SubmitHandler<User> = async (payload) => {
    loginMutation.mutate({
      username: payload.username,
      password: payload.password,
    });
    reset();
  };
  return (
    <div className="container max-w-full">
      <div className="bg-blue-900 rounded-lg p-10">
        <h1 className="text-center text-[32px] font-bold capitalize">Login</h1>
        <span className="font-dm leading-7 block text-center mt-5">
          Siapa anda ?, jangan macem - macem
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 mt-6"
        >
          <div>
            <Input placeholder="Username" {...register("username", { required: "Username diperlukan" })}
            />
          </div>
          <small className="text-red-500">
            {errors.username && errors.username.message}
          </small>
          <div>
            <Input
              type="password" placeholder="Password" {...register("password", { required: "Password diperlukan" })}
            />
            <small className="text-red-500">
              {errors.password && errors.password.message}
            </small>
          </div>
          {loginMutation.isPending ? (
            <button
              className="bg-blue-600 self-center rounded-lg w-fit font-bold font-dm leading-loose text-center px-[32px] py-3"
              disabled
            >
              Logging...
            </button>
          ) : (
            <button
              className="bg-blue-600 self-center rounded-lg w-fit font-bold font-dm leading-loose text-center px-[32px] py-3"
              type="submit"
            >
              Login.
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
