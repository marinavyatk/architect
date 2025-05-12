import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import s from "./close-button.module.scss";

type CloseButtonProps = ComponentPropsWithoutRef<"button">;

export const CloseButton = (props: CloseButtonProps) => {
  const { className, ...restProps } = props;
  const classNames = clsx(s.button, className);
  return (
    <button {...restProps} className={classNames} aria-label="Close">
      <svg>
        <use xlinkHref="/svg/sprite.svg#close"></use>
      </svg>
    </button>
  );
};
