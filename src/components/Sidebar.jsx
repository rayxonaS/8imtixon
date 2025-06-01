import LogoImage from "../assets/logo.svg";
import { useAppStore } from "../lib/zustand";
import Form from "./Form";
import ThemesToggler from "./ThemesToggler";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Sidebar() {
  const { sheetOpen, setSheetOpen, editedData } = useAppStore();
  return (
    <>
      <div className="bg-[#373B53] flex items-center justify-between md:flex-col md:h-full md:fixed md:top-0 md:bottom-0 md:left-0 md:z-index-[999]">
        <img src={LogoImage} alt="" />
        <div className="mr-5">
          <ThemesToggler />
        </div>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          className="ml-[72px] min-w-[700px] min-h-[calc(100%-56px)] overflow-y-scroll "
          side="left"
        >
          <SheetHeader className="sticky top-0 w-full bg-white border-b">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
          </SheetHeader>
          <Form setSheetOpen={setSheetOpen} info={editedData} />
        </SheetContent>
      </Sheet>
    </>
  );
}
