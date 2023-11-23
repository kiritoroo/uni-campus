const EmptyData = ({ dataName }: { dataName: string }) => {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden rounded-md border border-gray-300 py-20">
      <div className="pb-2 text-base font-medium text-gem-onyx">Data Empty</div>
      <div className="text-sm font-normal text-gem-onyx/80">
        Your data for "{dataName}" is empty.
      </div>
    </div>
  );
};

export default EmptyData;
