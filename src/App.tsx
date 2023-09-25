import { FC, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimationRoutes from "./components/animation_routes/AnimationRoutes";
import { inject } from "@vercel/analytics";

useEffect(() => {
  inject();
}, []);

const App: FC = () => {
  return (
    <Router>
      <AnimationRoutes />
    </Router>
  );
};

export default App;
