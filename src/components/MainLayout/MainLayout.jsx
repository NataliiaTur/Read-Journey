import { Outlet } from "react-router-dom";
import Header from "@components/Header/Header.jsx";
import css from "./MainLayout.module.css";
import { Container } from "../Container/Container";

const MainLayout = () => {
  return (
    <div className={css.layout}>
      <Header />
      <Container>
        <main className={css.main}>
          <Outlet />
        </main>
      </Container>
    </div>
  );
};

export default MainLayout;
