export const SpinnerLoading = ({ width, height }: { width: number; height: number }) => {
  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full items-center justify-center">
        <div
          style={{ width: width, height: height }}
          className=" border-nat-white animate-spin rounded-full border-4 border-y-blue-400 border-r-blue-400"
        />
      </div>
    </div>
  );
};
