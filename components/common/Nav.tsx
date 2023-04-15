import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import "react-icons/io";
import { IoMdContact } from "react-icons/io";
import { BsCoin } from "react-icons/bs";
const NavLinks = [
  {
    href: "/",
    children: (
      <div className="w-12">
        <Logo className="h-fit" width={200} layout="responsive" height={200} />
      </div>
    ),
  },
  // { href: "/contact", children: <IoMdContact size={30}></IoMdContact> },
  { href: "/funding", children: <BsCoin size={30}></BsCoin> },
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
                ? className.toString().replace("-bottom-1", "bottom-2")
                : className;
            return (
              <li className="relative h-fit" key={link.href}>
                <div className={` hover:before:w-full ${adjusted}`}>
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
