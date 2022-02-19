import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FileViewer from "react-file-viewer";
import PrivacyPolicyDocument from "../assets/documents/Cookie Policy - Real Challenge.docx";
import PrivacyPolicyDocumentDutch from "../assets/documents/Cookiebeleid - Real Challenge.docx";
import { languageContext } from "../contexts/LanguageContext";

const bodyStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  height: "115vh",
  paddingTop: "50px",
  backgroundColor: "#e1e9f2",
};

const type = "docx";

const onError = (e) => {
  console.log(e, "error in file-viewer");
};
function CookiePolicy() {
  const [t] = useTranslation();
  const [language, setLangauge] = useContext(languageContext);

  return (
    <>
      <Navbar color="dark" />
      <div style={bodyStyle}>
        <h1 className="font-heading-black privacy-policy-heading">
          {localStorage.getItem("locale") == "du"
            ? "Cookiebeleid - Real Challenge"
            : t("cookiepolicy.heading")}
        </h1>

        <Card style={{ height: "650px" }}>
          {localStorage.getItem("locale") === "du" ? (
            <FileViewer
              fileType={type}
              filePath={PrivacyPolicyDocumentDutch}
              // errorComponent={CustomErrorComponent}
              onError={onError}
            />
          ) : (
            <FileViewer
              fileType={type}
              filePath={PrivacyPolicyDocument}
              // errorComponent={CustomErrorComponent}
              onError={onError}
            />
          )}
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default CookiePolicy;
