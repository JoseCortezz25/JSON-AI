import Link from "next/link";
import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#09090b] flex items-center justify-between w-full p-4 border-b border-muted">
      <div className="mx-auto flex items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-0">
        <nav>
          <Link className="flex items-center" href="/">
            <Logo className="size-[30px] mr-4" />
            <span className="font-bold text-sm">JSON AI</span>
          </Link>
        </nav>
        <nav className="flex gap-3">
          <LanguageToggle />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;