import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Theme } from "@/types";
import { PopoverClose } from "@radix-ui/react-popover";
import { SunIcon } from "lucide-react";

export default function ThemeButton() {
  const THEMES: Theme[] = ["light", "dark", "system"];

  const onChangeTheme = (theme: Theme) => {
    const htmlTag = document.documentElement;
    htmlTag.classList.remove("light", "dark");
    
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      htmlTag.classList.add(prefersDark ? "dark" : "light");
    } else {
      htmlTag.classList.add(theme);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="hover:bg-muted cursor-pointer rounded-full p-2">
          <SunIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-35 p-0">
        {THEMES.map((theme) => (
          <PopoverClose key={`theme-button-${theme}`} asChild>
            <button type="button" className="block w-full cursor-pointer p-3 text-left hover:bg-muted" onClick={() => onChangeTheme(theme)}>{theme}</button>
          </PopoverClose>))}
      </PopoverContent>
    </Popover>
  );
}
