import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";

export const restartAutoplay = (emblaApi: EmblaCarouselType) => {
  emblaApi.plugins().autoplay.reset();
  emblaApi.plugins().autoplay.play();
};

export function customSwipe(
  emblaApi: EmblaCarouselType,
  event: MouseEvent | TouchEvent,
): boolean {
  const threshold = 50;
  let startX: number | null = null;

  const getClientX = (e: MouseEvent | TouchEvent): number => {
    return (e as TouchEvent).touches?.[0]?.clientX ?? (e as MouseEvent).clientX;
  };

  const getEndClientX = (e: MouseEvent | TouchEvent): number => {
    return (
      (e as TouchEvent).changedTouches?.[0]?.clientX ??
      (e as MouseEvent).clientX
    );
  };

  const onStart = (e: MouseEvent | TouchEvent) => {
    startX = getClientX(e);
  };

  const onEnd = (e: MouseEvent | TouchEvent) => {
    if (startX === null) return;
    const endX = getEndClientX(e);
    const diff = endX - startX;

    if (Math.abs(diff) > threshold) {
      if (diff < 0) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollPrev();
      }
      emblaApi.plugins().autoplay.reset();
      emblaApi.plugins().autoplay.play();
    }

    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener("mouseup", onEnd);
    window.removeEventListener("touchend", onEnd);
  };

  onStart(event);

  if (event.type === "mousedown") {
    window.addEventListener("mouseup", onEnd);
  } else if (event.type === "touchstart") {
    window.addEventListener("touchend", onEnd);
  }

  return false;
}

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  autoplay?: boolean;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
  autoplay: boolean = true,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    autoplay && restartAutoplay(emblaApi);
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    autoplay && restartAutoplay(emblaApi);
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const useKeyboardControl = (
  emblaApi: EmblaCarouselType | undefined,
  inView: boolean,
  autoplay: boolean = true,
) => {
  useEffect(() => {
    if (!emblaApi || !inView) return;

    const changeSlide = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        emblaApi.scrollPrev();
        autoplay && restartAutoplay(emblaApi);
      }
      if (event.key === "ArrowRight") {
        emblaApi.scrollNext();
        autoplay && restartAutoplay(emblaApi);
      }
    };

    window.addEventListener("keydown", changeSlide);

    return () => {
      window.removeEventListener("keydown", changeSlide);
    };
  }, [emblaApi, inView]);
};
