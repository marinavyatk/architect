import s from "./page.module.css";
import { MainScreen } from "@/screens/main-screen/main-screen";
import { Header } from "@/components/header/header";
import { Work } from "@/screens/work/work";

export default function Home() {
  return (
    <div className={s.page}>
      <Header />
      <main>
        <MainScreen />
        <Work />
      </main>
      <footer className={s.footer}></footer>
    </div>
  );
}
