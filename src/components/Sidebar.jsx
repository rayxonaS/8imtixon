import LogoImage from "../assets/logo.svg";
import ThemesToggler from "./ThemesToggler";

export default function Sidebar() {
  return (
    <div>
      <img src={LogoImage} alt="" />
      <ThemesToggler />
    </div>
  );
}
