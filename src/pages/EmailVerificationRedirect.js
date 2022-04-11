import React, { useEffect, useState } from "react";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { verifyEmail } from "../services/authentication";
import { useTranslation } from "react-i18next";

// todo
// add loading icon that says loading while you send a request to backend with the token from the params. once done redirect to login page.
function EmailVerificationRedirect(props) {
  const [t] = useTranslation();
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    verifyEmailSendToken();
  }, []);

  const verifyEmailSendToken = async () => {
    const token = props.match.params.token;
    const res = await verifyEmail(token);

    if (res.success) {
      if (localStorage.getItem("userRecentlySignedUp")) {
        setSuccess(true);
      } else {
        props.history.push("/login");
      }
    }
    console.log("res", res);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <>
        {success ? (
          <CheckCircleOutlined
            style={{
              color: "#ff7700",
              fontSize: "120px",
              marginBottom: "20px",
            }}
          />
        ) : (
          <LoadingOutlined
            style={{
              color: "#ff7700",
              fontSize: "120px",
              marginBottom: "20px",
            }}
          />
        )}
        <h1
          className="font-heading-black"
          style={{ margin: "0", padding: "0" }}
        >
          {success
            ? t("emailVerification.esv")
            : t("emailVerification.challenge_profile.yourPersonalJourney")}
        </h1>
      </>
    </div>
  );
}

export default withRouter(EmailVerificationRedirect);
