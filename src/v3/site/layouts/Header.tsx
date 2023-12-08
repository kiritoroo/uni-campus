import { AlignJustify, Music } from "lucide-react";

const Header = () => {
  return (
    <>
      <div className="fixed left-[100px] top-[35px] z-[999999999] flex w-fit items-center justify-center">
        <div className="hover:bg-gem-sapphire group cursor-pointer bg-transparent bg-white p-3 transition-colors duration-100">
          <AlignJustify className="stroke-gem-sapphire h-5 w-5 transition-all duration-200 group-hover:stroke-white" />
        </div>
      </div>

      <header className="fixed right-1/2 top-[30px] z-[9999999999] flex w-fit translate-x-1/2 items-center justify-center">
        <div className="flex items-center justify-center bg-white px-10 py-2 drop-shadow-sm">
          <div className="text-gem-sapphire mr-20 p-2 text-lg font-bold">UTE Campus</div>
          <div className="flex items-center justify-center">
            <div className="text-gem-sapphire hover:bg-gem-sapphire cursor-pointer bg-transparent px-8 py-2 font-medium transition-colors duration-100 hover:text-white">
              Projects
            </div>
            <div className="text-gem-sapphire hover:bg-gem-sapphire cursor-pointer bg-transparent px-8 py-2 font-medium transition-colors duration-100 hover:text-white">
              Team
            </div>
            <div className="text-gem-sapphire hover:bg-gem-sapphire cursor-pointer bg-transparent px-8 py-2 font-medium transition-colors duration-100 hover:text-white">
              Contact
            </div>
          </div>
        </div>
      </header>

      <div className="fixed right-[100px] top-[35px] z-[999999999] flex w-fit items-stretch justify-center">
        <div className="hover:bg-gem-sapphire group cursor-pointer bg-transparent bg-white p-3 transition-colors duration-100">
          <Music className="stroke-gem-sapphire h-5 w-5 transition-all duration-200 group-hover:stroke-white" />
        </div>
        <div className="hover:bg-gem-sapphire group cursor-pointer bg-transparent bg-white p-3 transition-colors duration-100">
          <div className="text-gem-sapphire font-medium transition-colors duration-200 group-hover:text-white">
            EN
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
