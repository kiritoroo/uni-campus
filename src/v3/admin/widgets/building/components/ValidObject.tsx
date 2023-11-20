import { CheckCircle2, Eye, EyeOff } from "lucide-react";

const ValidObject = ({
  message,
  isShow,
  toggleShow,
}: {
  message: string;
  isShow: boolean;
  toggleShow: () => void;
}) => {
  return (
    <div className="flex w-full items-stretch justify-start">
      <div className="flex grow items-center justify-start bg-green-100 px-3 py-2">
        <CheckCircle2 className="mr-2 h-5 w-5 stroke-green-600" />
        <div className="text-green-700">{message}</div>
      </div>
      <button type="button" className="bg-slate-50 px-3" onClick={toggleShow}>
        {isShow ? <Eye className="stroke-slate-500" /> : <EyeOff className="stroke-slate-500" />}
      </button>
    </div>
  );
};

export default ValidObject;
