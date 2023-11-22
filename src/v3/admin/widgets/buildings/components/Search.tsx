import { cn } from "@Utils/common.utils";
import { FlexRow } from "@v3/admin/shared/Wrapper";
import { SearchIcon, XCircle } from "lucide-react";
import { useCommonStore } from "../hooks/useCommonStore";

const Search = () => {
  const commonStore = useCommonStore();
  const searchValue = commonStore.use.searchValue();

  const handleClearSearch = () => {
    commonStore.setState({ searchValue: "" });
  };

  return (
    <FlexRow className="w-full justify-between overflow-hidden rounded-md border border-gray-300 transition-colors duration-200 focus-within:border-gem-onyx/50 focus-within:shadow-[0_0_0_2px_#32323422]">
      <FlexRow className="grow justify-start">
        <SearchIcon className="ml-3 mr-1 h-5 w-5 stroke-gem-onyx" />
        <input
          className={cn(
            "h-[36px] w-full grow bg-white px-3 text-sm font-medium text-gem-onyx/80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-80",
          )}
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => {
            commonStore.setState({ searchValue: e.target.value });
          }}
        />
      </FlexRow>
      {searchValue.length > 0 && (
        <button type="button" className="animate-[fadein_200ms_linear]" onClick={handleClearSearch}>
          <XCircle className="mx-2 h-5 w-5 stroke-gem-onyx/80" />
        </button>
      )}
    </FlexRow>
  );
};

export default Search;
