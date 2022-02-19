import React, { useContext, useRef, useEffect } from "react";
import NonRenderedVideoPlayer from "./NonRenderedVideoPlayer";
import RenderedVideoPlayer from "./RenderedVideoPlayer";

var count = 0;

function Player({
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
  return workout.isRendered ? (
    <RenderedVideoPlayer
      exercise={exercise}
      musics={musics}
      moveToNextExercise={moveToNextExercise}
      moveToPrevExercise={moveToPrevExercise}
      nextExerciseTitle={nextExerciseTitle}
      completed={completed}
      // for full screen player video browser
      workout={workout}
      setExerciseForHelpModal={setExerciseForHelpModal}
      setOpenHelpModal={setOpenHelpModal}
      setCurrentExercise={setCurrentExercise}
      currentExercise={currentExercise}
      challengePageAddress={challengePageAddress}
    />
  ) : (
    <NonRenderedVideoPlayer
      exercise={exercise}
      musics={musics}
      moveToNextExercise={moveToNextExercise}
      moveToPrevExercise={moveToPrevExercise}
      nextExerciseTitle={nextExerciseTitle}
      completed={completed}
      // for full screen player video browser
      workout={workout}
      setExerciseForHelpModal={setExerciseForHelpModal}
      setOpenHelpModal={setOpenHelpModal}
      setCurrentExercise={setCurrentExercise}
      currentExercise={currentExercise}
      challengePageAddress={challengePageAddress}
    />
  );
}

export default Player;
