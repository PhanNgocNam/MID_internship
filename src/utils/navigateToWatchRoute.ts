import { history } from "./history";

type payloadType = {
  pathname: string;
  search: string;
};

export const navigateToWatch = (payload: payloadType) => {
  history.navigate && history.navigate(payload);
};
