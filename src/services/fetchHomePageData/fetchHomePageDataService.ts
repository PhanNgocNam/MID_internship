import { get } from "../../utils/request";
import apiInstance from "../../configs/api";

type setData = (data: any) => void;

const fetchHomePageDataService = async (setData: setData) => {
  const res = await get(`${apiInstance.GET_DISCOVER_API}`);
  setData(res.data.data);
};

export default fetchHomePageDataService;
