import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSetTheme, useTheme } from "@/store/theme";
import type { Theme } from "@/types";
import { PopoverClose } from "@radix-ui/react-popover";
import { CheckIcon, SunIcon } from "lucide-react";


const THEMES: Theme[] = ["light", "dark", "system"];

export default function ThemeButton() {
  const currentTheme = useTheme();
  const setTheme = useSetTheme();

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
            <button
              type="button"
              className="hover:bg-muted block flex w-full cursor-pointer items-center justify-between p-3 text-left"
              onClick={() => setTheme(theme)}
            >
              {theme}
              {currentTheme === theme && <CheckIcon className="ml-2" />}
            </button>
          </PopoverClose>
        ))}
      </PopoverContent>
    </Popover>
  );
}
