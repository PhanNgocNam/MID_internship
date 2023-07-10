interface IRoute {
  home: string;
  explore: string;
  library: string;
  upgrade: string;
}

const routeConfig: IRoute = {
  home: "/",
  explore: "/explore",
  library: "/library",
  upgrade: "/upgrade",
};

export default routeConfig;
