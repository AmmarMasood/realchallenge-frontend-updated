import React from "react";
import { Carousel } from "antd";
import "../../assets/home-hero.css";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function Hero() {
  const [t] = useTranslation();
  return (
    <>
      <div className="hero-container">
        <video
          src="https://realchallenge.fit/wp-content/uploads/2019/01/Hero_v2.mp4"
          autoPlay
          loop
          muted
        />
        <div className="hero-carousel">
          <Carousel autoplay>
            <div className="carouselBody">
              <h1 className="font-heading-white">
                {t("home.header.build_your_body_and_mind")}
              </h1>
              <p className="font-subheading-white">
                {t("home.header.reach_goals")}
              </p>
              <Link
                className="home-button font-paragraph-white"
                to="/challenges"
              >
                <span className="home-button-text">
                  {t("common.start_your_7day_free_trial")}{" "}
                  <ArrowRightOutlined />
                </span>
              </Link>
            </div>
            <div className="carouselBody">
              <h1 className="font-heading-white">
                {t("home.header.result_with_personal")}
              </h1>
              <p className="font-subheading-white">
                {t("home.header.workout_at_home")}
              </p>
              <Link
                className="home-button font-paragraph-white"
                to="/challenges"
              >
                <span className="home-button-text">
                  {t("common.start_your_7day_free_trial")}{" "}
                  <ArrowRightOutlined />
                </span>
              </Link>
            </div>
            <div className="carouselBody">
              <h1 className="font-heading-white">
                {" "}
                {t("home.header.pick_your_personal")}
              </h1>
              <p className="font-subheading-white">
                {t("home.header.set_new")}
              </p>
              <Link
                className="home-button font-paragraph-white"
                to="/challenges"
              >
                <span className="home-button-text">
                  {t("common.start_your_7day_free_trial")}{" "}
                  <ArrowRightOutlined />
                </span>
              </Link>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default Hero;
