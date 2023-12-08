import { Link } from "react-router-dom";

export const UIHeader = () => {
  return (
    <header className="fixed left-[50px] right-[50px] top-[20px] z-[10] flex items-center justify-between">
      <Link
        to={"/"}
        className="whitespace-nowrap text-xl font-extrabold uppercase text-[#23262D] transition-colors duration-200 hover:text-[#46448B]"
      >
        UTE Campus
      </Link>
      <ul className="flex items-center justify-center gap-5">
        <li>
          <Link
            to={"/project"}
            className="font-medium text-[#23262D] transition-colors duration-200 hover:text-[#46448B]"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            to={"/contacts"}
            className="font-medium text-[#23262D] transition-colors duration-200 hover:text-[#46448B]"
          >
            Contacts
          </Link>
        </li>
      </ul>
    </header>
  );
};
