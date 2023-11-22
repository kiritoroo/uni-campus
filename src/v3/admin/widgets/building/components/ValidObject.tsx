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
    <div className="flex w-full items-stretch justify-start overflow-hidden rounded-md border border-gray-300">
      <div className="flex grow items-center justify-start bg-green-100 px-3 py-2">
        <CheckCircle2 className="mr-2 h-5 w-5 stroke-green-600" />
        <div className="font-normal text-green-600">{message}</div>
      </div>
      <button
        type="button"
        className="border-l border-l-gray-300 bg-[#FAFAFA] px-3"
        onClick={toggleShow}
      >
        {isShow ? (
          <Eye className="stroke-gem-onyx/80" />
        ) : (
          <EyeOff className="stroke-gem-onyx/80" />
        )}
      </button>
    </div>
  );
};

export default ValidObject;
