import React, { useEffect, useContext } from "react";
import Countdown from "react-countdown";
import { Progress } from "antd";
import tune from "../../assets/music/break-end.wav";
import {
  breakContext,
  playerStateContext,
  timerVisibleContext,
} from "../../contexts/PlayerState";

function BreakTimer({
  exercise,
  nextExerciseTitle,
  moveToNextExercise,
  // playPauseVideo,
}) {
  const [currentBreak, setCurrentBreak] = useContext(breakContext);
  const [playerState, setPlayerState] = useContext(playerStateContext);
  const [timerVisible, setTimerVisible] = useContext(timerVisibleContext);
  useEffect(() => {
    if (exercise.break) {
    } else {
      moveToNextExercise();
      setTimerVisible(false);
      setCurrentBreak(false);
    }
  }, []);
  const playAudio = () => {
    new Audio(tune).play();
  };

  const CountdownDisplay = ({ hours, minutes, seconds, total }) => {
    const totalSeconds = total / 1000;
    const givenSeconds = (exercise.break * 1000) / 1000;
    const progress = ((givenSeconds - totalSeconds) / givenSeconds) * 100;
    return (
      <div className="inner-layout-break">
        <div style={{ width: "30%", textAlign: "center" }}>
          <span style={{ marginTop: "10px" }}>
            <span className="inner-layout-break-totalsecs">{totalSeconds}</span>
            <span className="inner-layout-break-sec">Sec</span>
          </span>
          <Progress percent={progress} showInfo={false} />
        </div>
        <div className="inner-layout-break-text">
          {nextExerciseTitle ? (
            <>
              <span>
                {exercise.exerciseGroupName === "Introduction"
                  ? "First Exercise"
                  : "Next Exercise"}
              </span>{" "}
              <span>{nextExerciseTitle}</span>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="break-layout-for-player">
      <Countdown
        date={Date.now() + exercise.break * 1000}
        renderer={CountdownDisplay}
        onMount={() => {
          moveToNextExercise();
          setPlayerState({ ...playerState, playing: false });
          setCurrentBreak(true);
          console.log("break mounted");
        }}
        onTick={(e) => {
          if (e.seconds === 3) {
            playAudio();
          }
          console.log("tick tick tick mf", e);
        }}
        onComplete={(e) => {
          console.log("timer completed");
          setTimerVisible(false);
          setCurrentBreak(false);
          // moveToNextExercise();
          setPlayerState({ ...playerState, playing: true });
          console.log("break ended");
          // startVideoPlayer();
        }}
      />
    </div>
  );
}

export default React.memo(BreakTimer);
