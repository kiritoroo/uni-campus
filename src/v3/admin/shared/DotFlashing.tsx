const DotFlashing = () => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-1">
      <div className="h-[6px] w-[6px] animate-[blink_1s_linear_infinite] rounded-full bg-white" />
      <div className="h-[6px] w-[6px] animate-[blink_1s_linear_infinite_250ms] rounded-full bg-white" />
      <div className="h-[6px] w-[6px] animate-[blink_1s_linear_infinite_500ms] rounded-full bg-white" />
    </div>
  );
};

export default DotFlashing;
