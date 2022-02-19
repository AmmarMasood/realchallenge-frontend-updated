import React, { useState, useEffect, useRef } from "react";
import "../assets/home.css";
import "../assets/trainers.css";
import "../assets/challenge.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  ArrowRightOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";
import { useTranslation } from "react-i18next";
import ChallengeCard from "../components/Cards/ChallengeCard";
import forward from "../assets/icons/forward-white.png";
import { getAllChallenges } from "../services/createChallenge/main";
import slug from "elegant-slug";

function Challenges() {
  // eslint-disable-next-line
  const [t] = useTranslation();
  const [challenges, setChallenges] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const fetchData = async () => {
    const data = await getAllChallenges(localStorage.getItem("locale"));
    const chal = data.challenges;
    console.log(chal);
    setChallenges(chal ? chal.reverse().slice(0, 8) : []);
  };
  return (
    <div>
      <Navbar />
      {/* <Hero /> */}
      <div className="page-header challenge-background">
        <div className="page-header-textbox" style={{ padding: "50px" }}>
          <h1 className="font-heading-white">
            {t("challenges.your_goals")} <br /> {t("challenges.your_cha")}
          </h1>
          <p className="font-paragraph-white">{t("challenges.regard")}</p>
          <Link className="home-button" to="/new">
            <span className="home-button-text font-paragraph-white">
              {t("challenges.start")} <ArrowRightOutlined />
            </span>
          </Link>
        </div>
      </div>
      {/* 2rd row */}
      <div style={{ backgroundColor: "#222932" }}>
        <div className="challenges-2-row">
          <Carousel autoplay>
            {challenges.map((challenge) => (
              <Link
                key={challenge._id}
                to={`challenge/${slug(challenge.challengeName)}/${
                  challenge._id
                }`}
              >
                <div
                  className="challenge-carousel-body"
                  style={{
                    background: `url(${process.env.REACT_APP_SERVER}/api${challenge.thumbnailLink})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                  }}
                >
                  <div className="challenge-carousel-body-overcolor"></div>
                  <div className="challenge-carousel-body-abstext for-650px-screen-nodisplay">
                    <h1
                      className="font-subheading-white"
                      style={{ fontSize: "4rem" }}
                    >
                      {t("challenges.new_cha")}
                    </h1>
                    <p className="challenge-carousel-body-abstext-paragraph font-subheading-white">
                      {t("challenges.tp")}
                    </p>
                  </div>
                  <div
                    className="challenge-carousel-body-textbox font-subheading-white"
                    style={{ fontSize: "3rem" }}
                  >
                    <h1>{challenge.challengeName}</h1>
                    <p className="challenge-carousel-body-abstext-paragraph  font-paragraph-white">
                      {challenge.description}
                    </p>
                    <div>
                      <img
                        src={forward}
                        alt=""
                        style={{
                          height: "20px",
                          margin: "5px 0",
                        }}
                      />
                    </div>

                    <div>
                      {new Array(challenge.rating ? challenge.rating : 1)
                        .fill(0)
                        .map((e, index) => (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            key={index}
                          >
                            <path
                              d="M11.3925 6.71722L9.77427 1.43049C9.45503 0.3928 7.97995 0.3928 7.67173 1.43049L6.04253 6.71722H1.14394C0.0761601 6.71722 -0.364163 8.0826 0.505475 8.69429L4.51241 11.5343L2.93826 16.5698C2.61902 17.5856 3.8079 18.4048 4.65552 17.7604L8.71749 14.7019L12.7795 17.7713C13.6271 18.4158 14.816 17.5965 14.4967 16.5807L12.9226 11.5452L16.9295 8.70521C17.7991 8.0826 17.3588 6.72814 16.291 6.72814H11.3925V6.71722Z"
                              fill="#FDA136"
                            />
                          </svg>
                        ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </div>
      {/* 2rd row */}
      {/* 3rd row */}

      <div style={{ backgroundColor: "#171e27" }}>
        <div className="trainers-3-row challenge-3-background">
          <h1
            style={{ fontSize: "3rem", paddingLeft: "20px" }}
            className="font-subheading-white"
          >
            {t("challenges.lt")}
          </h1>
          <p className="font-paragraph-white" style={{ paddingLeft: "20px" }}>
            {t("challenges.basic_challenge")}
          </p>
          <div
            className="trainers-3-row-cards"
            ref={ref}
            style={{
              overflow: "hidden",
              flexWrap: "nowrap",
            }}
          >
            {challenges.map((challenge) => (
              <Link
                to={`/challenge/${slug(challenge.challengeName)}/${
                  challenge._id
                }`}
              >
                <ChallengeCard
                  picture={`${process.env.REACT_APP_SERVER}/api${challenge.thumbnailLink}`}
                  rating={challenge.rating}
                  name={challenge.challengeName}
                  newc={true}
                  key={challenge._id}
                />
              </Link>
            ))}
          </div>
          <div style={{ paddingTop: "10px" }}>
            <Link
              className="view-all-button"
              to="/all-challenges"
              style={{
                marginLeft: "20px",
                width: "150px",
              }}
            >
              <span className="font-paragraph-white">
                {t("challenges.view_all")} <ArrowRightOutlined />
              </span>
            </Link>
          </div>
          <div style={{ float: "right", marginTop: "-25px" }}>
            <span
              className="font-paragraph-white view-all-button"
              style={{
                fontSize: "20px",
                padding: "8px 8px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={() => scroll(-150)}
            >
              <CaretLeftOutlined />
            </span>

            <span
              className="font-paragraph-white  view-all-button"
              style={{
                fontSize: "20px",
                padding: "8px 8px",
                cursor: "pointer",
              }}
              onClick={() => scroll(350)}
            >
              <CaretRightOutlined />
            </span>
          </div>
        </div>
      </div>
      {/* 3th row */}
      {/* 4th row */}
      <div style={{ backgroundColor: "#222932" }}>
        <div className="challenge-row-4 color-grey">
          <h1 className="font-heading-white">{t("challenges.healthy")}</h1>
          <p className="font-paragraph-white">{t("challenges.basic")}</p>
          <div style={{ paddingTop: "10px" }}>
            <Link
              className="view-all-button"
              to="/all-challenges"
              style={{
                marginLeft: "20px",
                width: "150px",
              }}
            >
              <span className="font-paragraph-white">
                {t("challenges.view_all")} <ArrowRightOutlined />
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* 4th row */}
      {/* 5th row */}
      <div style={{ backgroundColor: "#171e27" }}>
        <div className="challenge-row-4 color-grey-dark">
          <h1 className="font-heading-white">{t("challenges.tk")}</h1>
          <p className="font-paragraph-white">
            {t("challenges.challenge_yourself")}
          </p>
          <div style={{ paddingTop: "10px" }}>
            <Link
              className="view-all-button"
              to="/all-challenges"
              style={{
                marginLeft: "20px",
                width: "150px",
              }}
            >
              <span className="font-paragraph-white">
                {t("challenges.view_all")} <ArrowRightOutlined />
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* 5th row */}
      {/* 6th row */}
      <div style={{ backgroundColor: "#222932" }}>
        <div className="challenge-row-4 color-grey">
          <h1 className="font-heading-white">{t("challenges.mindset")}</h1>
          <p className="font-paragraph-white">{t("challenges.think_fit")}</p>
          <div style={{ paddingTop: "10px" }}>
            <Link
              className="view-all-button"
              to="/all-challenges"
              style={{
                marginLeft: "20px",
                width: "150px",
              }}
            >
              <span className="font-paragraph-white">
                {t("challenges.view_all")} <ArrowRightOutlined />
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* 6th row */}
      {/* 7th row */}
      <div style={{ backgroundColor: "#171e27" }}>
        <div className="challenge-row-4 color-grey-dark">
          <h1 className="font-heading-white">{t("challenges.gain_muscle")}</h1>
          <p className="font-paragraph-white">
            {t("challenges.let_the_gains")}
          </p>
          <div style={{ paddingTop: "10px" }}>
            <Link
              className="view-all-button"
              to="/all-challenges"
              style={{
                marginLeft: "20px",
                width: "150px",
              }}
            >
              <span className="font-paragraph-white">
                {t("challenges.view_all")} <ArrowRightOutlined />
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* 7th row */}
      {/* 8th row */}
      <div className="challenge-row-8 color-grey" style={{ height: "300px" }}>
        <h1 className="font-heading-white">{t("challenges.want")}</h1>
        <Link className="home-button" to="/all-challenges">
          <span className="home-button-text font-paragraph-white">
            {t("challenges.our")} <ArrowRightOutlined />
          </span>
        </Link>
      </div>
      {/* 8th row */}
      <div className="home-row-7 background-challenge">
        <div className="home-row-7-container">
          <div className="home-row-7-container-text">
            <h2 style={{ fontSize: "2rem" }} className="font-subheading-black">
              {t("challenges.start_today")}
            </h2>
            <h1 style={{ fontSize: "4.5rem" }} className="font-heading-black">
              {t("challenges.optimal")}
            </h1>
            <p
              style={{ fontSize: "1.8rem", paddingBottom: "10px" }}
              className="font-paragraph-black"
            >
              {t("challenges.a_personal")}
            </p>
            <Link className="home-button" to="/new">
              <span className="home-button-text font-paragraph-white">
                {t("common.start_now")} <ArrowRightOutlined />
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* 7th row */}

      {/* 4th row */}
      <Footer />
    </div>
  );
}

export default Challenges;