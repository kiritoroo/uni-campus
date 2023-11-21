import { useNavigate } from "react-router-dom";
import Button from "./Button";

const NotFound = ({ message }: { message: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="pb-8 text-3xl font-semibold">
        <span className="rounded-lg bg-gem-onyx/20 px-4 py-2 text-4xl font-bold">404</span>{" "}
      </div>
      <div className="text-2xl font-medium">{message}</div>
      <Button
        className="mt-12 py-3"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back to before page
      </Button>
    </div>
  );
};

export default NotFound;
