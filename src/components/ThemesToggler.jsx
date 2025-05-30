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

  const [theme, setTheme] = useState(document.documentElement.dataset.theme);

  const { themes } = useAppStore();
  function handleTheme(el) {
    if (dark) {
      const value = `dark-${el}`;
      document.documentElement.dataset.theme = value;
      setTheme(value);
    } else {
      document.documentElement.dataset.theme = `${el}`;
      setTheme(el);
    }
  }
  function handleDark() {
    setDrak(!dark);
  }

  useEffect(() => {
    if (dark) {
      const value = `dark-${theme}`;
      document.documentElement.dataset.theme = value;
      setTheme(value);
    } else {
      document.documentElement.dataset.theme = theme;
      setTheme(theme);
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
            {themes.map((el, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    handleTheme(el);
                  }}
                  className={"justify-start"}
                  variant="ghost"
                >
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
