import axios from "axios";
import { notification } from "antd";

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

export function createChallengeGoal(name) {
  return axios
    .post(`${process.env.REACT_APP_SERVER}/api/challengeGoals/create`, { name })
    .then((res) =>
      openNotificationWithIcon("success", "Successfully Created", "")
    )
    .catch((err) => {
      console.log(err);
      openNotificationWithIcon("error", "Unable to create", "");
    });
}

export function getAllChallengeGoals() {
  return axios
    .get(`${process.env.REACT_APP_SERVER}/api/challengeGoals/`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      openNotificationWithIcon("error", "Unable to get goals", "");
    });
}

export function deleteChallengeTGoal(id) {
  return axios
    .delete(`${process.env.REACT_APP_SERVER}/api/challengeGoals/${id}`)
    .then((res) => {
      openNotificationWithIcon("success", "Successfully deleted goal", "");
    })
    .catch((err) => {
      console.log(err);
      openNotificationWithIcon("error", "Unable to delete goal", "");
    });
}
