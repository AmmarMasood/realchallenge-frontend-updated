import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Input, Tag, Card } from "antd";

import "../assets/helpcenter.css";
import { useTranslation } from "react-i18next";
import { getAllFaqCategories, getAllFaqs } from "../services/faqs";
import { includes } from "lodash";
const { CheckableTag } = Tag;

function HelpCenter() {
  const [t] = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestion, setFilteredQuestions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const nC =
      selectedCategory.length > 0
        ? questions.filter((q) =>
            q.category.some((item) => selectedCategory.includes(item))
          )
        : questions;
    setFilteredQuestions(nC);
    console.log("ddddddddddddddddddddddddddddddddd", nC);
  }, [selectedCategory, questions]);

  const fetchData = async () => {
    const f = await getAllFaqs();
    const c = await getAllFaqCategories();

    if (c) {
      setAllCategories(c.categories);
    }
    if (f) {
      console.log(f.faqs);
      setQuestions(f.faqs);
      setFilteredQuestions(f.faqs);
    }
    // console.log(f, c);
  };
  const onChange = (e) => {
    console.log(e);
  };

  const handleCategory = (tag, checked) => {
    console.log(tag, checked);
    const nextSelectedTags = checked
      ? [...selectedCategory, tag._id]
      : selectedCategory.filter((t) => t !== tag._id);
    setSelectedCategory(nextSelectedTags);
  };
  return (
    <>
      <Navbar />
      <div className="helpcenter-container">
        <div className="helpcenter-top">
          <div className="helpcenter-top-con">
            <h1 className="font-heading-white">{t("helpcenter.howcan")}</h1>
            <Input
              placeholder="Type keyword"
              className="font-paragraph-white"
              style={{
                padding: "15px",
              }}
              width="100%"
              allowClear
              onChange={onChange}
            />
            <div style={{ marginTop: "20px" }}>
              <h3 className="font-paragraph-white">{t("helpcenter.sc")}</h3>
              <div style={{ paddingTop: "10px" }}>
                {allCategories.map((tag) => (
                  <CheckableTag
                    style={{ color: "white", fontSize: "14px" }}
                    key={tag._id}
                    checked={selectedCategory.includes(tag._id)}
                    onChange={(checked) => handleCategory(tag, checked)}
                  >
                    {tag.name}
                  </CheckableTag>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="helpcenter-questions-container">
          {filteredQuestion.map((q) => (
            <Card className="helpcenter-questions-container-card" key={q._id}>
              <h1 className="font-subheading-black">{q.question}</h1>
              <p className="font-paragraph-black" style={{ fontSize: "15px" }}>
                {q.answer}
              </p>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HelpCenter;
