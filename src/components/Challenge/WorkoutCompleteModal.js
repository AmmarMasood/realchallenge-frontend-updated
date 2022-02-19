import React from "react";
import { SmileOutlined, FireOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import useWindowDimensions from "../../helpers/useWindowDimensions";


function WorkoutCompleteModal({
  finishWorkoutPopupVisible,
  setFinishWorkoutPopupVisible,
  challengeId,
  challengeSlug,
  history,
  t,
}) {
  const {width} = useWindowDimensions()
  return (
    <Modal
      visible={finishWorkoutPopupVisible}
      onCancel={(e) => setFinishWorkoutPopupVisible(false)}
      footer={false}
      className="finish-workout-popup-container"
      width={width <= 600 ? "100%" : "50%"}
      bodyStyle={{
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 10.94%,  rgba(5, 8, 13, 0.78) 100%)",
      }}
    >
      <FireOutlined
        style={{ color: "var(--color-orange)", fontSize: "60px" }}
      />
      {console.log(width)}
      <h1 className="font-heading-white">{t("player.well")}</h1>
      <p className="font-subheading-white">{t("player.congrats")} </p>
      <p className="font-paragraph-white">{t("player.pls_let")}</p>
      <div className="finish-workout-popup-container--reviewbox">
        <div onClick={() => history.push(`/challenge/${challengeSlug}/${challengeId}`)}>
            <SmileOutlined style={{ fontSize: "30px" }} />
          <span className="font-paragraph-black">{t("player.great_exp")}</span>
        </div>
        <div onClick={() => history.push(`/challenge/${challengeSlug}/${challengeId}`)}>
            <SmileOutlined style={{ fontSize: "30px" }} />
          <span className="font-paragraph-black">{t("player.avg_stuff")}</span>
        </div>
        <div onClick={() => history.push(`/challenge/${challengeSlug}/${challengeId}`)}>
            <SmileOutlined style={{ fontSize: "30px" }} />
          <span className="font-paragraph-black">{t("player.very_diff")}</span>
        </div>
      </div>
    </Modal>
  );
}

export default WorkoutCompleteModal;
