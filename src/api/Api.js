import axios from "axios";

const proxy = "http://localhost:8080";

const InitDispatcherServer = (ip, success, error) => {
  axios
    .get(`${proxy}/init-server`, {
      params: {
        ip: ip,
      },
    })
    .then((res) => success(res))
    .catch((err) => error(err));
};

export { InitDispatcherServer };
