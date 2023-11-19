export const SpinnerLoading = ({ width, height }: { width: number; height: number }) => {
  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full items-center justify-center">
        <div
          style={{ width: width, height: height }}
          className=" border-nat-white border-y-gem-onyx border-r-gem-onyx animate-spin rounded-full border-4"
        />
      </div>
    </div>
  );
};
