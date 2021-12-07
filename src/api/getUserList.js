import axios from "axios";
//api call to get user list
export function getUserList() {
  return axios
    .get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
    .then((data) => data);
}
