function sendPostRequestWithToken(url, data, token) {
  var xhr = new XMLHttpRequest();
  var jsonData = JSON.stringify(data);
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("token", token);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log("Response:", response);
    } else {
      console.error("Request failed with status:", xhr.status);
    }
  };

  xhr.send(jsonData);
}

export { sendPostRequestWithToken };
