import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index";
import DefaultLayout from "./layouts/DefaultLayout";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map((pageItem, index) => {
          const { path } = pageItem;
          return (
            <Route
              key={index}
              path={path}
              element={
                <DefaultLayout>
                  <pageItem.page />
                </DefaultLayout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;
