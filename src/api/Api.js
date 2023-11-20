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

const GetInfo = (success, error) => {
  axios
    .get(`${proxy}/get-info`)
    .then((res) => success(res))
    .catch((err) => error(err));
};

const SendRequest2CS = (success, error) => {
  axios
    .get(`${proxy}/send-request`)
    .then((res) => success(res))
    .catch((err) => error(err));
};

const ExitsCS = (success, error) => {
  axios
    .get(`${proxy}/cs-exit`)
    .then((res) => success(res))
    .catch((err) => error(err));
};

export { InitDispatcherServer, GetInfo, SendRequest2CS, ExitsCS };
