import base64 from "base-64";
import cookie from "react-cookies";

function getStudentId() {
  try {
    const userInfo = JSON.parse(
      base64.decode(cookie.load("coding-ninjas-demo"))
    );
    if (userInfo["account_type"] !== "Student") {
      return false;
    }
    return userInfo.id;
  } catch (e) {
    return false;
  }
}

export default getStudentId;
