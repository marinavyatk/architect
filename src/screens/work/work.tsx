"use client";

import s from "./work.module.scss";
import { Gallery, imageSources } from "@/components/gallery/gallery";
import { sections } from "@/data/links";
import dynamic from "next/dynamic";
import { Photo } from "react-photo-album";
import { useCallback, useState } from "react";

const FullSizeModal = dynamic(
  () =>
    import("@/components/modal/full-size-modal/full-size-modal").then(
      (mod) => mod.FullSizeModal,
    ),
  {
    ssr: false,
  },
);

export const Work = () => {
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const openModal = useCallback((photo: Photo) => {
    setSelectedPhoto(photo.src);

    const modal = document.getElementById(
      "modal-full-size",
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }, []);

  return (
    <div className={s.work} id={sections.works}>
      <h2>Works</h2>
      <Gallery onImgClick={openModal} />
      <FullSizeModal images={imageSources} image={selectedPhoto} />
    </div>
  );
};
