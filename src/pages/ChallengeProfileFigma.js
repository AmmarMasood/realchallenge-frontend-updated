import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { useMediaQuery } from "react-responsive";
import { mediaQueries } from "../helpers/responsive";
import ChallengeProfileTab from "../components/ChallengeProfile/ChallengeProfileTab";
import ChallengeProfileMobile from "../components/ChallengeProfile/ChallengeProfileMobile";
import ChallengeProfileWeb from "../components/ChallengeProfile/ChallengeProfileWeb";

import Logo from "../images/logo.png";
import ChallengeProfileCover from "../images/challenge-profile-cover.png";
import ChalleengeProfileFether from "../images/challenge-profile-cover-feather.svg";
import ChallengeProfileSubtract from "../assets/icons/challenge-profile-subtract.svg";
import StarFilled from "../assets/icons/star-orange.svg";
import StartTransparent from "../assets/icons/star-transparent.svg";
import DownArrow from "../assets/icons/down-orange-arrow.svg";
import { userInfoContext } from "../contexts/UserStore";
import { getChallengeById } from "../services/createChallenge/main";
import { getUserProfileInfo } from "../services/users";
import { LoadingOutlined } from "@ant-design/icons";

const challengeWebUnauthorizedUserData = {
  coverPhoto: ChallengeProfileCover,
  coverFeather: ChalleengeProfileFether,
  realChallengeLogo: Logo,
  spanText: "Challenges",
  spanText2: "   Trainers   Nutrition",
  text16: "How it works   Pricing   Magazine",
  surname: "English",
  vector1: "vector-1.svg",
  startNow: "Start now",
  logIn: "Log in",
  subtract: ChallengeProfileSubtract,
  stars: StartTransparent,
  address: "3 REVIEWS",
  polygon11: "polygon-11.svg",
  group9892: "group-9892.svg",
  gemiddeld: "Gemiddeld",
  kort: "Kort",
  text19:
    "Deze challenge om veel sterker te worden. Door verschillende soorten oegeningen uit te voeren, kun je je eigen prestatie veel verder krijgen. Dat betekent dat je niet zo maar wat doet, maar je wordt veel sterker.",
  subscription: "SUBSCRIPTION",
  helpIcon: "help-icon.svg",
  vector2: "vector-2.svg",
  text15: "Get access to all features",
  oneTimeChallenge: "One-Time Challenge",
  price: "€35",
  noSubscription: "No subscription",
  billedOnce: "Billed once",
  repeatSave: "Repeat & Save",
  spanText3: "Save up to",
  spanText4: " 60%",
  price2: "€4.5",
  week: "/Week",
  address2: "12 months plan",
  billedMonthly: "Billed monthly",
  repeatSave2: "Repeat & Save",
  spanText5: "Save up to",
  spanText6: " 30%",
  price3: "€6",
  week2: "/Week",
  address3: "3 months plan",
  billedMonthly2: "Billed monthly",
  overlapGroup15: "rectangle-1844.svg",
  startNow2: "START NOW",
  rectangle1859: "rectangle-1859.png",
  name: "Lana van Wit",
  trainers: "TRAINERS",
  goals: "GOALS",
  bodyFocus: "BODY FOCUS",
  equipment: "EQUIPMENT",
  results: "RESULTS",
  info: "INFO",
  conditionIcon: "condition-icon.svg",
  conditie: "Conditie",
  heelLichaam: "Heel lichaam",
  kettlebell: "Kettlebell",
  dumbellIcon: "dumbell-icon.svg",
  kracht: "Kracht",
  afvallen: "Afvallen",
  text20: (
    <>
      - Get stronger.
      <br />- Be more flexible.
      <br />- Burn fat.
      <br />
      Disclaimer: Don&#x27;t do it if you are too heavy.
    </>
  ),
  address4: (
    <>
      30 days unique workouts
      <br />
      Repeat or choose a new challenge.
    </>
  ),
  text21: "YOUR PERSONAL JOURNEY",
  overlapGroup8: "week-button.svg",
  week1: "WEEK 1",
  foundation6Days: "FOUNDATION (6 DAYS)",
  vector12: DownArrow,
  overlapGroup7: "week-button.svg",
  week22: "WEEK 2",
  text22: "INTEGRATION (5 DAYS)",
  vector22: DownArrow,
  text23:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  infoIcon1: "info-icon-1.svg",
  infoIcon2: "info-icon-2.svg",
  comments: "COMMENTS",
  rectangle1869: "rectangle-1869.svg",
  rectangle1870: "rectangle-1870.svg",
  name2: "Kim   Me too, I love it!",
  apr082021: "Apr, 08, 2021",
  filipWowILikeIt: "Filip   Wow I like it",
  apr032021: "Apr, 03, 2021",
  postComment: "POST COMMENT",
};

