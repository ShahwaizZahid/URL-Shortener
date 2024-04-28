import * as Switch from "@radix-ui/react-switch";
import { useUrl } from "./context/UrlProvider";
function Switcher() {
  const { checked, themeSwitch } = useUrl()!;
  return (
    <form>
      <div className="flex items-center">
        <label
          className={`${
            checked ? "text-blue-300" : "text-black"
          }  font-bold text-[15px] leading-none pr-[15px] hidden md:block text-lg htmlFor="airplane-mode`}
        >
          Theme
        </label>
        <Switch.Root
          onClick={() => {
            themeSwitch();
          }}
          className={`${
            checked
              ? "border-blue-300 focus:shadow-blue-300"
              : "border-black focus:shadow-black"
          } w-[42px] h-[25px] bg-blackA6 rounded-full border  relative shadow-[0_2px_10px] border-1 shadow-blackA4 focus:shadow-[0_0_0_2px]  data-[state=checked]:bg-white  outline-none cursor-default`}
          id="airplane-mode"
        >
          <Switch.Thumb className="block w-[21px] h-[21px] bg-white border border-black rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
      </div>
    </form>
  );
}

export default Switcher;
