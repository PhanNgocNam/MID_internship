import { FC } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "../../routes";
import DefaultLayout from "../../layouts/DefaultLayout";
import { AnimatePresence } from "framer-motion";
import { history } from "../../utils/history";
import { useNavigate } from "react-router-dom";
type Props = {};

const AnimationRoutes: FC = (props: Props) => {
  const location = useLocation();
  history.navigate = useNavigate();
  return (
    <Routes location={location}>
      {routes.map((pageItem, index) => {
        const { path } = pageItem;
        return (
          <Route
            key={index}
            path={path}
            element={
              <DefaultLayout>
                <AnimatePresence>
                  <pageItem.page key={location.pathname} />
                </AnimatePresence>
              </DefaultLayout>
            }
          />
        );
      })}
    </Routes>
  );
};

export default AnimationRoutes;