const challengeTabletUnauthorizedUserData = {
  overlapGroup: ChallengeProfileCover,
  realChallengeLogo: "real-challenge-logo.svg",
  startNow: "Start now",
  logIn: "Log in",
  dashiconsMenuAlt: "dashicons-menu-alt.svg",
  overlapGroup7: ChalleengeProfileFether,
  subtract: "subtract-2.svg",
  address: "3 REVIEWS",
  polygon11: "polygon-11-1.svg",
  group9892: "group-9892-1.svg",
  gemiddeld: "Gemiddeld",
  kort: "Kort",
  text2:
    "Deze challenge om veel sterker te worden. Door verschillende soorten oegeningen uit te voeren, kun je je eigen prestatie veel verder krijgen. Dat betekent dat je niet zo maar wat doet, maar je wordt veel sterker.",
  stars: "stars.svg",
  trainers: "TRAINERS",
  rectangle1876: "rectangle-1886.png",
  name: "Lana van Wit",
  goals: "GOALS",
  conditionIcon: "condition-icon-1.svg",
  conditie: "Conditie",
  dumbellIcon: "dumbell-icon.svg",
  kracht: "Kracht",
  afvallen: "Afvallen",
  bodyFocus: "BODY FOCUS",
  heelLichaam: "Heel lichaam",
  equipment: "EQUIPMENT",
  kettlebell: "Kettlebell",
  results: "RESULTS",
  text3: (
    <>
      - Get stronger.
      <br />- Be more flexible.
      <br />- Burn fat.
      <br />
      Disclaimer: Don&#x27;t do it if you are too heavy.
    </>
  ),
  info: "INFO",
  infoIcon3: "info-icon-3.svg",
  infoIcon4: "info-icon-6.svg",
  address2: (
    <>
      30 days unique workouts
      <br />
      Repeat or choose a new challenge.
    </>
  ),
  text4: "YOUR PERSONAL JOURNEY",
  overlapGroup8: "week-button-2.svg",
  week1: "WEEK 1",
  foundation6Days: "FOUNDATION (6 DAYS)",
  polygon13: "polygon-13.svg",
  overlapGroup72: "week-button-2.svg",
  week2: "WEEK 2",
  text5: "INTEGRATION (5 DAYS)",
  polygon132: "polygon-13-1.svg",
  text6:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  subscription: "SUBSCRIPTION",
  helpIcon: "help-icon-1.svg",
  polygon14: "polygon-14.svg",
  text7: "Get access to all features",
  oneTimeChallenge: "One-Time Challenge",
  price: "€35",
  noSubscription: "No subscription",
  billedOnce: "Billed once",
  repeatSave: "Repeat & Save",
  spanText: "Save up to",
  spanText2: " 60%",
  price2: "€4.5",
  week: "/Week",
  address3: "12 months plan",
  billedMonthly: "Billed monthly",
  repeatSave2: "Repeat & Save",
  spanText3: "Save up to",
  spanText4: " 30%",
  price3: "€6",
  week3: "/Week",
  address4: "3 months plan",
  billedMonthly2: "Billed monthly",
  overlapGroup20: "rectangle-1844-2.svg",
  startNow2: "START NOW",
  comments: "COMMENTS",
  rectangle1869: "rectangle-1869-1.svg",
  rectangle1870: "rectangle-1870-1.svg",
  name2: "Kim   Me too, I love it!",
  apr082021: "Apr, 08, 2021",
  filipWowILikeIt: "Filip   Wow I like it",
  apr032021: "Apr, 03, 2021",
  postComment: "POST COMMENT",
};

