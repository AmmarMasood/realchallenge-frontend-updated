import React, { useEffect, useState } from "react";
import "../assets/home.css";
import "../assets/trainers.css";
import "../assets/challenge.css";
import "../assets/howitworks.css";
import "../assets/magazine.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAllBlogs } from "../services/blogs";
import slug from "elegant-slug";

function Magazine() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [t] = useTranslation();

  const fetchBlogs = async () => {
    const res = await getAllBlogs(localStorage.getItem("locale"));
    if (res.blogs) {
      const blogs = res.blogs.reverse();
      console.log(blogs);
      setAllBlogs(blogs);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div>
      <Navbar color="dark" />
      <div className="magazine-row-1" style={{ backgroundColor: "#e1e9f2" }}>
        {/* <div className="magazine-row-1-text-container">
          <Link to="/" className="magazine-row-1-text">
            {t("magazine.nutrition")}
          </Link>
          <Link to="/" className="magazine-row-1-text">
            {t("magazine.training")}
          </Link>
          <Link to="/" className="magazine-row-1-text">
            {t("magazine.well_being")}
          </Link>
        </div> */}
      </div>
      <div style={{ backgroundColor: "#e1e9f2" }}>
        <div className="magazine-row-2">
          <div className="magazine-row-2-box">
            <div
              className="home-row-8-blog-container-box home-8-box-1"
              style={{
                background: `url(${process.env.REACT_APP_SERVER}/api${
                  allBlogs[0] ? allBlogs[0].featuredImage : ""
                }) no-repeat center center / cover`,
                width: "100%",
                height: "100%",
              }}
            ></div>
          </div>
          <div className="magazine-row-2-textbox">
            <div
              style={{
                textAlign: "right",
                color: "#ff7700",
                fontWeight: "300",
              }}
            >
              {allBlogs[0] ? allBlogs[0].category.name : ""}
            </div>

            <h1 className="font-heading-black">
              <Link
                to={`/magazine/${slug(allBlogs[0] ? allBlogs[0].title : "")}/${
                  allBlogs[0] ? allBlogs[0]._id : ""
                }`}
                className="font-heading-black hover-orange"
                style={{ textDecoration: "none" }}
              >
                {allBlogs[0] ? allBlogs[0].title : ""}
              </Link>
            </h1>

            <p
              className="font-paragraph-black"
              style={{ height: "100px", overflow: "hidden" }}
            >
              {allBlogs[0] ? allBlogs[0].paragraph : ""}
            </p>
          </div>
        </div>
      </div>
      {/* 3rd row */}
      <div style={{ backgroundColor: "#222932" }}>
        <div className="magazine-row-3">
          <p className="font-paragraph-white">{t("magazine.as")}</p>
          <Link className="home-button" to="/new">
            <span className="home-button-text font-paragraph-white">
              {t("magazine.start_challenge")}
              <ArrowRightOutlined />
            </span>
          </Link>
        </div>
      </div>
      {/* 3rd row */}
      {/* 8th row */}
      <div className="home-row-6" style={{ backgroundColor: "#fff" }}>
        <h1 className="home-row-6-heading font-heading-black">
          {t("magazine.recent")}
        </h1>
        <p style={{ fontSize: "18px" }} className="font-paragraph-black">
          {t("magazine.be_sure")}
        </p>
        <div className="home-row-6-video-container">
          <Link
            to={`/magazine/${slug(allBlogs[1] ? allBlogs[1].title : "")}/${
              allBlogs[1] ? allBlogs[1]._id : ""
            }`}
            style={{
              textAlign: "left",
              cursor: "pointer",
              color: "#171e27",
              padding: "10px",
            }}
          >
            <div className="magazine-row-2-box" style={{ height: "300px" }}>
              <div
                className="home-row-8-blog-container-box home-8-box-1"
                style={{
                  background: `url(${process.env.REACT_APP_SERVER}/api${
                    allBlogs[1] ? allBlogs[1].featuredImage : ""
                  }) no-repeat center center / cover`,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>

            <div style={{ color: "#ff7700", textAlign: "right" }}>
              {" "}
              {allBlogs[1] ? allBlogs[1].category.name : ""}
            </div>
            <h2 style={{ fontWeight: "600" }} className="font-heading-black">
              {allBlogs[1] ? allBlogs[1].title : ""}
            </h2>
            <p
              className="font-heading-paragraph"
              style={{ height: "20px", overflow: "hidden" }}
            >
              {" "}
              {allBlogs[1] ? allBlogs[1].paragraph : ""}
            </p>
          </Link>
          <Link
            to={`/magazine/${slug(allBlogs[1] ? allBlogs[1].title : "")}/${
              allBlogs[2] ? allBlogs[2]._id : ""
            }`}
            style={{
              textAlign: "left",
              cursor: "pointer",
              color: "#171e27",
              padding: "10px",
            }}
          >
            <div className="magazine-row-2-box" style={{ height: "300px" }}>
              <div
                className="home-row-8-blog-container-box home-8-box-2"
                style={{
                  background: `url(${process.env.REACT_APP_SERVER}/api${
                    allBlogs[2] ? allBlogs[2].featuredImage : ""
                  }) no-repeat center center / cover`,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>

            <div style={{ color: "#ff7700", textAlign: "right" }}>
              {allBlogs[2] ? allBlogs[2].category.name : ""}
            </div>
            <h2 style={{ fontWeight: "600" }} className="font-heading-black">
              {allBlogs[2] ? allBlogs[2].title : ""}
            </h2>
            <p
              className="font-paragraph-black"
              style={{ height: "20px", overflow: "hidden" }}
            >
              {" "}
              {allBlogs[2] ? allBlogs[2].paragraph : ""}
            </p>
          </Link>
        </div>
      </div>
      {/* 8th row */}
      <Footer />
    </div>
  );
}

export default Magazine;
