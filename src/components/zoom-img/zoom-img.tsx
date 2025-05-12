"use client";

import { useRef, useState, useEffect } from "react";
import s from "./zoom-img.module.scss";
import clsx from "clsx";

type ZoomImageProps = {
  src: string;
  alt?: string;
};

export const ZoomImage = ({ src, alt = "" }: ZoomImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>();
  const [zoomed, setZoomed] = useState(false);
  const classNames = clsx(
    s.container,
    zoomed ? s.cursorZoomOut : s.cursorZoomIn,
  );
  const imgClassNames = clsx(s.image, zoomed && s.zoomed);

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const updateOrigin = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img) return;

    const rect = container.getBoundingClientRect();
    const x = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100);

    img.style.transformOrigin = `${x}% ${y}%`;
  };

  const scheduleOriginUpdate = (clientX: number, clientY: number) => {
    if (!zoomed) return;
    cancelAnimationFrame(rafRef.current!);
    rafRef.current = requestAnimationFrame(() => {
      updateOrigin(clientX, clientY);
    });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    updateOrigin(e.clientX, e.clientY);
    setZoomed(!zoomed);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!zoomed) return;
    e.preventDefault();
    const touch = e.touches[0];
    scheduleOriginUpdate(touch.clientX, touch.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    scheduleOriginUpdate(e.clientX, e.clientY);
  };

  useEffect(() => {
    if (zoomed) {
      containerRef.current?.addEventListener("touchmove", handleTouchMove);
      containerRef.current?.addEventListener("mousemove", handleMouseMove);
    } else {
      containerRef.current?.removeEventListener("touchmove", handleTouchMove);
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    }
    return () => {
      cancelAnimationFrame(rafRef.current!);
      containerRef.current?.removeEventListener("touchmove", handleTouchMove);
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [zoomed]);

  return (
    <div
      ref={containerRef}
      className={classNames}
      onDoubleClick={handleDoubleClick}
      title="Double click to zoom"
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={imgClassNames}
        draggable={false}
      />
    </div>
  );
};