const challengePhoneUnauthorizedUserData = {
  coverPhoto: "cover-photo-1.png",
  coverFeather: "cover-feather-1.svg",
  subtract: "subtract-1.svg",
  address: "3 REVIEWS",
  text9:
    "Deze challenge om veel sterker te worden. Door verschillende soorten oegeningen uit te voeren, kun je je eigen prestatie veel verder krijgen. Dat betekent dat je niet zo maar wat doet, maar je wordt veel sterker.",
  realChallengeLogo: "real-challenge-logo.svg",
  startNow: "Start now",
  logIn: "Log in",
  dashiconsMenuAlt: "dashicons-menu-alt.svg",
  stars: "stars-1.svg",
  gemiddeld: "Gemiddeld",
  kort: "Kort",
  group9893: "group-9893.svg",
  trainers: "TRAINERS",
  rectangle1886: "rectangle-1886.png",
  name: "Lana van Wit",
  goals: "GOALS",
  conditionIcon: "condition-icon-1.svg",
  conditie: "Conditie",
  dumbellIcon: "dumbell-icon.svg",
  kracht: "Kracht",
  afvallen: "Afvallen",
  bodyFocus: "BODY FOCUS",
  heelLichaam: "Heel lichaam",
  equipment: "EQUIPMENT",
  kettlebell: "Kettlebell",
  results: "RESULTS",
  text10: (
    <>
      - Get stronger.
      <br />- Be more flexible.
      <br />- Burn fat.
      <br />
      Disclaimer: Don&#x27;t do it if you are too heavy.
    </>
  ),
  info: "INFO",
  infoIcon5: "info-icon-5.svg",
  infoIcon6: "info-icon-6.svg",
  address2: (
    <>
      30 days unique workouts
      <br />
      Repeat or choose a new challenge.
    </>
  ),
  text11: "YOUR PERSONAL JOURNEY",
  overlapGroup9: "week-button-2.svg",
  week1: "WEEK 1",
  foundation6Days: "FOUNDATION (6 DAYS)",
  polygon13: "polygon-13.svg",
  overlapGroup8: "week-button-2.svg",
  week2: "WEEK 2",
  text12: "INTEGRATION (5 DAYS)",
  polygon132: "polygon-13-1.svg",
  text13:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  subscription: "SUBSCRIPTION",
  helpIcon: "help-icon-1.svg",
  polygon14: "polygon-14.svg",
  text14: "Get access to all features",
  oneTimeChallenge: "One-Time Challenge",
  noSubscription: "No subscription",
  billedOnce: "Billed once",
  price: "€35",
  repeatSave: "Repeat & Save",
  spanText: "Save up to",
  spanText2: " ",
  spanText3: "60%",
  address3: "12 months plan",
  billedMonthly: "Billed monthly",
  price2: "€4.5",
  week: "Week",
  repeatSave2: "Repeat & Save",
  spanText4: "Save up to",
  spanText5: " 3",
  spanText6: "0%",
  address4: "3 months plan",
  billedMonthly2: "Billed monthly",
  price3: "€6",
  week3: "Week",
  overlapGroup82: "rectangle-1844-1.svg",
  startNow2: "START NOW",
  comments: "COMMENTS",
  rectangle1869: "rectangle-1869-1.svg",
  rectangle1870: "rectangle-1870-1.svg",
  name2: "Kim   Me too, I love it!",
  apr082021: "Apr, 08, 2021",
  filipWowILikeIt: "Filip   Wow I like it",
  apr032021: "Apr, 03, 2021",
  postComment: "POST COMMENT",
};

function ChallengeProfileFigma(props) {
  const [challenge, setChallenge] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(userInfoContext);
  const isMobile = useMediaQuery({ query: mediaQueries.mobileQuery });
  const isDesktop = useMediaQuery({ query: mediaQueries.desktopQuery });
  const isTab = useMediaQuery({ query: mediaQueries.tabletQuery });

  useEffect(() => {
    fetchData();
  }, [userInfo]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getChallengeById(props.match.params.id);
    if (localStorage.getItem("jwtToken") && userInfo.id) {
      const uInfo = await getUserProfileInfo(userInfo.id);
      uInfo && setUserDetails(uInfo.customer);
      console.log("uInfo", uInfo);
    }
    setChallenge(res);
    setLoading(false);
    console.log(res, "res");
  };

  return loading ? (
    <div className="center-inpage">
      <LoadingOutlined style={{ fontSize: "50px", color: "#ff7700" }} />
    </div>
  ) : isDesktop ? (
    <ChallengeProfileWeb {...challenge} />
  ) : isTab ? (
    <ChallengeProfileTab {...challengeTabletUnauthorizedUserData} />
  ) : (
    <ChallengeProfileMobile {...challengePhoneUnauthorizedUserData} />
  );
}

export default withRouter(ChallengeProfileFigma);
