import axios from "axios";
import { notification } from "antd";

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

export function getAllBlogs(language) {
  return axios
    .get(
      `${process.env.REACT_APP_SERVER}/api/blog/all?language=${
        language ? language : "eng"
      }`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to get blogs", "");
      console.log(err);
    });
}
export function getAllUserBlogs() {
  return axios
    .get(`${process.env.REACT_APP_SERVER}/api/blog/user/all`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to get blogs", "");
      console.log(err);
    });
}
export function createBlog(details) {
  return axios
    .post(`${process.env.REACT_APP_SERVER}/api/blog/create`, details)
    .then((res) => {
      openNotificationWithIcon("success", "Blog created!", "");
      return res.data;
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to create blog", "");
      console.log(err);
    });
}

export function removeBlog(id) {
  return axios
    .delete(`${process.env.REACT_APP_SERVER}/api/blog/${id}`)
    .then((res) => {
      openNotificationWithIcon("success", "Blog deleted!", "");
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to delete blog", "");
      console.log(err);
    });
}

export function updateBlog(values, id) {
  return axios
    .put(`${process.env.REACT_APP_SERVER}/api/blog/${id}`, values)
    .then((res) => {
      openNotificationWithIcon("success", "Blog updated successfully!", "");
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to update blog", "");
      console.log(err);
    });
}

export function getAllBlogCategories() {
  return axios
    .get(`${process.env.REACT_APP_SERVER}/api/blog/category/all`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      openNotificationWithIcon(
        "error",
        "Unable to get all blog categories",
        ""
      );
      console.log(err);
    });
}

export function createBlogCategory(name) {
  return axios
    .post(`${process.env.REACT_APP_SERVER}/api/blog/category/create`, {
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

export function updateBlogCategory(name, id) {
  return axios
    .put(`${process.env.REACT_APP_SERVER}/api/blog/category/${id}`, {
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

export function removeBlogCategory(id) {
  return axios
    .delete(`${process.env.REACT_APP_SERVER}/api/blog/category/${id}`)
    .then((res) => {
      openNotificationWithIcon("success", "Category removed!", "");
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to remove category", "");
      console.log(err);
    });
}

// http://localhost:3000/api/blog/609c2047f5d3a81314d3c966
export function getBlogById(id) {
  return axios
    .get(`${process.env.REACT_APP_SERVER}/api/blog/${id}`)
    .then((res) => {
      return {
        success: true,
        data: res.data,
      };
    })
    .catch((err) => {
      openNotificationWithIcon("error", "Unable to get data", "");
      console.log(err);
    });
}
