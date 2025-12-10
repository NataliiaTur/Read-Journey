import { Outlet } from "react-router-dom";
import PublicHeader from "@components/PublicHeader/PublicHeader.jsx";
import { Container } from "@components/Container/Container.jsx";
import css from "./PublicLayout.module.css";

const PublicLayout = () => {
  return (
    <div className={css.layout}>
      <PublicHeader />
      <Container>
        <main className={css.main}>
          <Outlet />
        </main>
      </Container>
    </div>
  );
};

export default PublicLayout;
