import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { FaHandsHelping } from "react-icons/fa";
const NavLinks = [
  {
    href: "/",
    children: (
      <div className="w-12">
        <Logo className="h-fit" width={200} height={200} />
      </div>
    ),
  },
  // { href: "/contact", children: <IoMdContact size={30}></IoMdContact> },
  { href: "/funding", children: <FaHandsHelping size={25} /> },
];

const Nav = () => {
  const className =
    "before:absolute before:-bottom-1 before:h-[2px] before:w-0 before:transition-all before:content-[''] before:bg-white ";
  return (
    <>
      <nav className="fixed top-0 w-full h-12 px-4 py-2 bg-gray-900 shadow-xl">
        <ul className="flex items-center justify-between h-full px-2 text-white">
          {NavLinks.map((link) => {
            const adjusted =
              link.href === "/"
                ? className.replace("before:-bottom-1", "before:bottom-2")
                : className;
            return (
              <li className="relative h-fit" key={link.href}>
                <div className={`hover:before:w-full ${adjusted}`}>
                  <Link tabIndex={0} href={link.href}>
                    {link.children}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="h-12"></div>
    </>
  );
};

export default Nav;
