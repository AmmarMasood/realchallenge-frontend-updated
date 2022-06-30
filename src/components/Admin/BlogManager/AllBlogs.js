import React, { useState, useEffect } from "react";
import { Button, Table, Space, Input } from "antd";
import moment from "moment";
import UpdateBlog from "./UpdateBlog";
import {
  getAllUserBlogs,
  removeBlog,
  updateBlog,
} from "../../../services/blogs";
import { T } from "../../Translate";

function AllBlogs() {
  const [filterAllBlogs, setFilterAllBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState({});
  const [show, setShow] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const onUpdateComplete = async (setLoading, vals, blogId) => {
    await updateBlog(vals, blogId);
    setLoading(false);
    setShow(false);
    fetchData();
  };

  const fetchData = async () => {
    const data = await getAllUserBlogs("");
    setAllBlogs(data.blogs);
    setFilterAllBlogs(data.blogs);
    console.log("all blogs", data.blogs);
  };

  const deleteBlog = async (blog) => {
    await removeBlog(blog._id);
    fetchData();
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <span className="font-paragraph-black">{text}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-paragraph-black">{text}</span>,
    },
    {
      title: "Author",
      dataIndex: "user",
      key: "user",
      render: (text) => (
        <span className="font-paragraph-black">{text.username}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => (
        <span className="font-paragraph-black">{text ? text.name : ""}</span>
      ),
    },
    {
      title: "Updated At",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (text) => (
        <span className="font-paragraph-black">
          {moment(text).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Action",
      key: "challengePreviewLink",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setSelectedBlog(record);
              setShow(true);
            }}
          >
            <T>adminDashboard.edit</T>
          </Button>
          <Button type="danger" onClick={() => deleteBlog(record)}>
            <T>adminDashboard.delete</T>
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <UpdateBlog
        show={show}
        setShow={setShow}
        onUpdateComplete={onUpdateComplete}
        blogInfo={selectedBlog}
        key={selectedBlog ? selectedBlog._id : ""}
      />
      <h2 className="font-heading-black">
        {" "}
        <T>adminDashboard.blogs.alL</T>
      </h2>
      <div className="admin-allchallenges-list-container">
        <Input
          placeholder="Search Blogs By Name"
          onChange={(e) =>
            setFilterAllBlogs(
              allBlogs.filter((blog) =>
                blog.title.toUpperCase().includes(e.target.value.toUpperCase())
              )
            )
          }
        />
        <Input
          style={{ marginTop: "10px" }}
          placeholder="Search Blogs By ID"
          onChange={(e) =>
            setFilterAllBlogs(
              allBlogs.filter((blog) =>
                blog._id.toUpperCase().includes(e.target.value.toUpperCase())
              )
            )
          }
        />
        <Table columns={columns} dataSource={filterAllBlogs} />
      </div>
    </div>
  );
}

export default AllBlogs;
