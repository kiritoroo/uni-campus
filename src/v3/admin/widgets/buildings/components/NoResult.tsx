const NoResult = ({ searchValue }: { searchValue: string }) => {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden rounded-md border border-gray-300 py-20">
      <div className="pb-2 text-base font-medium text-gem-onyx">No Results Found</div>
      <div className="text-sm font-normal text-gem-onyx/80">
        Your search for "{searchValue}" did not return any results.
      </div>
    </div>
  );
};

export default NoResult;
