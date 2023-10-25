import { Link } from "react-router-dom";

export const UIHeader = () => {
  return (
    <header className="fixed left-[50px] right-[50px] top-[25px] z-[10] flex items-center justify-between">
      <Link
        to={"/"}
        className="text-2xl font-extrabold uppercase text-[#23262D] transition-colors duration-200 hover:text-[#46448B]"
      >
        UTE Campus
      </Link>
      <ul className="flex items-center justify-center gap-5">
        <li>
          <Link
            to={"/project"}
            className="font-medium text-[#23262D] transition-colors duration-200 hover:text-[#46448B]"
          >
            Project
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
