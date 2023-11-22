import { AlertCircle } from "lucide-react";

const UnValidObject = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-start overflow-hidden rounded-md border border-gray-300 bg-red-100 px-3 py-2">
      <AlertCircle className="mr-2 h-5 w-5 stroke-red-600" />
      <div className="font-normal text-red-600">{message}</div>
    </div>
  );
};

export default UnValidObject;
