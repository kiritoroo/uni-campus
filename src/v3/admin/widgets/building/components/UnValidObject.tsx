import { AlertCircle } from "lucide-react";

const UnValidObject = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-start bg-red-100 px-3 py-2">
      <AlertCircle className="mr-2 h-5 w-5 stroke-red-600" />
      <div className="text-red-700">{message}</div>
    </div>
  );
};

export default UnValidObject;
