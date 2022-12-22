import React, { useState, useContext, useEffect } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import "../assets/userDashboard.css";
import Nutrient from "../components/UserDashboard/Nutrient";
import Challenges from "../components/UserDashboard/Challenges";
import Feed from "../components/UserDashboard/Feed";
import Community from "../components/UserDashboard/Community";
import VerifyUser from "../components/UserDashboard/VerifyUser";

import useWindowDimensions from "../helpers/useWindowDimensions";
import NewsfeedGray from "../assets/icons/newsfeed-gray.svg";
import NewsfeedOrange from "../assets/icons/newsfeed-orange.svg";
import FlagOrange from "../assets/icons/flag-orange.svg";
import FlagGray from "../assets/icons/flag-gray.svg";
import AvacadoOrange from "../assets/icons/avacado-orange.svg";
import AvacadoGray from "../assets/icons/avacado-gray.svg";
import ChatGray from "../assets/icons/chat-gray.svg";
import ChatOrange from "../assets/icons/chat-orange.svg";
import { userInfoContext } from "../contexts/UserStore";
import {
  getUserProfileInfo,
  getRecommandedChallenges,
  getRecommandedWeeklyDiet,
} from "../services/users";
import { T } from "../components/Translate";
import { LanguageContext } from "../contexts/LanguageContext";

const barIconsStyle = {
  fontSize: "20px",
  paddingRight: "10px",
};
function UserDashboard() {
  const { language } = useContext(LanguageContext);
  const [current, setCurrent] = useState("feed");
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  const [userProfile, setUserProfile] = useState({});
  const [recommandedChallenges, setRecommandedChallenges] = useState([]);
  const [recommandedWeeklyDiet, setRecommandedWeeklyDiet] = useState([]);
  const [gender, setGender] = useState("");
  const { height, width } = useWindowDimensions();

  async function getUserDetails() {
    try {
      const res = await getUserProfileInfo(userInfo.id);
      if (res.customer.customerDetails) {
        setUserProfile(res.customer.customerDetails);
      }
      const rc = await getRecommandedChallenges(userInfo.id, language);
      const rd = await getRecommandedWeeklyDiet(userInfo.id);
      const gender = res.customer.gender;
      setGender(gender);
      setRecommandedChallenges(rc);
      setRecommandedWeeklyDiet(rd);

      console.log("rc", rc);
      console.log("rd", rd);

      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [current]);

  return (
    <>
      <LoggedinNavbar />
      {/* verify user email modal */}
      <VerifyUser />
      <div style={{ backgroundColor: "var(--color-gray-dark)" }}>
        <div className="dashboard-container">
          <div className="user-dashboard-bar">
            <div
              className={
                current === "feed"
                  ? `user-dashboard-bar-choosen font-paragraph-white`
                  : `user-dashboard-bar-choose font-paragraph-white`
              }
              style={{ color: "#677182", fontWeight: "800" }}
              onClick={() => setCurrent("feed")}
            >
              {current === "feed" ? (
                <img
                  src={NewsfeedOrange}
                  style={barIconsStyle}
                  alt="feed-orange"
                />
              ) : (
                <img src={NewsfeedGray} style={barIconsStyle} alt="feed-gray" />
              )}

              {width > 750 && <T>user_dashboard.news_feed</T>}
            </div>
            <div
              className={
                current === "challenges"
                  ? `user-dashboard-bar-choosen font-paragraph-white`
                  : `user-dashboard-bar-choose font-paragraph-white`
              }
              style={{ color: "#677182", fontWeight: "800" }}
              onClick={() => setCurrent("challenges")}
            >
              {current === "challenges" ? (
                <img src={FlagOrange} style={barIconsStyle} alt="flag-orange" />
              ) : (
                <img src={FlagGray} style={barIconsStyle} alt="flag-gray" />
              )}
              {width > 750 && <T>user_dashboard.challenges</T>}
            </div>
            <div
              className={
                current === "nutrient"
                  ? `user-dashboard-bar-choosen font-paragraph-white`
                  : `user-dashboard-bar-choose font-paragraph-white`
              }
              style={{ color: "#677182", fontWeight: "800" }}
              onClick={() => setCurrent("nutrient")}
            >
              {current === "nutrient" ? (
                <img
                  src={AvacadoOrange}
                  style={barIconsStyle}
                  alt="food-orange"
                />
              ) : (
                <img src={AvacadoGray} style={barIconsStyle} alt="food-gray" />
              )}
              {width > 750 && <T>user_dashboard.nutrients</T>}
            </div>
            <div
              className={
                current === "community"
                  ? `user-dashboard-bar-choosen font-paragraph-white`
                  : `user-dashboard-bar-choose font-paragraph-white`
              }
              style={{ color: "#677182", fontWeight: "800" }}
              onClick={() => setCurrent("community")}
            >
              {current === "community" ? (
                <img src={ChatOrange} style={barIconsStyle} alt="chat-orange" />
              ) : (
                <img src={ChatGray} style={barIconsStyle} alt="chat-gray" />
              )}
              {width > 750 && <T>user_dashboard.community</T>}
            </div>
          </div>
          <div className="user-dashboard-content">
            {current === "feed" && <Feed userInfo={userInfo} />}
            {current === "challenges" && (
              <Challenges
                key={1}
                userProfile={userProfile}
                gender={gender}
                recommandedChal={recommandedChallenges}
                recommandedWeeklyDiet={recommandedWeeklyDiet}
              />
            )}
            {current === "nutrient" && (
              <Nutrient
                getUserDetails={getUserDetails}
                userProfile={userProfile}
                gender={gender}
                recommandedWeekDiet={recommandedWeeklyDiet}
              />
            )}
            {current === "community" && <Community userInfo={userInfo} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
