import * as HttpService from "./http.service";
import { LOGIN_URL } from "./url.service";

export const adminLoginService = (data: IAdminApiParams) => {
  return HttpService.postReq(LOGIN_URL(), data);
};
