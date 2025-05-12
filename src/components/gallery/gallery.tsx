"use client";

import { memo, useEffect, useState } from "react";
import { MasonryPhotoAlbum, Photo } from "react-photo-album";
import s from "./gallery.module.scss";
import "react-photo-album/masonry.css";

export const imageSources = [
  {
    src: "/carousel/carousel-1.jpg",
    title: "1111",
  },
  {
    src: "/carousel/carousel-2.jpg",
    title: "2222",
  },
  {
    src: "/carousel/carousel-3.jpg",
    title: "3333",
  },
  {
    src: "/carousel/carousel-4.jpg",
    title: "444444",
  },
  {
    src: "/carousel/carousel-5.jpg",
    title: "5555",
  },
  {
    src: "/carousel/carousel-6.jpg",
    title: "66666",
  },
  {
    src: "/carousel/carousel-7.jpg",
    title: "777",
  },
  {
    src: "/carousel/carousel-8.jpg",
    title: "8888",
  },
  {
    src: "/carousel/carousel-9.jpg",
    title: "99999",
  },
  {
    src: "/carousel/carousel-10.jpg",
    title: "1111",
  },
  {
    src: "/carousel/carousel-11.jpg",
    title: "1111",
  },
  {
    src: "/carousel/carousel-12.jpg",
    title: "1111",
  },
];

type GalleryProps = {
  onImgClick: (photo: Photo) => void;
};
export const Gallery = memo((props: GalleryProps) => {
  const { onImgClick } = props;
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        imageSources.map(
          (source) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = source.src;
              img.onload = () => {
                resolve({
                  src: source.src,
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                });
              };
            }),
        ),
      );
      setPhotos(loadedImages as Photo[]);
    };

    loadImages();
  }, []);

  return (
    <div className={s.gallery}>
      <MasonryPhotoAlbum
        photos={photos}
        spacing={2}
        columns={(containerWidth) => {
          if (containerWidth < 600) return 1;
          if (containerWidth < 1000) return 2;
          return 3;
        }}
        render={{
          extras: (_, { photo, index }) => (
            <span className={s.title}>{imageSources[index].title}</span>
          ),
        }}
        onClick={({ photo }) => {
          onImgClick(photo);
        }}
      />
    </div>
  );
});
