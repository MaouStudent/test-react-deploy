// components
import React from "react";
import { NavLink } from "react-router-dom";
// Add this to your project's type definitions
declare module "react-router-dom" {
  interface NavLinkProps {
    activeClassName?: string;
  }
}

export default function Header(): JSX.Element {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    window.location.href = url;
    console.log(e);
    return;
    // add className target tailwind underline blue
    if (url !== "/") {
      e.currentTarget.classList.add(
        "mx-2",
        "px-2",
        "text-1xl",
        "outline-purple-700",
        "hover:bg-gray-100",
        "underline",
        "text-blue-500"
      );
    }
  };

  return (
    <div className="container bg-bluegreen1 mx-auto">
      <header className="mx-auto flex items-center text-center justify-between px-8 py-3">
        <div className="flex items-center">
          <img
            onClick={() => {
              window.location.href = "/";
            }}
            src="https://mynovel.co/static/assets/img/logos/MyNovel_sec1.png"
            alt="Logo"
            className="overflow-clip box-content h-16 cursor-pointer"
          />
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            className={({ isActive }) =>
              !isActive
                ? "mx-2 px-2 text-1xl outline-purple-700 hover:bg-gray-100"
                : "underline font-bold text-blue-500"
            }
            to="/cartoon"
          >
            การ์ตูน
          </NavLink>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setShowMenu(!showMenu)}>
            <svg
              className="h-6 w-6 fill-current text-gray-600"
              viewBox="0 0 24 24"
            >
              {showMenu ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 6H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2zm0 5H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2zm0 5H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              )}
            </svg>
          </button>
        </div>
        {showMenu && (
          <div className="md:hidden absolute top-0 left-0 w-full h-full bg-white z-10">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <NavLink
                className={({ isActive }) =>
                  !isActive
                    ? "mx-2 px-2 text-1xl outline-purple-700 hover:bg-gray-100"
                    : "underline font-bold text-blue-500"
                }
                to="/cartoon"
                onClick={() => setShowMenu(!showMenu)}
              >
                การ์ตูน
              </NavLink>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
