import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const NavItem = ({ label, href }: { label: string; href: string }) => {
  return (
    <Link to={href} className="block bg-[#EAEAEA] px-5 py-2">
      <div className="flex items-center justify-between text-gray-600">
        <p className="text-sm font-normal group-hover:text-[rgb(41,83,233)]">{label}</p>
        <ChevronRight stroke="#999999" className="ml-10 h-3 w-3 group-hover:stroke-[#2953E9]" />
      </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className="px-2">
      <ul className="space-y-2">
        <li className="group">
          <NavItem label="Buildings" href="buildings" />
        </li>
        <li className="group">
          <NavItem label="Spaces" href="spaces" />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
