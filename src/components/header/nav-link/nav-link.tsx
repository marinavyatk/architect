import Link from "next/link";
import { ComponentProps } from "react";
import s from "./nav-link.module.scss";
import clsx from "clsx";

type NavLink = ComponentProps<"a">;

export const NavLink = ({ className, ...restProps }: NavLink) => {
  const classNames = clsx(s.link, className);
  return (
    <a {...restProps} className={classNames} rel="noreferrer nofollow"></a>
  );
};
