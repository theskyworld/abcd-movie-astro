import axios from "axios";
import type { AxiosResponse } from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default function useAxios() {
  // TODO增加isRequesting的逻辑
  const get = (url: string, config?: Record<string, unknown>) => {
    return instance
      .get(url, config)
      .then((res: AxiosResponse) => {
        if (res.data.items) {
          return res.data.items;
        } else {
          return res.data;
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const post = (
    url: string,
    data?: Record<string, unknown>,
    config?: Record<string, unknown>,
  ) => {
    return instance.post(url, data, config);
  };
  return {
    get,
    post,
  };
}
