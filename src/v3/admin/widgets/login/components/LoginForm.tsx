import { FormInput } from "./FormInput";

const LoginForm = () => {
  return (
    <form className="h-fit w-fit border border-slate-300 bg-slate-50">
      <div className="px-6 pb-3 pt-8">
        <div className="text-xl font-semibold uppercase">Login</div>
        <div className="py-2 text-sm font-semibold text-slate-400">Sign in to Uni Campus X </div>
      </div>
      <div className="border-b border-slate-200" />
      <div className="min-w-[350px] space-y-5 px-6 pb-8 pt-3">
        <FormInput
          label="Username"
          type="text"
          required
          placeholder="example@uni.x"
          autoComplete={"on"}
        />
        <FormInput
          label="Password"
          type="password"
          required
          placeholder="Password"
          autoComplete={"on"}
        />
        <button type="submit" className="w-full bg-slate-400 py-2 text-sm font-semibold text-white">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
