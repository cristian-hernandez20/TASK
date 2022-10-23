import { default as axios } from "axios";

const URI = "http://localhost:9000/api/";

const axiosSc = ({ url, data = {}, method = "POST", header = {}, responseType = "json" }) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: `${URI}${url}`,
      method,
      data,
      headers: {},
    };
    axios(config)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        let response = { status: -1, message: null };
        if (error.response) {
          response.message = error.response.data;
          response.status = error.response.status;
          response.status == -1;
        } else if (response.request) {
          response.message = error.request;
          response.status == -1;
        } else {
          response.message = error.message;
          response.status == -1;
        }
        error_console("global", error);

        reject(response);
      });
  });
};
function error_console(form, error, data = null) {
  console.debug("-> Error:", form, error, data);
}
export default axiosSc;
