import React, { useState, useEffect, useContext } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import "../assets/userSetting.css";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { getUserProfileInfo } from "../services/users";
import { userInfoContext } from "../contexts/UserStore";
import { getSubscribtionInformation } from "../services/payment";
import { logoutUser, resetPassword } from "../services/authentication";
import { useHistory } from "react-router";

const emailIconStyle = {
  fontSize: "5rem",
  color: "var(--color-white)",
  padding: "8px",
  backgroundColor: "var(--color-orange-light)",
};

const passwordIconStyle = {
  fontSize: "5rem",
  color: "var(--color-orange-light)",
  padding: "8px",
  border: "1px solid var(--color-orange-light)",
};

function UserSetting() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [membershipDetails, setMembershipDetails] = useState({
    name: "",
    isValid: true,
    startTime: new Date(),
    endTime: new Date(),
    total: null,
    status: null,
    methods: null,
    date: null,
  });
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  const [t] = useTranslation();

  const fetchData = async () => {
    const res = await getUserProfileInfo(userInfo.id);
    const subInfo = await getSubscribtionInformation(res.customer.mollieId);
    setUserEmail(res.customer.email);
    if (res && subInfo.response) {
      const f = JSON.parse(subInfo.response)._embedded.subscriptions[0];
      setMembershipDetails({
        name: res.customer.customerDetails.membership[0].name,
        isValid: res.customer.customerDetails.membership[0].isValid,
        startTime: res.customer.customerDetails.membership[0].startTime,
        endTime: res.customer.customerDetails.membership[0].endTime,
        total: f.amount.value,
        status: f.status,
        methods: f.method,
        date: f.createdAt,
      });
      console.log("subinfo", f, res);
    }
    // console.log(
    //   "here",
    //   res,
    //   res.customer.customerDetails.mollieId,
    //   res.customer.mollieId
    // );
  };

  const updatePasswordButtonClick = async () => {
    if (email === userEmail) {
      setLoading(true);
      const res = await resetPassword(email);
      console.log(res);

      setLoading(false);
      logoutUser(history, setUserInfo);
    } else {
      alert("Please enter valid email address");
    }
  };

  useEffect(() => {
    fetchData();
  }, [userInfo]);

  return (
    <>
      <LoggedinNavbar />
      <div className="user-setting-container">
        <div className="user-setting-container-heading font-paragraph-white">
          <UserOutlined style={{ paddingRight: "10px" }} />
          {t("user_setting.account_setting")}
        </div>
        <div className="user-setting-container-body">
          <div className="user-setting-container-body1">
            <div className="user-setting-container-body1-box">
              <MailOutlined style={emailIconStyle} />
              <div style={{ width: "100%", padding: "10px" }}>
                <span className="font-paragraph-white">
                  Enter Your Email To Update Password
                </span>
                <Input
                  className="user-setting-container-body1-box-field font-paragraph-white"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="user-setting-container-body1-box">
              <LockOutlined style={passwordIconStyle} />
              <div style={{ width: "100%", padding: "10px" }}>
                <span className="font-paragraph-white">New Password</span>
                <Input
                  className="user-setting-container-body1-box-field font-paragraph-white"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="user-setting-container-body1-box">
              <LockOutlined style={passwordIconStyle} />
              <div style={{ width: "100%", padding: "10px" }}>
                <span className="font-paragraph-white">
                  Confirm New Password
                </span>
                <Input
                  className="user-setting-container-body1-box-field font-paragraph-white"
                  value={confirmPassword}
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div> */}
            {/* </div> */}
            <div className="user-setting-body1-button-container">
              {/* <button
                className="green-button font-paragraph-white"
                style={{ marginLeft: "10px" }}
              >
                {t("user_setting.save_email")}
              </button> */}
              {loading ? (
                <p className="font-paragraph-white">
                  <LoadingOutlined
                    style={{ color: "#fff", marginRight: "10px" }}
                  />{" "}
                  Sending an password reset link to your email, please wait..
                </p>
              ) : (
                <button
                  className="gray-button font-paragraph-white"
                  style={{ marginLeft: "10px" }}
                  onClick={updatePasswordButtonClick}
                >
                  {t("user_setting.update_password")}
                </button>
              )}
            </div>
          </div>
          <div className="user-setting-container-body2">
            <div className="user-setting-container-body2-row1">
              <div className="user-setting-container-body2-row1-column1">
                <div className="font-paragraph-white">
                  {t("user_setting.membership")}
                </div>
              </div>
              <div className="user-setting-container-body2-row1-column2">
                <div>
                  <span
                    className="font-paragraph-white"
                    style={{ fontSize: "1.8rem" }}
                  >
                    {t("user_setting.subscription")}
                  </span>
                  <span className="font-paragraph-white">
                    {membershipDetails.name === "CHALLENGE_12"
                      ? "12 Months Subscribtion Plan"
                      : membershipDetails.name === "CHALLENGE_3"
                      ? "3 Months Subscribtion Plan"
                      : "None"}
                  </span>
                </div>
                <div>
                  <span
                    className="font-paragraph-white"
                    style={{ fontSize: "1.8rem" }}
                  >
                    {t("user_setting.active")}
                  </span>
                  <span className="font-paragraph-white">
                    {membershipDetails.isValid === "active" ||
                    membershipDetails.name !== "CHALLENGE_1"
                      ? "Yes"
                      : "No"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      className="font-paragraph-white"
                      style={{ fontSize: "1.8rem" }}
                    >
                      {t("user_setting.created")}
                    </span>
                    <span className="font-paragraph-white">
                      {membershipDetails.name === "CHALLENGE_1"
                        ? ""
                        : moment(membershipDetails.startTime).format(
                            "DD/MM/YYYY"
                          )}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "60px",
                    }}
                  >
                    <span
                      className="font-paragraph-white"
                      style={{ fontSize: "1.8rem" }}
                    >
                      {t("user_setting.expires_on")}
                    </span>
                    <span className="font-paragraph-white">
                      {membershipDetails.name === "CHALLENGE_1"
                        ? ""
                        : moment(membershipDetails.endTime).format(
                            "DD/MM/YYYY"
                          )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-setting-container-body2-row2">
              <div className="font-paragraph-white">
                <span style={{ fontSize: "1.8rem" }}>
                  {" "}
                  {t("user_setting.date")}{" "}
                </span>
                <span>{moment(new Date()).format("DD/MM/YYYY")}</span>
              </div>
              <div className="font-paragraph-white">
                <span style={{ fontSize: "1.8rem" }}>
                  {" "}
                  {t("user_setting.methods")}{" "}
                </span>
                <span>{membershipDetails.methods}</span>
              </div>
              <div className="font-paragraph-white">
                <span style={{ fontSize: "1.8rem" }}>
                  {t("user_setting.total")}{" "}
                </span>
                <span>{membershipDetails.total}</span>
              </div>
              <div className="font-paragraph-white">
                <span style={{ fontSize: "1.8rem" }}>
                  {t("user_setting.status")}{" "}
                </span>
                <span>{membershipDetails.status}</span>
              </div>
              <div className="font-paragraph-white">
                <span style={{ fontSize: "1.8rem" }}>
                  {t("user_setting.membership")}
                </span>
                <span>
                  {moment(membershipDetails.date).format("DD/MM/YYYY")}
                </span>
              </div>
              {/* <div className="font-paragraph-white">
                <span style={{ fontSize: "1.8rem" }}>
                  {t("user_setting.invoice")}
                </span>
                <span>test</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSetting;
