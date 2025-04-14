import { headerData } from "@/data/header-data";
import { NavLink } from "@/components/header/nav-link/nav-link";
import s from "./header.module.scss";

export const Header = () => {
  const links = headerData.map((item) => {
    return (
      <li key={item.children}>
        <NavLink {...item} />
      </li>
    );
  });

  return (
    <header className={s.header}>
      <nav>
        <ul className={s.links}>{links}</ul>
      </nav>
    </header>
  );
};
