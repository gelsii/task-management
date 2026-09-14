import axios, { type AxiosRequestConfig } from "axios";

type typePropsUseAxios = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  config: AxiosRequestConfig | undefined;
};

export default async function UseAxios(req: typePropsUseAxios) {

  const response = await axios({
    url: req.url,
    method: req.method,
    ...req.config,
  });

  const data = await response.data;

  return data;
}
