import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { queryGenerator } from "../lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowBigDown, PlusCircleIcon } from "lucide-react";
import { useAppStore } from "../lib/zustand";
import Form from "./Form";

function Header() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });

  function handleChange(key) {
    setItems((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  }

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [JSON.stringify(items)]);
  return (
    <header>
      <div className=" w-full max-w-[730px] mx-auto px-20 pr-5 pl-5 md:pl-20 flex items-center justify-between py-10">
        <div>
          <h1>Invoices</h1>
          <p>There are 7 total invoices</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={"ml-auto mr-5"} variant="ghost">
              Filter by Status
              <ArrowBigDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Statuses</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              {Object.entries(items).map(([key, value]) => {
                return (
                  <label
                    key={key}
                    className={`${buttonVariants({
                      variant: "ghost",
                    })} justify-start capitalize`}
                    htmlFor={key}
                  >
                    <Checkbox
                      value={key}
                      checked={value}
                      onCheckedChange={() => handleChange(key)}
                      id={key}
                    />
                    {key}
                  </label>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger className={buttonVariants({ variant: "default:" })}>
            <PlusCircleIcon />
            New Invoice
          </SheetTrigger>
          <SheetContent
            className="ml-[72px] min-w-[700px] min-h-[calc(100%-56px)] overflow-y-scroll "
            side="left"
          >
            <SheetHeader className="sticky top-0 w-full bg-white border-b">
              <SheetTitle>Are you absolutely sure?</SheetTitle>
            </SheetHeader>
            <Form setSheetOpen={setSheetOpen} info={null} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
