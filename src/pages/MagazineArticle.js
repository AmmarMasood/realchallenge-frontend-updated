import React, { useState, useEffect } from "react";
import "../assets/magazineArticle.css";
import "../assets/trainerprofile.css";
import "../assets/home.css";
import "../assets/challengeProfile.css";
import "../assets/recipeProfile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Avatar } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { getBlogById } from "../services/blogs";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  PinterestIcon,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
} from "react-share";
import slug from "elegant-slug";
import { Helmet } from "react-helmet";
import ReactHtmlParser from "react-html-parser";

function MagazineArticle(props) {
  const [t] = useTranslation();
  const [blogInfo, setBlogInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    setLoading(true);
    const id = props.match.params.id;
    const res = await getBlogById(id);
    if (res) {
      const d = res.data.blog;
      setBlogInfo(d);
    }
    console.log("res", res);
    setLoading(false);
  };

  // eslint-disable-next-line
  const [article, setArticle] = useState({
    writerInfo: {
      name: "Filip",
      facebookLink: "www.facebook.com",
      twitter: "www.twitter.com",
      linkedin: "www.linkedin.com",
      pinterest: "",
    },
    coverPhoto:
      "https://realchallenge.fit/wp-content/uploads/2018/12/karl-s-1060222-unsplash-1024x681.jpg",
    writeAvatar: "",
    articleName: "Four Mistakes People Make when Choosing a Trainer",
    articleSubheading:
      "A training method to enhance neuromuscular efficiency and improve maximum strength.",
    articleCategory: "TRAINING",
    articleDate: new Date(),
    videoLink: "https://www.youtube.com/watch?v=Pwz4kQrW4g4",
    articleText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id metus vel est pulvinar suscipit in id ligula. Phasellus porta urna eu risus pulvinar sodales. Morbi finibus mauris dolor, sed pulvinar leo gravida nec. Phasellus a sodales nisi. Vivamus vehicula euismod porta. Curabitur id diam fermentum, placerat massa vitae, consequat diam. Proin dapibus at sem at mollis. Praesent malesuada neque vitae tincidunt laoreet. Duis quis accumsan magna. Aenean diam nisl, pellentesque ut est vitae, suscipit varius velit. Sed consectetur dolor et neque accumsan fringilla.Integer id odio a ligula imperdiet facilisis sit amet id nisi. Ut laoreet, libero sit amet rhoncus accumsan, quam nisl sollicitudin metus, ac tristique odio lacus eu nulla. Curabitur ac vehicula erat. Morbi metus neque, auctor rutrum erat nec, ultrices tristique dui. Nulla sit amet erat vitae nulla mattis tincidunt. Cras quis pharetra dui, eu convallis eros. Cras eu viverra justo, at molestie felis. Aliquam erat volutpat. Sed tellus nunc, tempus vel est non, ultricies efficitur erat. Duis turpis lacus, tristique et tellus sed, interdum gravida leo. Sed maximus ante nibh, id hendrerit ligula ornare id. Quisque tincidunt enim magna, quis condimentum arcu cursus nec. Suspendisse eu diam nec augue efficitur tincidunt id quis lectus. Maecenas vestibulum magna sed mi porta, ut mollis neque dictum. Duis molestie, lacus eget consequat scelerisque, mauris leo feugiat ligula, eu mollis velit lorem ac est. Duis venenatis sagittis magna, vitae volutpat risus eleifend eget. In quam elit, ullamcorper eget quam quis, tincidunt fermentum ante. Donec nec augue tortor. Quisque sodales viverra orci sed bibendum. Mauris interdum ante eget odio scelerisque pharetra. Duis arcu purus, ullamcorper vitae risus eget, viverra facilisis orci. Praesent non auctor dolor, in porttitor eros. Pellentesque tempus justo tellus, in laoreet nisi faucibus eu. Ut sit amet commodo elit. Quisque bibendum porta dui, vitae suscipit magna rhoncus mattis. Integer ultrices sollicitudin varius. Vivamus a interdum libero.",
    comments: [
      {
        id: 13123,
        username: "Ammarms",
        comment: "Amazing work",
        date: new Date(),
      },
      {
        id: 13123,
        username: "don",
        comment:
          "Quisque sodales viverra orci sed bibendum. Mauris interdum ante eget odio scelerisque pharetra. Duis arcu purus, ullamcorper vitae risus eget, viverra facilisis orci. Praesent non auctor dolor, in porttitor eros",
        date: new Date(),
      },
    ],
  });
  return loading ? (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <LoadingOutlined
        style={{
          color: "#ff7700",
          fontSize: "65px",
        }}
      />
    </div>
  ) : (
    <div>
      <Helmet>
        <title>{`Realchallenge: ${blogInfo.title}`}</title>
        <meta name="description" content={blogInfo.paragraph} />
        <meta property="og:title" content={blogInfo.title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={blogInfo.paragraph} />
        <meta
          property="og:url"
          content={`http://localhost:3001/magazine/${slug(blogInfo.title)}/${
            blogInfo._id
          }`}
        />
        <meta name="author" content="Realchallenge" />
      </Helmet>
      <Navbar />
      {console.log(
        `${process.env.REACT_APP_SERVER}/api${
          blogInfo ? blogInfo.featuredImage : ""
        }`
      )}
      <div
        className="magazine-article-head"
        style={{
          background: `url(${process.env.REACT_APP_SERVER}/api${
            blogInfo ? blogInfo.featuredImage : ""
          }) no-repeat center center / cover`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="article-container">
        <div className="article-container-column1">
          <div className="article-container-column1-row1 font-paragraph-black">
            <Avatar
              shape="square"
              size="large"
              icon={<UserOutlined />}
              src={`${process.env.REACT_APP_SERVER}/api${
                blogInfo && blogInfo.user ? blogInfo.user.avatarLink : ""
              }`}
            />{" "}
            {blogInfo && blogInfo.user ? blogInfo.user.username : ""}
          </div>
          <div
            className="article-container-column1-row1 font-paragraph-black"
            style={{ color: "var(--color-orange)", padding: "15px 0" }}
          >
            {t("magazine.share")}

            <div>
              <FacebookShareButton
                url={window.location.href}
                quote="Hi. Please checkout this amazing article I found at realchallenge.fit"
              >
                <FacebookIcon
                  size={32}
                  round={true}
                  style={{ marginRight: "10px" }}
                />
              </FacebookShareButton>
              <LinkedinShareButton
                url={window.location.href}
                title="Awesome article at Realchallenge.fit"
                summary="Hi. Please checkout this amazing article I found at realchallenge.fit"
              >
                <LinkedinIcon
                  size={32}
                  round={true}
                  style={{ marginRight: "10px" }}
                />
              </LinkedinShareButton>
              <TwitterShareButton
                url={window.location.href}
                title="Check out this amazing article I found at Realchallenge.fit"
              >
                <TwitterIcon
                  size={32}
                  round={true}
                  style={{ marginRight: "10px" }}
                />
              </TwitterShareButton>
              <PinterestShareButton
                url={window.location.href}
                media={`${process.env.REACT_APP_SERVER}/api${blogInfo.featuredImage}`}
                description="Hi. Please checkout this amazing article I found at realchallenge.fit"
              >
                <PinterestIcon
                  size={32}
                  round={true}
                  style={{ marginRight: "10px" }}
                />
              </PinterestShareButton>
            </div>
          </div>
        </div>
        <div className="article-container-column2">
          <h1 className="article-container-column2-heading font-heading-black">
            {blogInfo.title}
          </h1>
          <div>
            <span
              style={{
                color: "var(--color-orange)",
                marginRight: "20px",
                fontSize: "1.6rem",
              }}
            >
              {blogInfo && blogInfo.category ? blogInfo.category.name : ""}
            </span>
            <span style={{ fontSize: "1.6rem" }}>
              {moment(article.articleDate).format("LL")}
            </span>
            {/* {console.log(article.articleDate)} */}
          </div>
          {/* <h1 className="font-subheading-black">{article.articleSubheading}</h1> */}
          <a href={blogInfo.videoLink} style={{ color: "var(--color-orange)" }}>
            Video Link To This Article
          </a>
          <p className="font-paragraph-black" style={{ fontSize: "1.8rem" }}>
            {ReactHtmlParser(blogInfo?.paragraph)}
          </p>
          <div
            className="recipe-mealValues-heading font-paragraph-white"
            style={{ fontSize: "1.8rem", padding: "10px 0" }}
          >
            {t("magazine.comments")}
          </div>
          <div
            className="trainer-profile-goals-container"
            style={{ backgroundColor: "#e1e9f2" }}
          >
            {article.comments.map((comment) => (
              <div
                className="challenge-profile-comment font-paragraph-white"
                style={{ backgroundColor: "transparent" }}
              >
                <span
                  className="challenge-profile-comment-username"
                  style={{ paddingBottom: "0" }}
                >
                  <UserOutlined /> {comment.username}
                </span>
                <span
                  className="font-paragraph-black"
                  style={{ fontSize: "1.4rem" }}
                >
                  {moment(comment.date).format("DD/MM/YYYY")}
                </span>
                <span style={{ color: "black" }}>{comment.comment}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(MagazineArticle);
