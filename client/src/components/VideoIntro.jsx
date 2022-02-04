import React from "react";
import ReactPlayer from "react-player";
export const VideoIntro = () => {
  return (
    <>
      <ReactPlayer
        style={{ border: "solid 6px blue", borderRadius: "10px" }}
        width="70%"
        height="90%"
        controls
        url="https://www.youtube.com/watch?v=DEDjF2tLbhk"
      />
    </>
  );
};
