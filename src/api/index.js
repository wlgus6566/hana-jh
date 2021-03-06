import axios from "axios";
import { setInterceptors } from "./interceptors";

function createWithAuth(options) {
  const instance = axios.create(
    Object.assign(
      {
        baseURL: "/b2b/api/",
        timeout: 3000,
        responseEncoding: "utf8",
      },
      {
        ...options,
      }
    )
  );
  setInterceptors(instance);
  return instance;
}

export const instance = createWithAuth();

function getInsuranceList(params) {
  return instance.get(`/bssu0101r001`, { params: params });
}

export { getInsuranceList };
