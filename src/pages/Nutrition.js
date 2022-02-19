import React, { useState, useEffect } from "react";
import "../assets/home.css";
import "../assets/trainers.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";
import "../assets/nutrition.css";
import SearchNutrition from "../components/Nutrition/SearchNutrition";
import { useTranslation } from "react-i18next";
import {
  getAllDietTypes,
  getAllIngredients,
  getAllMealTypes,
  getAllRecipes,
} from "../services/recipes";

function Nutrition() {
  const [t] = useTranslation();
  const [recipes, setRecipes] = useState([]);
  const [allMealTypes, setAllMealTypes] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [allDiets, setAllDiets] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAllRecipes(localStorage.getItem("locale"));
    const allMealT = await getAllMealTypes();
    const allIngre = await getAllIngredients();
    const allDiet = await getAllDietTypes();
    console.log(allMealT);
    console.log(allIngre);
    console.log(allDiet);
    if (res.recipes) {
      setRecipes(res.recipes);
      console.log("first recipe", res.recipes);
    }
    if (allMealT.mealTypes) {
      setAllMealTypes(allMealT.mealTypes);
    }
    if (allIngre.ingredients) {
      setAllIngredients(allIngre.ingredients);
    }
    if (allDiet.diets) {
      setAllDiets(allDiet.diets);
    }
  };

  return (
    <div>
      <Navbar />
      {/* <Hero /> */}
      <div className="page-header nutrition-header background-nutrition">
        <div className="page-header-textbox">
          <h1 className="font-heading-white">{t("nutrition.skill")}</h1>
          <p style={{ width: "50vw" }} className="font-paragraph-white">
            {t("nutrition.select")}
          </p>
        </div>
      </div>
      <div>
        {console.log("recipes", recipes)}
        <SearchNutrition
          allRecipies={recipes}
          allDiets={allDiets}
          allIngredients={allIngredients}
          allMealTypes={allMealTypes}
        />
      </div>
      {/* 3nd row */}
      <div style={{ backgroundColor: "#222932" }}>
        <div className="nutrition-3-row">
          <h1
            style={{ fontSize: "5rem", color: "#fff" }}
            className="font-heading-white"
          >
            {t("nutrition.let_us")}
          </h1>
          <p className="font-paragraph-white">{t("nutrition.your_personal")}</p>
        </div>
      </div>
      {/* 4th row */}
      <div className="home-row-7 background-nutrition">
        <div className="home-row-7-container" style={{ padding: "50px" }}>
          <div className="home-row-7-container-text">
            {/* <h2 style={{ fontSize: "2rem" }}>Need more inspiration?</h2> */}
            <h1 style={{ fontSize: "4.5rem" }} className="font-heading-black">
              {t("nutrition.1_week")}
            </h1>
            <p
              style={{ fontSize: "1.8rem", paddingBottom: "10px" }}
              className="font-paragraph-black"
            >
              {t("nutrition.start_now")}
            </p>
            <div className="home-row-2-col-2-box">
              <CheckOutlined
                style={{
                  color: "#ff7700",
                  fontSize: "2.5rem",
                  paddingRight: "0.5rem",
                }}
              />
              <span className="home-text font-paragraph-black">
                {t("nutrition.nutrition_plan")}
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
              <span className="home-text font-paragraph-black">
                {t("nutrition.no_calories")}
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
              <span className="home-text font-paragraph-black">
                {t("nutrition.choose")}
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
              <span className="home-text font-paragraph-black">
                {t("nutrition.keep")}
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
              <span className="home-text font-paragraph-black">
                {t("nutrition.change_goal")}
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
              <span className="home-text font-paragraph-black">
                {t("nutrition.swap")}
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
              <span className="home-text font-paragraph-black">
                {t("nutrition.weekly")}
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
              <span className="home-text font-paragraph-black">
                {t("nutrition.order_online")}
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
              <span className="home-text font-paragraph-black">
                {t("nutrition.add_fav")}
              </span>
            </div>

            <Link
              className="home-button"
              to="/new"
              style={{ marginTop: "20px" }}
            >
              <span className="home-button-text font-paragraph-white">
                {t("nutrition.start_7")} <ArrowRightOutlined />
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* 7th row */}
      {/* 8th row */}

      {/* 4th row */}

      <Footer />
    </div>
  );
}

export default Nutrition;
