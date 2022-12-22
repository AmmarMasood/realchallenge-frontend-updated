import React, { useContext, useRef, useEffect, useState } from "react";
import "../../assets/video-player-design.css";
import "../../assets/player.css";
import ReactPlayer from "react-player";
import BreakTimer from "./BreakTimer";
import PlayerControls from "./PlayerControls";
import tune from "../../assets/music/break-start.wav";
import {
  breakContext,
  exerciseWorkoutTimeTrackContext,
  playerStateContext,
  timerVisibleContext,
} from "../../contexts/PlayerState";

var count = 0;

const playAudio = () => {
  new Audio(tune).play();
};
function RenderedVideoPlayer({
  exercise,
  musics,
  moveToNextExercise,
  moveToPrevExercise,
  nextExerciseTitle,
  completed,
  // for full screen player video browser
  workout,
  setExerciseForHelpModal,
  setOpenHelpModal,
  setCurrentExercise,
  currentExercise,
  challengePageAddress,
}) {
  const [timerVisible, setTimerVisible] = useContext(timerVisibleContext);
  const [playerState, setPlayerState] = useContext(playerStateContext);
  // const [currentBreak, setCurrentBreak] = useContext(breakContext);
  const [exerciseWorkoutTimeTrack, setExerciseWorkoutTimeTrack] = useContext(
    exerciseWorkoutTimeTrackContext
  );
  const [exerciseSeconds, setExerciseSeconds] = useState(-1);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const descriptionRef = useRef(null);
  //   const time = new Date();
  //   time.setSeconds(time.getSeconds() + 600);
  //   const {
  //     seconds,
  //     minutes,
  //     hours,
  //     days,
  //     isRunning,
  //     start,
  //     pause,
  //     resume,
  //     restart,
  //   } = useTimer({
  //     expiryTimestamp: time,
  //     onExpire: () => console.warn("onExpire called"),
  //   });

  useEffect(() => {
    const sumAllBreakTime =
      workout && workout.exercises.reduce((a, b) => a + (b["break"] || 0), 0);
    const sumAllExerciseDuration =
      workout &&
      workout.exercises.reduce(
        (a, b) => a + (parseInt(b["exerciseLength"]) || 0),
        0
      );
    console.log("sumAllBreakTime", workout + sumAllExerciseDuration);
    const d = sumAllExerciseDuration + sumAllBreakTime;
    setExerciseWorkoutTimeTrack((prev) => ({ ...prev, total: d }));
  }, [workout]);

  useEffect(() => {
    console.log("ammammrmar");
    // start();

    exercise.exerciseLength
      ? setExerciseSeconds(parseInt(exercise.exerciseLength))
      : setExerciseSeconds(Math.round(playerRef.current.getDuration()));
  }, [exercise]);

  useEffect(() => {
    if (exerciseSeconds === 0) {
      playAudio();
      if (workout.exercises[currentExercise.index + 1]) {
        console.log("IM CALLED");
        // this was how it was originall
        setPlayerState({ ...playerState, playing: false });
        // setTimerVisible(true);
        // these are new stuff
        // setPlayerState({ ...playerState, playing: false });
        // moveToNextExercise();
        // setTimerVisible(true);
      } else {
        moveToNextExercise();
        // setPlayerState({ ...playerState, playing: true });
      }
      return;
    }
  }, [exerciseSeconds]);

  const handleProgress = (changeState) => {
    if (count > 1) {
      controlsRef.current.style.visibility = "hidden";
      descriptionRef.current.style.visibility = "visible";
      count = 0;
    }
    if (controlsRef.current.style.visibility === "visible") {
      count += 1;
    }

    // setPlayerState({ ...playerState, progress: changeState });
    // seconds++;

    if (exerciseSeconds > 0 && playerState.playing && !playerState.loading) {
      setExerciseSeconds(exerciseSeconds - 1);
      setExerciseWorkoutTimeTrack((prev) => ({
        ...prev,
        current: prev.current + 1,
      }));
    }

    setPlayerState({ ...playerState, progress: changeState });
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    descriptionRef.current.style.visibility = "hidden";
    count = 0;
  };

  return (
    <div
      className="player-wrapper"
      style={{ position: "relative", border: "10px solid red" }}
      ref={playerContainerRef}
      onMouseMove={handleMouseMove}
    >
      <ReactPlayer
        ref={playerRef}
        className="react-player"
        onBuffer={() => {
          setPlayerState({ ...playerState, loading: true });
        }}
        onBufferEnd={() => {
          setPlayerState({ ...playerState, loading: false });
        }}
        playing={playerState.playing}
        muted={playerState.muted}
        loop={true}
        volume={playerState.volume}
        url={
          exercise.videoURL
            ? `${process.env.REACT_APP_SERVER}/uploads/${exercise.videoURL}`
            : ""
        }
        progress={playerState.progress}
        onProgress={handleProgress}
        // onEnded={() => {
        //   if (currentExercise.index === 0) {
        //     playAudio();
        //     if (workout.exercises[currentExercise.index + 1]) {
        //       // this was how it was originall
        //       setPlayerState({ ...playerState, playing: false });
        //       setTimerVisible(true);
        //       // these are new stuff
        //       // setPlayerState({ ...playerState, playing: false });
        //       // moveToNextExercise();
        //       // setTimerVisible(true);
        //     } else {
        //       moveToNextExercise();
        //       // setPlayerState({ ...playerState, playing: true });
        //     }
        //   }
        // }}
        width="100%"
        height="100%"
        controls={false}
      />
      <PlayerControls
        ref={controlsRef}
        descriptionRef={descriptionRef}
        playerRef={playerRef}
        exerciseTitle={exercise.title ? exercise.title : ""}
        exerciseLength={exercise.exerciseLength ? exercise.exerciseLength : ""}
        breakTime={exercise.break ? exercise.break : ""}
        playerContainerRef={playerContainerRef}
        musicList={musics}
        challengePageAddress={challengePageAddress}
        exerciseSeconds={exerciseSeconds}
        // for full screen player video browser
        workout={workout}
        setExerciseForHelpModal={setExerciseForHelpModal}
        setOpenHelpModal={setOpenHelpModal}
        setCurrentExercise={setCurrentExercise}
        currentExercise={currentExercise}
        moveToNextExercise={moveToNextExercise}
        moveToPrevExercise={moveToPrevExercise}
      />

      {timerVisible && (
        <BreakTimer
          moveToNextExercise={moveToNextExercise}
          nextExerciseTitle={nextExerciseTitle}
          exercise={workout.exercises[currentExercise.index]}
          timerVisible={timerVisible}
          setTimerVisible={setTimerVisible}
        />
      )}
      {/* music player */}

      <div></div>
    </div>
  );
}

export default RenderedVideoPlayer;
