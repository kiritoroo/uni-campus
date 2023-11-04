import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="px-3">
      <ul className="space-y-2">
        <li className="group flex items-center justify-between hover:cursor-pointer">
          <Link to={"buildings"} className="font-medium text-[#B6B6B6] group-hover:text-[#2953E9]">
            Buildings
          </Link>
          <ChevronRight stroke="#999999" className="ml-8 h-4 w-4 group-hover:stroke-[#2953E9]" />
        </li>
        <li className="group flex items-center justify-between hover:cursor-pointer">
          <Link to={"spaces"} className="font-medium text-[#B6B6B6] hover:text-[#2953E9]">
            Spaces
          </Link>
          <ChevronRight stroke="#999999" className="ml-8 h-4 w-4 group-hover:stroke-[#2953E9]" />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
