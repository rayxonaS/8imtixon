import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useAppStore } from "../lib/zustand";
import { ArrowBigDown, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemesToggler() {
  const [dark, setDrak] = useState(
    document.documentElement.dataset.theme.startsWith("dark-")
  );

  const { themes } = useAppStore();
  function handleTheme() {}
  function handleDark() {
    setDrak(!dark);
  }

  useEffect(() => {
    if (dark) {
      document.documentElement.dataset.theme = "dark-default";
    } else {
      document.documentElement.dataset.theme = "default";
    }
  }, [dark]);
  return (
    <div className="flex gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            Change Theme
            <ArrowBigDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Themes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            {themes.map((el) => {
              return (
                <Button className={"justify-start"} variant="ghost">
                  {el}
                </Button>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={handleDark}>{dark ? <Sun /> : <Moon />}</Button>
    </div>
  );
}
