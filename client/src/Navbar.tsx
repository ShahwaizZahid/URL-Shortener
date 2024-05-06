import Switcher from "./Switcher";
import { Link } from "react-router-dom";
import { useUrl } from "./context/UrlProvider";
import { useAuth } from "./context/AuthProvider";

export default function Navbar() {
  const { user, logout } = useAuth()!;
  const { checked } = useUrl()!;
  return (
    <>
      <nav
        className={`${
          checked ? "bg-black" : "bg-white backdrop:filter backdrop-blur-xl"
        } py-3 flex justify-between items-center px-4 fixed w-full`}
      >
        <div className="flex justify-center items-center">
          <h1
            className={` ${
              checked ? "text-blue-300" : "text-black"
            }  font-bold text-3xl`}
          >
            Shortly
          </h1>
          <div className="text-white text-xl font-bold  ml-5">
            <Link to={"/"}>Home</Link>
          </div>
        </div>
        <div className="flex w-fit justify-center items-center">
          {user && (
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
          )}

          {!user && (
            <button
              className={`${
                checked ? "text-black bg-blue-400" : "text-white bg-black"
              } font-bold  px-3 text-lg rounded-xl py-2 mx-4`}
            >
              <Link to="/signup">Signup</Link>
            </button>
          )}

          {user && (
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className={`${
                checked ? "text-black bg-blue-400" : "text-white bg-black"
              } font-bold  px-3 text-lg rounded-xl py-2 mx-4`}
            >
              logout
            </button>
          )}

          <Switcher />
        </div>
      </nav>
    </>
  );
}
