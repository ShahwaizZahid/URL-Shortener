import React from "react";
import { useAuth } from "./context/AuthProvider";
import { useForm } from "react-hook-form";
import { type LoginData } from "./context/AuthProvider";
import { Link } from "react-router-dom";
import { useUrl } from "./context/UrlProvider";
import { useState } from "react";
export default function SignupForm() {
  const { login, loginMessage } = useAuth()!;
  const { checked } = useUrl()!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const [hide, setHide] = useState<{ type: string; url: string }>({
    type: "password",
    url: "eye-slash-regular.svg",
  });

  const togglePasswordVisibility = () => {
    const newType = hide.type === "password" ? "text" : "password";
    const newUrl =
      hide.url === "eye-regular.svg"
        ? "eye-slash-regular.svg"
        : "eye-regular.svg";
    setHide({ type: newType, url: newUrl });
  };
  return (
    <>
      <div
        className={`${
          checked ? "bg-dark " : "bg-Light"
        }  w-full min-h-[100vh] h-fit  py-8  flex flex-col justify-center items-center`}
      >
        <h1
          className={`${
            checked
              ? "text-white bg-black border-white"
              : "text-black bg-white border-black"
          }  cursor-pointer  rounded-full text-3xl font-bold  py-3 px-5 border-2`}
        >
          Login
        </h1>
        <form
          className={`${
            checked
              ? "text-white bg-black border-white"
              : "text-black bg-white border-black"
          }
           w-fit h-fit p-10 rounded-xl border-2 mt-4`}
          onSubmit={handleSubmit(login)}
        >
          <div className="w-full h-20 flex flex-col mt-2">
            <label className="text-lg font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className={`outline-none  border-2 px-5 ml-8 py-2 ${
                checked
                  ? "text-white bg-black border-white"
                  : "text-black bg-white border-black"
              }`}
              style={{ borderRadius: "5px 20px" }}
              type="email"
              placeholder="Example@gmail.com"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <div className="text-sm ">{errors.email.message}</div>
            )}
          </div>

          <div className="w-full h-20 flex flex-col mt-2">
            <label className="text-lg font-bold" htmlFor="password">
              Password:
            </label>

            <div
              className={` border-2 px-5 ml-8 py-2  flex justify-center items-center ${
                checked
                  ? "text-white bg-black border-white"
                  : "text-black bg-white border-black"
              }
              `}
              style={{ borderRadius: "5px 20px" }}
            >
              <input
                className={`outline-none ${
                  checked ? " bg-black " : " bg-white "
                }`}
                type={hide.type}
                placeholder="Password"
                id="password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  required: "Password is required",
                })}
              />
              <div
                className="w-5 h-5"
                onClick={() => {
                  togglePasswordVisibility();
                }}
              >
                <img className="w-full h-full" src={hide.url} alt="" />
              </div>
            </div>
            {errors.password && (
              <div className="text-sm ">{errors.password.message}</div>
            )}
          </div>

          <div className="w-full flex justify-center items-center m-2">
            <button
              className="overflow border-2 border-black mt-2 bg-black px-4 py-2 text-white font-bold rounded-lg"
              type="submit"
            >
              submit
            </button>
          </div>
          <span
            className={` ${
              checked ? "bg-black" : "bg-white"
            }py-2 px-2 rounded my-8 `}
          >
            {loginMessage.message}
          </span>
          <div
            className={`cursor-pointer ${
              checked ? "text-white" : "text-black"
            }`}
          >
            don't have an account?{" "}
            <Link to="/signup" className="text-blue-700 font-bold">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
