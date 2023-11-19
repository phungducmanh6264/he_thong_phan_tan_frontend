const isIPAddress = (ip) => {
  // Regular expression for IPv4 and IPv6
  const ipRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^([0-9a-fA-F]{0,4}:){2,7}([0-9a-fA-F]{0,4}|:)$/;

  return ipRegex.test(ip);
};

const scroll2End = (e) => {
  const target = e.target;
  const top = target.scrollTop;
  const height = target.scrollHeight;
  const diff = Math.floor(height - top);
  const clientHeight = target.clientHeight;
  return diff <= clientHeight;
};

const number2Money = (number) => {
  if (isNaN(number)) {
    return "0 VNĐ";
  }

  // Sử dụng hàm toLocaleString để định dạng số và thêm đơn vị VNĐ
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export { isIPAddress, scroll2End, number2Money };
