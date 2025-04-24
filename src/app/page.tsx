import s from "./page.module.css";
import { MainScreen } from "@/screens/main-screen/main-screen";
import { Header } from "@/components/header/header";

export default function Home() {
  return (
    <div className={s.page}>
      <Header />
      <main>
        <MainScreen />
      </main>
      <footer className={s.footer}></footer>
    </div>
  );
}
