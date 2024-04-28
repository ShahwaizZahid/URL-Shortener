import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { API_URL } from "./config";
import { useUrl } from "./context/UrlProvider";

export default function Detail(props: any) {
  const { checked } = useUrl()!;
  const { data } = props;

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="  text-xl hover:bg-mauve3 text-star inline-flex h-[40px] items-center w-full rounded-[4px] px-6   outline-none ">
          {data.redirectURL}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content
          className={`${
            checked ? "bg-black text-white" : "bg-white text-black "
          } data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] rounded-2xl min-w-[400px]  translate-x-[-50%] translate-y-[-50%]  p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
        >
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] cursor-pointer text-4xl font-bold">
            Shorten Url Details
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 my-6 text-xl leading-normal cursor-pointer">
            URL: {data.redirectURL}
          </AlertDialog.Description>
          <AlertDialog.Description className="text-mauve11  my-6 text-xl leading-normal cursor-pointer">
            ShorterURL: {API_URL} {data.shortId}
          </AlertDialog.Description>
          <AlertDialog.Description className="text-mauve11 my-6 text-xl font-bold leading-normal cursor-pointer">
            Visit on this shorter URL: {data.visitHistory.length}
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
