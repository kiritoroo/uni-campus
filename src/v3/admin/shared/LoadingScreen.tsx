import { SpinnerLoading } from "./SpinnerLoading";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full">
      <SpinnerLoading width={50} height={50} />
    </div>
  );
};

export default LoadingScreen;
