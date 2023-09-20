import { NavigateFunction } from "react-router-dom";

type historyType = {
  navigate: NavigateFunction | null;
};

export const history: historyType = {
  navigate: null,
};
