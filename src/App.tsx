import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimationRoutes from "./components/animation_routes/AnimationRoutes";

const App: FC = () => {
  return (
    <Router>
      <AnimationRoutes />
    </Router>
  );
};

export default App;
