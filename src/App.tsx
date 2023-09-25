import { FC, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimationRoutes from "./components/animation_routes/AnimationRoutes";
import { inject } from "@vercel/analytics";

const App: FC = () => {
  useEffect(() => {
    inject();
  }, []);
  return (
    <Router>
      <AnimationRoutes />
    </Router>
  );
};

export default App;
