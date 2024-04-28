import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useUrl } from "./context/UrlProvider";
import Detail from "./Detail";

function ScrollAreaDemo() {
  const { shortUrls, checked } = useUrl()!;
  return (
    <ScrollArea.Root
      className={`${
        checked ? "bg-black" : "bg-white"
      } w-[90%] md:w-[70%]  h-[80%] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA4 `}
    >
      <ScrollArea.Viewport className="w-full h-full rounded">
        <div className="py-[15px] px-5">
          <div className="text-violet11 text-[15px] w-[300px] leading-[18px] font-medium"></div>
          {shortUrls.map((data) => (
            <div
              className={`${
                checked ? "bg-black text-white" : "bg-blue-300 text-black"
              } transform hover:scale-105  transition-transform  text-mauve12 text-[13px] leading-[18px] mt-2.5  border-b  border-t-mauve6  flex flex-col rounded-lg`}
              key={data.createdAt}
            >
              <Detail data={data} />
            </div>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-blackA5" />
    </ScrollArea.Root>
  );
}

export default ScrollAreaDemo;
