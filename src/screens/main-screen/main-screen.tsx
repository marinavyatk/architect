"use client";

import { sections } from "@/data/links";
import { useInView } from "react-intersection-observer";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import {
  NextButton,
  PrevButton,
} from "@/components/buttons/embla-buttons/embla-buttons";
import {
  customSwipe,
  useKeyboardControl,
  usePrevNextButtons,
} from "@/screens/main-screen/embla-helper";
import s from "./main-screen.module.scss";

const images = [
  "/carousel/carousel-1.jpg",
  "/carousel/carousel-2.jpg",
  "/carousel/carousel-3.jpg",
  "/carousel/carousel-4.jpg",
  "/carousel/carousel-5.jpg",
  "/carousel/carousel-6.jpg",
  "/carousel/carousel-7.jpg",
  "/carousel/carousel-8.jpg",
  "/carousel/carousel-9.jpg",
  "/carousel/carousel-10.jpg",
  "/carousel/carousel-11.jpg",
  "/carousel/carousel-12.jpg",
];

export const MainScreen = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      loop: true,
      inViewThreshold: 0.5,
      watchDrag: customSwipe,
    },
    [
      Autoplay({
        playOnInit: true,
        delay: 6000,
      }),
      ClassNames(),
    ],
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  useKeyboardControl(emblaApi, inView);

  return (
    <div id={sections.home} className={s.main} ref={ref}>
      <div ref={emblaRef}>
        <div className={s.carousel}>
          {images.map((src) => (
            <div className={s.slideContainer} key={src}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
      <PrevButton
        className={s.prevBtn}
        onClick={() => onPrevButtonClick()}
        disabled={prevBtnDisabled}
      />
      <NextButton
        className={s.nextBtn}
        onClick={() => onNextButtonClick()}
        disabled={nextBtnDisabled}
      />
    </div>
  );
};
