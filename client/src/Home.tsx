import { Link } from "react-router-dom";
import { useRef } from "react";
import { useUrl } from "./context/UrlProvider";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const shortUrl = useRef<HTMLInputElement>(null);

  const { generateShortUrl, loading, correct, handleCopyText, checked } =
    useUrl()!;

  return (
    <>
      <div
        className={`${
          checked ? "bg-dark " : "bg-Light"
        }  w-full min-h-[100vh] h-fit  py-8 `}
      >
        <h1
          className={`${
            checked ? "text-white  " : "text-black"
          } font-bold text-center py-4 text-5xl mt-32`}
        >
          URLs Shortener
        </h1>
        <div className="flex flex-col justify-center items-center ">
          <div
            className={`text-center w-[80%] md:w-[60%] ${
              checked ? "text-white  " : "text-black"
            }`}
          >
            <div className="text-3xl font-bold py-4">
              More than just shorter links
            </div>
            <div className="text-xl font-bold py-4">
              {" "}
              When a user accesses a shortened URL, the URL shortener service
              redirects the user to the original, longer URL associated with the
              short URL. This redirection process is transparent to the user and
              happens instantaneously.
            </div>
          </div>
          <div className="flex my-6">
            <button
              className={`${
                checked
                  ? "text-white border-white bg-black"
                  : "text-black border-black bg-white"
              } border-2 font-bold text-xl py-3 px-8 rounded-full my-4 mx-6`}
            >
              <a href="#input"> Get Started</a>
            </button>
            <button
              className={`${
                checked
                  ? "text-white border-white bg-black"
                  : "text-black border-black bg-white"
              } border-2 font-bold text-xl py-3 px-8 rounded-full my-4 mx-6`}
            >
              <Link to="/list">Short Urls List</Link>
            </button>
          </div>
        </div>
        <form
          action=""
          className="flex flex-col justify-center items-center my-20"
        >
          <div className="w-[80%] md:w-[60%] lg:w-[50%] h-16 flex">
            {/* Assign the ref object to the ref attribute of the input element */}
            <input
              ref={inputRef}
              id="input"
              className="w-[80%] py-3 px-5 rounded-l-full text-lg outline-none h-full"
              type="text"
              placeholder="Shorten a link here!"
            />

            <button
              className={`${
                checked
                  ? "text-white border-white bg-black"
                  : "text-black border-black bg-white"
              } w-[20%] py-3 px-3  text-lg border-2 items-center flex justify-center text-center h-full font-bold rounded-r-full`}
              onClick={async (e) => {
                e.preventDefault();
                const short = await generateShortUrl(
                  (inputRef.current as HTMLInputElement)?.value
                );

                (shortUrl.current as HTMLInputElement).value = short;
              }}
            >
              {loading && <span className="loader mx-1"></span>}
              Shortit!
            </button>
          </div>
          <div className="text-red-500 text-start my-3 ">{correct} </div>
        </form>
        <div className="w-full h-16 flex justify-center items-center  px-4 rounded-xl">
          <div className="flex  justify-center items-center bg-black rounded-2xl w-fit overflow-hidden text-lg">
            <input
              ref={shortUrl}
              disabled
              className=" text-black bg-white h-16 py-4 outline-none px-4 items-center "
            />
            <img
              className="h-16  py-4 px-4"
              src="copy-solid.svg"
              alt=""
              onClick={() => {
                handleCopyText((shortUrl.current as HTMLInputElement)?.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
