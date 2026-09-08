import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-3 sm:top-4 left-0 right-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div
          className="
            relative
            min-h-[64px] sm:min-h-[72px]
            bg-white
            rounded-2xl
            shadow-lg
            flex items-center justify-between
            px-4 sm:px-6 md:px-8
          "
        >
          {/* LOGO */}
          <a
            href="#home"
            onClick={handleMenuClick}
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              {/* Logo bisa dimasukkan di sini */}
            </div>

            <div className="flex flex-col leading-none">
              <span
                className="
                  text-lg sm:text-xl md:text-2xl
                  font-bold
                  tracking-tight
                  text-[#123B68]
                  group-hover:text-[#2AB8C0]
                  transition duration-300
                "
              >
                senvra
              </span>

              <span
                className="
                  text-[7px] sm:text-[8px] md:text-[9px]
                  tracking-[0.25em] sm:tracking-[0.3em]
                  text-[#2AB8C0]
                  uppercase
                  mt-1
                "
              >
                Digital Creative
              </span>
            </div>
          </a>

          {/* DESKTOP MENU */}
          <ul
            className="
              hidden md:flex
              items-center
              gap-6 lg:gap-10
              text-sm
              font-semibold
              text-[#123B68]
            "
          >
            <li>
              <a
                href="#home"
                className="hover:text-[#2AB8C0] transition duration-300"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#layanan-unggulan"
                className="hover:text-[#2AB8C0] transition duration-300"
              >
                Layanan
              </a>
            </li>

            <li>
              <a
                href="#portfolio"
                className="hover:text-[#2AB8C0] transition duration-300"
              >
                Portfolio
              </a>
            </li>

            <li>
              <a
                href="#content"
                className="hover:text-[#2AB8C0] transition duration-300"
              >
                Content
              </a>
            </li>
          </ul>

          {/* LET'S TALK DESKTOP */}
          <a
            href="#order"
            className="
              hidden md:inline-flex
              items-center justify-center
              px-5 lg:px-6
              py-2.5 lg:py-3
              rounded-xl
              bg-[#2AB8C0]
              text-[#123B68]
              text-sm
              font-bold
              hover:bg-white
              hover:shadow-md
              transition duration-300
            "
          >
            Let's Talk
          </a>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden
              flex flex-col
              items-center justify-center
              gap-1.5
              w-10 h-10
              rounded-xl
              hover:bg-gray-100
              active:bg-gray-200
              transition
              cursor-pointer
            "
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`
                block w-6 h-0.5 bg-[#123B68]
                transition-all duration-300
                ${menuOpen ? "rotate-45 translate-y-2" : ""}
              `}
            />

            <span
              className={`
                block w-6 h-0.5 bg-[#123B68]
                transition-all duration-300
                ${menuOpen ? "opacity-0" : "opacity-100"}
              `}
            />

            <span
              className={`
                block w-6 h-0.5 bg-[#123B68]
                transition-all duration-300
                ${menuOpen ? "-rotate-45 -translate-y-1" : ""}
              `}
            />
          </button>

          {/* MOBILE MENU */}
          <div
            className={`
              md:hidden
              absolute
              top-[calc(100%+10px)]
              left-0
              right-0
              bg-white
              rounded-2xl
              shadow-xl
              overflow-hidden
              transition-all
              duration-300
              origin-top
              ${
                menuOpen
                  ? "opacity-100 scale-y-100 translate-y-0"
                  : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
              }
            `}
          >
            <div className="p-3">
              <a
                href="#home"
                onClick={handleMenuClick}
                className="
                  block
                  px-4 py-3
                  rounded-xl
                  text-[#123B68]
                  font-semibold
                  text-sm
                  hover:bg-[#2AB8C0]/10
                  hover:text-[#2AB8C0]
                  transition
                "
              >
                Home
              </a>

              <a
                href="#layanan-unggulan"
                onClick={handleMenuClick}
                className="
                  block
                  px-4 py-3
                  rounded-xl
                  text-[#123B68]
                  font-semibold
                  text-sm
                  hover:bg-[#2AB8C0]/10
                  hover:text-[#2AB8C0]
                  transition
                "
              >
                Layanan
              </a>

              <a
                href="#portfolio"
                onClick={handleMenuClick}
                className="
                  block
                  px-4 py-3
                  rounded-xl
                  text-[#123B68]
                  font-semibold
                  text-sm
                  hover:bg-[#2AB8C0]/10
                  hover:text-[#2AB8C0]
                  transition
                "
              >
                Portfolio
              </a>

              <a
                href="#content"
                onClick={handleMenuClick}
                className="
                  block
                  px-4 py-3
                  rounded-xl
                  text-[#123B68]
                  font-semibold
                  text-sm
                  hover:bg-[#2AB8C0]/10
                  hover:text-[#2AB8C0]
                  transition
                "
              >
                Content
              </a>

              <a
                href="#order"
                onClick={handleMenuClick}
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  px-4 py-3
                  rounded-xl
                  bg-[#2AB8C0]
                  text-[#123B68]
                  font-bold
                  text-sm
                  hover:bg-[#123B68]
                  hover:text-white
                  transition duration-300
                "
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;