import LogoImage from "../assets/logo.svg";
import ThemesToggler from "./ThemesToggler";

export default function Sidebar() {
  return (
    <div className="bg-[#373B53] flex items-center justify-between md:flex-col md:h-full md:fixed md:top-0 md:bottom-0 md:left-0 md:z-index-[999]">
      <img src={LogoImage} alt="" />
      <div className="mr-5">
        <ThemesToggler />
      </div>
    </div>
  );
}
