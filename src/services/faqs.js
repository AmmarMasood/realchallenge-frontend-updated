import axios from "axios";
import { notification } from "antd";

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

export function getAllFaqs() {
  return axios
    .get(`${process.env.REACT_APP_SERVER}/api/faq/all`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to get faqs", "");
      console.log(err);
    });
}
export function createFaq(details) {
  return axios
    .post(`${process.env.REACT_APP_SERVER}/api/faq/create`, details)
    .then((res) => {
      openNotificationWithIcon("success", "Faq created!", "");
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to create faq", "");
      console.log(err);
    });
}

export function removeFaq(id) {
  return axios
    .delete(`${process.env.REACT_APP_SERVER}/api/faq/${id}`)
    .then((res) => {
      openNotificationWithIcon("success", "Faq deleted!", "");
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to delete faq", "");
      console.log(err);
    });
}

export function updateFaq(values, id) {
  return axios
    .put(`${process.env.REACT_APP_SERVER}/api/faq/${id}`, values)
    .then((res) => {
      openNotificationWithIcon("success", "Faq updated successfully!", "");
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to update faq", "");
      console.log(err);
    });
}

export function getFaqById(id) {
  return axios
    .get(`${process.env.REACT_APP_SERVER}/api/faq/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to get faq", "");
      console.log(err);
    });
}
export function getAllFaqCategories() {
  return axios
    .get(`${process.env.REACT_APP_SERVER}/api/faq/category`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to get categories", "");
      console.log(err);
    });
}

export function createFaqCategory(name) {
  return axios
    .post(`${process.env.REACT_APP_SERVER}/api/faq/category/create`, {
      name: name,
    })
    .then((res) => {
      openNotificationWithIcon("success", "Category created!", "");
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to create category", "");
      console.log(err);
    });
}

export function removeFaqCategory(id) {
  return axios
    .delete(`${process.env.REACT_APP_SERVER}/api/faq/category/${id}`)
    .then((res) => {
      openNotificationWithIcon("success", "Category removed!", "");
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to remove category", "");
      console.log(err);
    });
}

export function updateFaqCategory(name, id) {
  return axios
    .put(`${process.env.REACT_APP_SERVER}/api/faq/category/${id}`, {
      name: name,
    })
    .then((res) => {
      openNotificationWithIcon("success", "Category name updated!", "");
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to update category", "");
      console.log(err);
    });
}
