import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { TLoginSchema, loginSchema } from "@v3/admin/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserServices } from "@v3/admin/hooks/useUserServices";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@v3/admin/hooks/useAuthStore";

const LoginForm = () => {
  const authStore = useAuthStore();
  const auhStoreActions = authStore.use.actions();

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
        toast.success("Login success", {
          theme: "light",
          autoClose: 2000,
        });
      },
      onError: (error: any) => {
        toast.error(Error(error).message, {
          theme: "light",
          autoClose: 2000,
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
          type="text"
          required
          placeholder="example@uni.x"
          autoComplete={"on"}
        />
        <FormInput
          {...register("plain_pwd")}
          label="Password"
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
