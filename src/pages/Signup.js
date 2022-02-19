import React, { useState, useContext, useEffect } from "react";
import Wizard from "../components/New/Wizard";
import "../assets/signup.css";
import "../assets/login.css";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { Input, Form } from "antd";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  registerUser,
  signupUserWithGoogle,
  signupUserWithFacebook,
} from "../services/authentication";
import { userInfoContext } from "../contexts/UserStore";
import { createCustomerDetails } from "../services/customer";
import setAuthToken from "../helpers/setAuthToken";

function Signup(props) {
  const [t] = useTranslation();
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  const [wizCompleted, setWizCompleted] = useState(false);
  const [wizardValues, setWizardValues] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      props.history.push("/user/dashboard");
    }
  }, []);

  function setWizardCompleted(d) {
    setWizardValues(d);
    setWizCompleted(true);
  }
  // TODO only possible when app goes live
  const responseFacebook = async (response) => {
    // delete value.confirm;
    response["gender"] = wizardValues.gender;
    setLoading(true);
    // console.log(wizardValues);
    // console.log(value);
    // // return;
    const res = await signupUserWithFacebook(response);
    if (res.success) {
      setUserInfo({
        ...userInfo,
        username: res.data.username,
        role: res.data.role,
        id: res.data._id,
        authenticated: true,
      });
      setLoading(false);
      localStorage.setItem("jwtToken", res.data.token);
      setAuthToken(localStorage.getItem("jwtToken"));
      const r = await createCustomerDetails(wizardValues, res.data._id);
      props.history.push("/new/welcome");
    } else {
      console.log("error 1", res);
      res.data.response && typeof res.data.response.data === "string"
        ? setError(res.data.response.data)
        : setError("Unable to create account. Please try again.");
      setLoading(false);
    }
  };

  const responseGoogle = async (response) => {
    // delete value.confirm;
    response["gender"] = wizardValues.gender;
    // setLoading(true);
    // console.log(wizardValues);
    // console.log(value);
    // // return;
    const res = await signupUserWithGoogle(response);
    if (res.success) {
      setUserInfo({
        ...userInfo,
        username: res.data.username,
        role: res.data.role,
        id: res.data._id,
        authenticated: true,
      });
      // setLoading(false);
      localStorage.setItem("jwtToken", res.data.token);
      setAuthToken(localStorage.getItem("jwtToken"));
      const r = await createCustomerDetails(wizardValues, res.data._id);
      props.history.push("/new/welcome");
    } else {
      console.log("error 2", res);
      res.data.response && typeof res.data.response.data === "string"
        ? setError(res.data.response.data)
        : setError("Unable to create account. Please try again.");
      setLoading(false);
    }
  };
  const onFinish = async (value) => {
    delete value.confirm;
    value["gender"] = wizardValues.gender;
    setLoading(true);
    // console.log(wizardValues);
    // console.log(value);
    // // return;
    const res = await registerUser(value);
    if (res.success) {
      setUserInfo({
        ...userInfo,
        username: res.data.username,
        role: res.data.role,
        email: res.data.email,
        id: res.data._id,
        authenticated: true,
      });
      setLoading(false);
      localStorage.setItem("jwtToken", res.data.token);
      localStorage.setItem("userRecentlySignedUp", true);
      localStorage.setItem("isActive", false);
      setAuthToken(localStorage.getItem("jwtToken"));
      const r = await createCustomerDetails(wizardValues, res.data._id);
      if (
        localStorage.getItem("package-type") &&
        localStorage.getItem("package-type").length > 0
      ) {
        props.history.push("/create-payment");
      } else {
        props.history.push("/new/welcome");
      }
    } else {
      console.log("error 3", res);
      res.data.response && typeof res.data.response.data === "string"
        ? setError(res.data.response.data)
        : setError("Unable to create account. Please try again.");
      setLoading(false);
    }
  };
  const onFinishFailed = (value) => {
    console.log("fnish failed", value);
  };
  return wizCompleted ? (
    <div className="signup-background">
      <button
        onClick={() => setWizCompleted(false)}
        className="font-paragraph-white"
        style={{
          color: "#fff",
          fontSize: "18px",
          backgroundColor: "var(--mirage)",
          padding: "10px ",
          float: "left",
          margin: "10px 0 0 50px",
          position: "absolute",
          top: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <ArrowLeftOutlined /> Back
      </button>
      <div className="signup-container">
        <h1 className="font-heading-white">{t("signup.join")}</h1>
        <p
          style={{
            color: "#00ffff",
            fontWeight: "400",
            fontSize: "1.8rem",
            padding: "10px",
            textAlign: "left",
          }}
        >
          We have developed the best challenge and weekley meal for you based on
          your enteries. After confirming your email will be find them in you
          dashboard.
        </p>
        <div className="signup-container-columns">
          <div
            className="signup-container-column1"
            style={{ textAlign: "left" }}
          >
            <p className="font-subheading-white" style={{ paddingTop: "12px" }}>
              {t("signup.social")}
            </p>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              // autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <button
                  class="loginBtn loginBtn--facebook"
                  style={{ width: "90%" }}
                  onClick={renderProps.onClick}
                >
                  Signup with facebook
                </button>
              )}
            />
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_APP_ID}
              render={(renderProps) => (
                <button
                  class="loginBtn loginBtn--google"
                  onClick={renderProps.onClick}
                  style={{ width: "90%" }}
                  disabled={renderProps.disabled}
                >
                  Signup with google
                </button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>
          <div className="signup-container-column2">
            <Form
              layout="vertical"
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div
                className="login-textfield-box"
                style={{ textAlign: "left" }}
              >
                <p className="font-subheading-white">
                  {t("signup.or_with_email")}
                </p>
                <Form.Item
                  label={<div className="font-paragraph-white">Username</div>}
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div
                className="login-textfield-box"
                style={{ textAlign: "left" }}
              >
                <Form.Item
                  label={<div className="font-paragraph-white">First Name</div>}
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div
                className="login-textfield-box"
                style={{ textAlign: "left" }}
              >
                <Form.Item
                  label={<div className="font-paragraph-white">Last Name</div>}
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your last name." },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div
                className="login-textfield-box"
                style={{ textAlign: "left" }}
              >
                <Form.Item
                  label={<div className="font-paragraph-white">Email</div>}
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please input correct email" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div
                className="login-textfield-box"
                style={{ textAlign: "left" }}
              >
                <Form.Item
                  label={<div className="font-paragraph-white">Password</div>}
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
              </div>
              <div
                className="login-textfield-box"
                style={{ textAlign: "left" }}
              >
                <Form.Item
                  name="confirm"
                  label={
                    <div className="font-paragraph-white">Confirm Password</div>
                  }
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <span
                  style={{ color: "#72777B" }}
                  className="font-paragraph-white"
                >
                  By clicking Create Account, you agree to our Terms of use and
                  its Cookie and Privecy Policy.
                </span>
              </div>
              {loading ? (
                <LoadingOutlined style={{ color: "#ff7700" }} />
              ) : (
                <button
                  className="create-payment-check-out poppins-medium-white-20px"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    marginTop: "2px",
                  }}
                  to="/challenges"
                  htmlType="submit"
                >
                  <span
                    className="font-paragraph-white"
                    style={{ textTransform: "uppercase", fontWeight: "600" }}
                  >
                    Create Account
                  </span>
                </button>
              )}
              <div
                className="font-paragraph-white"
                style={{ color: "#ff4d4f", margin: "10px 0" }}
              >
                {error}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Wizard setWizardCompleted={setWizardCompleted} />
  );
}

export default withRouter(Signup);
