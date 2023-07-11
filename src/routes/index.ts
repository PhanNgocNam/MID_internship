import Home from "../pages/home/Home";
import Explore from "../pages/explore/Explore";
import Library from "../pages/library/Library";
import Upgrade from "../pages/upgrade/Upgrade";

export const routes = [
  {
    path: "/",
    page: Home,
  },
  {
    path: "/explore",
    page: Explore,
  },
  {
    path: "/library",
    page: Library,
  },
  {
    path: "/upgrade",
    page: Upgrade,
  },
];
