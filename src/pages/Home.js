import React, { useState, useEffect, useContext } from "react";
import "../assets/home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";
import { useTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import {
  ArrowRightOutlined,
  LaptopOutlined,
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
  CheckOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import VideoPhone from "../images/ipx-video-1024x515.png";
import MobileScreen from "../images/ipx-dash-515x1024.png";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import { userInfoContext } from "../contexts/UserStore";

function Home(props) {
  const [isOpen, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  const [link, setLink] = useState("");
  const [t] = useTranslation();

  useEffect(() => {
    if (userInfo.authenticated) {
      if (userInfo.role === "customer") {
        props.history.push("/user/dashboard");
      }
      if (userInfo.role === "admin") {
        props.history.push("/admin/dashboard");
      }
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Hero />
      {/* video modal */}
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={link}
        onClose={() => setOpen(false)}
      />

      {/* pick your first goal starts */}
      <div className="home-row-2-outside">
        <div className="home-row-2">
          <div className="home-row-2-col-1">
            <h3 className="home-row-2-col-1-heading font-subheading-white">
              {t("home.home-row-2.pick_first")}
            </h3>
            <h2 className="home-row-2-col-1-subheading font-heading-white">
              {t("home.home-row-2.personal_train")}
            </h2>
            <p className="home-text font-paragraph-white">
              {t("home.home-row-2.real_challenge_offers")}
            </p>
            <Link className="home-button font-paragraph-white" to="/challenges">
              <span className="home-button-text">
                {t("common.accept_the_challenge")} <ArrowRightOutlined />
              </span>
            </Link>
          </div>
          <div className="home-row-2-col-2">
            <div className="home-row-2-col-2-box">
              <ArrowRightOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.8rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-2.free_digital_intake")}
              </span>
            </div>
            <div className="home-row-2-col-2-box">
              <ArrowRightOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.8rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-2.success_monitor")}
              </span>
            </div>
            <div className="home-row-2-col-2-box">
              <ArrowRightOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.8rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-2.for_starters")}
              </span>
            </div>
            <div className="home-row-2-col-2-box">
              <ArrowRightOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.8rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-2.free_weekly")}
              </span>
            </div>
            <div className="home-row-2-col-2-box">
              <ArrowRightOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.8rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-2.adapts_to_you")}
              </span>
            </div>
            <div className="home-row-2-col-2-box">
              <ArrowRightOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.8rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-2.motivating")}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* pick your first goa ends */}
      {/* pick your first goal starts */}
      <div className="home-row-3-outside">
        <div className="home-row-3">
          <div className="home-row-3-col-1">
            {/* box start */}
            <div className="home-row-3-col-1-box goal-1">
              <div className="home-row-3-col-1-box-textbox">
                <h3 className="home-row-3-col-1-box-textbox-heading font-subheading-white">
                  {t("home.home-row-3.become_fit")}
                </h3>
                <div className="home-row-3-col-1-box-textbox-text font-paragraph-white">
                  {t("home.home-row-3.stay_active")}
                </div>
              </div>
            </div>
            {/* box ends */}
            {/* box start */}
            <div className="home-row-3-col-1-box goal-2">
              <div className="home-row-3-col-1-box-textbox">
                <h3 className="home-row-3-col-1-box-textbox-heading font-subheading-white">
                  {t("home.home-row-3.lose_weight")}
                </h3>
                <div className="home-row-3-col-1-box-textbox-text font-paragraph-white">
                  {t("home.home-row-3.discover_how")}
                </div>
              </div>
            </div>
            {/* box ends */}
            {/* box start */}
            <div className="home-row-3-col-1-box goal-3">
              <div className="home-row-3-col-1-box-textbox">
                <h3 className="home-row-3-col-1-box-textbox-heading font-subheading-white">
                  {t("home.home-row-3.building_muscles")}
                </h3>
                <div className="home-row-3-col-1-box-textbox-text font-paragraph-white">
                  {t("home.home-row-3.strong_body")}
                </div>
              </div>
            </div>
            {/* box ends */}
            {/* box start */}
            <div className="home-row-3-col-1-box goal-4">
              <div className="home-row-3-col-1-box-textbox">
                <h3 className="home-row-3-col-1-box-textbox-heading font-subheading-white">
                  {t("home.home-row-3.master_mindset")}
                </h3>
                <div className="home-row-3-col-1-box-textbox-text font-paragraph-white">
                  {t("home.home-row-3.think_fit")}
                </div>
              </div>
            </div>
            {/* box ends */}
          </div>
          <div className="home-row-3-col-2">
            <h3 className="home-row-2-col-1-heading font-subheading-white">
              {t("home.home-row-3.pick_your")}
            </h3>
            <h2 className="home-row-2-col-1-subheading font-heading-white">
              {t("home.home-row-3.daily_challenges")}
              <br /> {t("home.home-row-3.monthly_goals")}
            </h2>
            <p className="home-text font-paragraph-white">
              {t("home.home-row-3.real_challenge_analyse")}
            </p>
            <div>
              <Link className="home-button" to="/new">
                <span className="home-button-text">
                  {t("common.how_it_works")} <ArrowRightOutlined />
                </span>
              </Link>
              <Link
                className="home-button-2"
                to="/how-it-works"
                style={{ marginLeft: "10px" }}
              >
                <span className="home-button-text">
                  {" "}
                  {t("common.how_it_works")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* pick your first goa ends */}
      {/* 4th row */}
      <div className="home-row-4">
        <div className="home-row-4-heading font-subheading-black">
          {t("home.home-row-4.your_change")}
        </div>
        <div
          className="home-row-4-subheading font-heading-black"
          style={{ margin: "20px 0" }}
        >
          {t("home.home-row-4.exercise_whenever")}
        </div>
        <div className="home-row-4-text font-paragraph-black">
          {t("home.home-row-4.working_out")}
        </div>
        <div className="home-row-4-heading-icons">
          <LaptopOutlined className="home-row-4-heading-icon" />{" "}
          <TabletOutlined className="home-row-4-heading-icon" />{" "}
          <MobileOutlined className="home-row-4-heading-icon" />{" "}
          <DesktopOutlined className="home-row-4-heading-icon" />
        </div>
        <div className="home-row-4-heading-mobile">
          <img
            src={VideoPhone}
            alt="video-phone"
            className="home-row-4-heading-mobile-image"
          />
        </div>
      </div>
      {/* 4th row */}
      {/* 5th row */}
      <div style={{ backgroundColor: "#171e27" }}>
        <div className="home-row-5">
          <div className="home-row-5-column-1">
            <h3 className="home-row-2-col-1-heading font-heading-white">
              {t("common.how_it_works")}
            </h3>
            <h2 className="home-row-2-col-1-subheading font-subheading-white">
              {t("home.home-row-5.personal_succ")}
            </h2>
            <p className="home-text font-paragraph-white">
              {" "}
              {t("home.home-row-5.what")}
            </p>
            <div className="home-row-2-col-2-box">
              <CheckOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.5rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-5.all_the_tools")}
              </span>
            </div>
            <div className="home-row-2-col-2-box">
              <CheckOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.5rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-5.daily_updates")}
              </span>
            </div>
            <div className="home-row-2-col-2-box">
              <CheckOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.5rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-5.your_personal")}
              </span>
            </div>
            <div className="home-row-2-col-2-box">
              <CheckOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.5rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-5.choose")}
              </span>
            </div>
            <div className="home-row-2-col-2-box">
              <CheckOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.5rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-5.week")}
              </span>
            </div>
            <div className="home-row-2-col-2-box">
              <CheckOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.5rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-white">
                {t("home.home-row-5.comm")}
              </span>
            </div>

            <div style={{ paddingTop: "20px" }}>
              <Link className="home-button" to="/new">
                <span className="home-button-text">
                  {t("common.free_intake")} <ArrowRightOutlined />
                </span>
              </Link>
              <Link
                className="home-button-2"
                to="/how-it-works"
                style={{ marginLeft: "10px" }}
              >
                <span className="home-button-text">
                  {t("common.how_it_works")}
                </span>
              </Link>
            </div>
          </div>
          <div className="home-row-5-column-2">
            <img
              src={MobileScreen}
              alt="mobile-screen"
              className="home-row-5-column-2-image"
            />
          </div>
        </div>
      </div>
      {/* 5th row */}
      {/* 6th row */}
      <div className="home-row-6">
        <h1 className="home-row-6-heading font-heading-black">
          {t("home.home-row-6.we_share_exp")}
        </h1>
        <p style={{ fontSize: "18px" }} className="font-paragraph-black">
          {t("home.home-row-6.this_is")}
        </p>
        <div className="home-row-6-video-container">
          <div
            className="home-row-6-video-container-box home-6-box-1"
            style={{ textAlign: "left" }}
            onClick={() => {
              setLink("https://www.youtube.com/embed/jVfuTFgUQEo");
              setOpen(true);
            }}
          >
            <div className="pricing-video-box-overlay"></div>
            <div className="home-row-6-text font-paragraph-white">
              <PlayCircleOutlined className="play-icon" />{" "}
              {t("home.home-row-6.find_the_right")}
            </div>
          </div>
          <div
            className="home-row-6-video-container-box home-6-box-2"
            style={{ textAlign: "left" }}
            onClick={() => {
              setLink("https://youtu.be/dakFOeZGbO4");
              setOpen(true);
            }}
          >
            <div className="pricing-video-box-overlay"></div>
            <div className="home-row-6-text font-paragraph-white">
              <PlayCircleOutlined className="play-icon" />{" "}
              {t("home.home-row-6.customized_plan")}
            </div>
          </div>
          <div
            className="home-row-6-video-container-box home-6-box-3"
            onClick={() => {
              setLink("https://youtu.be/0e_0sSkH_dQ");
              setOpen(true);
            }}
            style={{ textAlign: "left" }}
          >
            <div className="pricing-video-box-overlay"></div>
            <div className="home-row-6-text font-paragraph-white">
              <PlayCircleOutlined className="play-icon" />{" "}
              {t("home.home-row-6.exercise_whenever")}
            </div>
          </div>
        </div>
      </div>
      {/* 6th row */}
      {/* 7th row */}
      <div className="home-row-7">
        <div className="home-row-7-container">
          <div className="home-row-7-container-text">
            <h2 style={{ fontSize: "2rem" }} className="font-subheading-black">
              {t("home.home-row-7.quit")}
            </h2>
            <h1 style={{ fontSize: "4.5rem" }} className="font-heading-black">
              {t("home.home-row-7.feel")}
            </h1>
            <p
              style={{ fontSize: "1.8rem", paddingBottom: "10px" }}
              className="font-paragraph-black"
            >
              {t("home.home-row-7.together")}
            </p>
            <Link className="home-button" to="/challenges">
              <span className="home-button-text font-paragraph-white">
                {t("common.start_your_challenge_today")} <ArrowRightOutlined />
              </span>
            </Link>
            <p style={{ paddingTop: "10px" }} className="font-paragraph-black">
              {t("common.price")}{" "}
              <Link to="/how-it-works" style={{ color: "#ff7700" }}>
                {t("common.how_it_works_small")}
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* 7th row */}
      {/* 8th row */}
      <div className="home-row-6" style={{ padding: "100px 50px" }}>
        <h1 className="home-row-6-heading font-heading-black">
          {t("home.home-row-8.how")}
        </h1>
        <p style={{ fontSize: "18px" }} className="font-paragraph-black">
          {t("home.home-row-8.be_sure")}
        </p>
        <div className="home-row-6-video-container">
          <Link
            to="/magazine/12312321"
            style={{
              textAlign: "left",
              cursor: "pointer",
              color: "#171e27",
              padding: "10px",
            }}
          >
            <div className="magazine-row-2-box" style={{ height: "300px" }}>
              <div className="home-row-8-blog-container-box home-8-box-1"></div>
            </div>

            <div style={{ color: "#ff7700", textAlign: "right" }}>TRAINING</div>
            <h2 style={{ fontWeight: "600" }} className="font-subheading-black">
              Four Mistakes People Make when Choosing a Trainer
            </h2>
            <p className="font-paragraph-black">
              {" "}
              A training method to enhance neuromuscular efficiency and improve
              maximum strength
            </p>
          </Link>
          <Link
            to="/magazine/12312321"
            style={{
              textAlign: "left",
              cursor: "pointer",
              color: "#171e27",
              padding: "10px",
            }}
          >
            <div className="magazine-row-2-box" style={{ height: "300px" }}>
              <div className="home-row-8-blog-container-box home-8-box-2"></div>
            </div>

            <div style={{ color: "#ff7700", textAlign: "right" }}>NUTRIENT</div>
            <h2 style={{ fontWeight: "600" }} className="font-subheading-black">
              Six Things You Should Know Before Turning Vegan
            </h2>
            <p className="font-paragraph-black">
              {" "}
              Labels are about to become your new best friends
            </p>
          </Link>
          <Link
            to="/magazine/12312321"
            style={{
              textAlign: "left",
              cursor: "pointer",
              color: "#171e27",
              padding: "10px",
            }}
          >
            <div className="magazine-row-2-box" style={{ height: "300px" }}>
              <div className="home-row-8-blog-container-box home-8-box-3"></div>
            </div>

            <div style={{ color: "#ff7700", textAlign: "right" }}>
              WELL-BEING
            </div>
            <h2 style={{ fontWeight: "600" }} className="font-subheading-black">
              Cardio focused, weight loss Training Challenges
            </h2>
            <p className="font-paragraph-black">
              {" "}
              Designed to make you move fast and sweat more
            </p>
          </Link>
        </div>
      </div>
      {/* 8th row */}
      {/* 9th row */}
      <div className="home-row-9">
        <h1
          style={{ color: "#fff", fontSize: "4rem" }}
          className="font-heading-white"
        >
          {t("footer.community")}
        </h1>
        <h2
          style={{ color: "#fff", fontSize: "2.5rem" }}
          className="font-subheading-white"
        >
          {t("footer.follow")}
        </h2>
      </div>
      {/* 9th row */}
      <Footer />
    </div>
  );
}

export default withRouter(Home);
