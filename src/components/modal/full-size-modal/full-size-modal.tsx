"use client";

import { useEffect, useRef, useState } from "react";
import s from "./full-size-modal.module.scss";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useKeyboardControl, usePrevNextButtons } from "@/common/embla-helper";
import {
  NextButton,
  PrevButton,
} from "@/components/buttons/embla-buttons/embla-buttons";
import { CloseButton } from "@/components/buttons/close-button/close-button";
import { ZoomImage } from "@/components/zoom-img/zoom-img";

type Image = {
  src: string;
  title: string;
};
type FullWidthModalProps = {
  image: string;
  images: Image[];
};

export const FullSizeModal = (props: FullWidthModalProps) => {
  const { images, image } = props;
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.close();
    }
  };
  const index = images.findIndex((img) => img.src === image);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: index >= 0 ? index : 0,
  });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, undefined, false);
  useKeyboardControl(emblaApi, isOpen, false);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    const observer = new MutationObserver(() => {
      setIsOpen(modal.open);
    });
    observer.observe(modal, { attributes: true, attributeFilter: ["open"] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {createPortal(
        <dialog className={s.modal} id="modal-full-size" ref={modalRef}>
          <div className={s.container} ref={containerRef}>
            <CloseButton onClick={closeModal} className={s.closeButton} />
            <div ref={emblaRef} className={s.viewport}>
              <div className={s.slider}>
                {images.map((image) => (
                  <div className={s.slide} key={image.src}>
                    <div className={s.imgContainer}>
                      <ZoomImage src={image.src} />
                      <span className={s.description}>
                        Project:{" "}
                        <a href="#" className={s.link}>
                          {image.title}
                        </a>
                      </span>
                    </div>
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
        </dialog>,
        document.body,
      )}
    </>
  );
};
