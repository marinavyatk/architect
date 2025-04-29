import s from "./work.module.scss";
import { Gallery } from "@/components/gallery/gallery";
import { sections } from "@/data/links";

export const Work = () => {
  return (
    <div className={s.work} id={sections.works}>
      <h2>Works</h2>
      <Gallery />
    </div>
  );
};
