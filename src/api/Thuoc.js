import axios from "axios";
import { BASE_URL } from "./Base";

function checkTenThuoc(tenThuoc, whenOke, whenErr) {
  axios
    .get(`${BASE_URL}/thuoc/checktenthuoc`, { params: { tenThuoc: tenThuoc } })
    .then(whenOke)
    .catch(whenErr);
}

function getAllThuoc(cb1, cb2) {
  axios.get(`${BASE_URL}/thuoc`).then(cb1).catch(cb2);
}

function getPageThuoc(pageIndex, cb1, cb2) {
  console.log(`page index: ${pageIndex}`);
  axios
    .get(`${BASE_URL}/thuoc/page`, {
      params: {
        pageIndex: pageIndex,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function getThuocById(idThuoc, cb1, cb2) {
  axios.get(`${BASE_URL}/thuoc/${idThuoc}`).then(cb1).catch(cb2);
}

function taoThuoc(thuocDto, whenOke, whenErr, token = null) {
  const config = {
    headers: {
      token: `${token}`,
    },
  };
  axios
    .post(`${BASE_URL}/thuoc/taothuoc`, thuocDto, config)
    .then(whenOke)
    .catch(whenErr);
}

function suaThuoc(thuocDto, cb1, cb2, token) {
  const config = {
    headers: {
      token: `${token}`,
    },
  };
  axios
    .put(`${BASE_URL}/thuoc/suathuoc`, thuocDto, config)
    .then(cb1)
    .catch(cb2);
}

function xoaThuoc(idThuoc, cb1, cb2, token = null) {
  const config = {
    headers: {
      token: `${token}`,
    },
    params: {
      idThuoc,
    },
  };
  axios.delete(`${BASE_URL}/thuoc/xoathuoc`, config).then(cb1).catch(cb2);
}

function themHinhAnhThuoc(fileHinhAnh, idThuoc, cb1, cb2, token = null) {
  const formData = new FormData();
  formData.append("hinhAnh", fileHinhAnh);
  formData.append("idThuoc", idThuoc);

  const config = {
    headers: {
      token: `${token}`,
      accept: "application/json",
      "Content-Type": `multipart/form-data;`,
    },
  };

  axios
    .post(`${BASE_URL}/thuoc/themhinhanh`, formData, config)
    .then(cb1)
    .catch(cb2);
}

function suaHinhAnhThuoc(
  fileHinhAnh,
  idThuoc,
  tenHinhAnhCu,
  cb1,
  cb2,
  token = null
) {
  const formData = new FormData();
  formData.append("hinhAnh", fileHinhAnh);
  formData.append("idThuoc", idThuoc);
  formData.append("tenHinhAnhCu", tenHinhAnhCu);

  const config = {
    headers: {
      token: `${token}`,
      accept: "application/json",
      "Content-Type": `multipart/form-data;`,
    },
  };

  axios
    .post(`${BASE_URL}/thuoc/suahinhanh`, formData, config)
    .then(cb1)
    .catch(cb2);
}

export {
  getAllThuoc,
  getPageThuoc,
  checkTenThuoc,
  taoThuoc,
  suaThuoc,
  xoaThuoc,
  suaHinhAnhThuoc,
  themHinhAnhThuoc,
  getThuocById,
};
