import ScrollAreaDemo from "./Scroll";
import { useUrl } from "./context/UrlProvider";

export default function List() {
  const { checked } = useUrl()!;
  return (
    <div
      className={` ${
        checked ? "bg-dark " : "bg-Light"
      } h-[100vh] flex justify-center items-center flex-col`}
    >
      <h1
        className={`${
          checked ? "text-white " : "text-black"
        }  text-center text-5xl font-bold py-4 mt-12`}
      >
        List Urls
      </h1>
      <ScrollAreaDemo />
    </div>
  );
}
