import React from "react";
import "../assets/footer.css";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import FooterImage from "../images/real-challenge-w-1024x323.png";
import { useTranslation } from "react-i18next";

function Footer() {
  const [t] = useTranslation();
  return (
    <div className="footer">
      <div className="footer-row-1">
        <Link to="www.facebook.com" className="footer-row-1-links">
          <FacebookOutlined style={{ paddingRight: "10px" }} /> Facebook
        </Link>
        <Link to="www.instagram.com" className="footer-row-1-links">
          <InstagramOutlined style={{ paddingRight: "10px" }} /> Instagram
        </Link>
        <Link to="www.twitter.com" className="footer-row-1-links">
          <TwitterOutlined style={{ paddingRight: "10px" }} />
          Twitter
        </Link>
        <Link to="www.youtube.com" className="footer-row-1-links">
          <YoutubeOutlined style={{ paddingRight: "10px" }} />
          Youtube
        </Link>
      </div>
      <div className="footer-row-2">
        <div className="footer-row-2-column">
          <h3 className="footer-row-2-column-heading font-subheading-white">
            {t("footer.product")}
          </h3>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.challenge")}
          </Link>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.nutrient")}
          </Link>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.trainers")}
          </Link>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.join_now")}
          </Link>
        </div>
        <div className="footer-row-2-column">
          <h3 className="footer-row-2-column-heading font-subheading-white">
            {t("footer.company")}
          </h3>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.how_it_works")}
          </Link>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.pricing")}
          </Link>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.magazine")}
          </Link>
        </div>
        <div className="footer-row-2-column">
          <h3 className="footer-row-2-column-heading font-subheading-white">
            {t("footer.shop")}
          </h3>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.men")}
          </Link>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.women")}
          </Link>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.gear")}
          </Link>
          <Link to="" className="footer-row-2-column-link font-paragraph-white">
            {t("footer.sale")}
          </Link>
        </div>
        <div className="footer-row-2-column">
          <h3 className="footer-row-2-column-heading font-subheading-white">
            {t("footer.about")}
          </h3>
          <Link
            to="/help-center"
            className="footer-row-2-column-link font-paragraph-white"
          >
            {t("footer.help_center")}
          </Link>
          <Link
            to="/terms-condition"
            className="footer-row-2-column-link font-paragraph-white"
          >
            {t("footer.terms_and_condition")}
          </Link>
          <Link
            to="/privacy-policy"
            className="footer-row-2-column-link font-paragraph-white"
          >
            {t("footer.privacy_policy")}
          </Link>
          <Link
            to="/cookie-policy"
            className="footer-row-2-column-link font-paragraph-white"
          >
            {t("footer.cookie_policy")}
          </Link>
        </div>
      </div>
      <div className="footer-row-3">
        <img
          src={FooterImage}
          alt="footer-logo"
          className="footer-row-3-image"
        />
        <p className="footer-row-3-text">
          {" "}
          {t("footer.copyright")} &copy; <span>{new Date().getFullYear()}</span>
          ,{t("footer.all_rights_reserved")}
        </p>
      </div>
    </div>
  );
}

export default Footer;
