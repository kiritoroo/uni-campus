import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { TLoginSchema, loginSchema } from "@v3/admin/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserServices } from "@v3/admin/hooks/useUserServices";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@v3/admin/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { AtSign, Lock } from "lucide-react";
import { useUniToastify } from "@v3/admin/shared/UniToastify";

const LoginForm = () => {
  const authStore = useAuthStore();
  const auhStoreActions = authStore.use.actions();
  const navigate = useNavigate();

  const uniToast = useUniToastify();

  const formMethod = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      plain_pwd: "",
    },
  });

  const { register, watch, handleSubmit } = formMethod;

  const { login } = useUserServices();

  const { mutate, isLoading } = login(
    {
      ...watch(),
    },
    {
      onSuccess: (data) => {
        auhStoreActions.auth(data.access_token);
        navigate("/x");
        uniToast.success({
          desc: "Login success",
        });
      },
      onError: (error: any) => {
        uniToast.error({
          desc: Error(error).message,
        });
      },
    },
  );

  const onSubmitForm = () => {
    console.log(watch());
    mutate();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="h-fit w-fit border border-slate-300 bg-slate-50"
    >
      <div className="px-6 pb-3 pt-8">
        <div className="text-xl font-semibold uppercase">Login</div>
        <div className="py-2 text-sm font-semibold text-slate-400">Sign in to Uni Campus X </div>
      </div>
      <div className="border-b border-slate-200" />
      <div className="min-w-[380px] space-y-5 px-6 pb-8 pt-5">
        <FormInput
          {...register("username")}
          label="Username"
          icon={<AtSign className="h-4 w-4 stroke-slate-600" />}
          type="text"
          required
          placeholder="example@uni.x"
          autoComplete={"on"}
        />
        <FormInput
          {...register("plain_pwd")}
          label="Password"
          icon={<Lock className="h-4 w-4 stroke-slate-600" />}
          type="password"
          required
          placeholder="Password"
          autoComplete={"on"}
        />
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center bg-blue-400 py-2 text-sm font-semibold text-white"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
