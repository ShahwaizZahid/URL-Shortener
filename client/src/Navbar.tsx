import Switcher from "./Switcher";
import { Link } from "react-router-dom";
import { useUrl } from "./context/UrlProvider";

export default function Navbar() {
  const { checked } = useUrl()!;
  return (
    <>
      <nav
        className={`${
          checked ? "bg-black" : "bg-white backdrop:filter backdrop-blur-xl"
        } py-3 flex justify-between items-center px-4 fixed w-full`}
      >
        <h1
          className={` ${
            checked ? "text-blue-300" : "text-black"
          }  font-bold text-3xl`}
        >
          Shortly
        </h1>

        <div className="flex w-fit justify-center items-center">
          <Link to="/list">
            <div className="flex px-3 w-fit -h-fit justify-center items-center ">
              <span
                className={`${
                  checked ? "text-blue-300" : "text-black"
                } font-bold  px-2 hidden md:block text-lg`}
              >
                Short Urls
              </span>
              <img
                className="w-12 h-12 px-2 fill-red-300"
                src="list-solid.svg"
                alt="List"
              />
            </div>
          </Link>
          <Switcher />
        </div>
      </nav>
    </>
  );
}
