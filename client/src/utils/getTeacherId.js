import base64 from "base-64";
import cookie from "react-cookies";

function getTeacherId() {
  try {
    const userInfo = JSON.parse(
      base64.decode(cookie.load("coding-ninjas-demo"))
    );
    if (userInfo["account_type"] !== "Teacher") {
      return false;
    }
    return userInfo.id;
  } catch (e) {
    return false;
  }
}

export default getTeacherId;
