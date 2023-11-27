import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { TLoginSchema, loginSchema } from "@v3/admin/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserServices } from "@v3/admin/hooks/useUserServices";
import { Box, Loader2 } from "lucide-react";
import { useAuthStore } from "@v3/admin/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { AtSign, Lock } from "lucide-react";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import DotFlashing from "@v3/admin/shared/DotFlashing";
import { cn } from "@Utils/common.utils";

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
          desc: error.message,
        });
      },
    },
  );

  const onSubmitForm = () => {
    mutate();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="h-fit w-fit overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md"
    >
      <div className="px-6 pb-3 pt-8">
        <div className="pb-4">
          <div className="flex w-full items-center justify-center pb-3">
            <div className="h-fit w-fit rounded-full bg-gem-onyx p-2">
              <Box className="block stroke-white" />
            </div>
          </div>
          <div className="text-center text-2xl font-bold">Uni Campus X</div>
          <div className="text-center text-sm font-medium">
            Manager Uni Campus, the behind the scene.
          </div>
        </div>
      </div>
      <div className="min-w-[400px] space-y-5 px-6 pb-8 pt-2">
        <div className="text-center text-lg font-medium">Sign in</div>
        <FormInput
          {...register("username")}
          label="Username"
          icon={<AtSign className="h-4 w-4 stroke-gem-onyx" />}
          type="text"
          required
          placeholder="example@uni.x"
          autoComplete={"on"}
        />
        <FormInput
          {...register("plain_pwd")}
          label="Password"
          icon={<Lock className="h-4 w-4 stroke-gem-onyx" />}
          type="password"
          required
          placeholder="Password"
          autoComplete={"on"}
        />
      </div>
      <div className="border-t border-t-gray-300 bg-[#FAFAFA] px-6 py-4">
        <button
          type="submit"
          className="relative inline-flex w-full items-center justify-center rounded-md bg-gem-onyx py-[10px] text-base font-medium text-white transition-colors duration-200 hover:bg-gem-onyx/90 active:bg-gem-onyx disabled:opacity-80"
          disabled={isLoading}
        >
          <div className={cn("relative")}>
            <span className={cn({ "opacity-0": isLoading })}>Login</span>
            {isLoading && (
              <div className="absolute inset-0 z-[1] h-full w-full">
                <DotFlashing />
              </div>
            )}
          </div>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
