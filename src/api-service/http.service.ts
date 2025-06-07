import axios from "@/utils/server/axios";

export const getReq = (url: string) => {
  return new Promise((resolve, _reject) => {
    axios
      .get(url)
      .then((response) => {
        if (response && response.data) {
          resolve({ status: true, data: response.data });
        }
      })
      .catch((ex) => {
        resolve({ status: false, message: ex.message });
      });
  });
};

export const postReq = (url: string, entity: any) => {
  return new Promise((resolve, _reject) => {
    axios
      .post(url, entity)
      .then((response) => {
        if (response && response.data) {
          resolve({ status: true, data: response.data });
        }
      })
      .catch((ex) => {
        resolve({ status: false, message: ex.message });
      });
  });
};
