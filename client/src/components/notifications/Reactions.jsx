import React, { useState } from "react";
import like from "../../assets/Icons/like.png";
import love from "../../assets/Icons/love.png";
import great from "../../assets/Icons/great.png";
import { Box } from "@mui/system";
import { IconButton, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { requestWithData } from "../../utils/api";

const ReactButton = styled(IconButton)((theme) => ({
  //   "&:hover": {
  //     img: {
  //       transform: "scale(1.5)",
  //     },
  //   },
}));
const reactionOptions = [
  { img: like, type: 1 },
  { img: love, type: 2 },
  { img: great, type: 3 },
];

const Reactions = ({ info, user }) => {
  const { IdNotification, FcmToken, Like, Loved, Star, Reaction } = info;
  const userData = useSelector((store) => store.loginUser.userData);
  const [myReaction, setMyReaction] = useState(Reaction);
  const [addReaction, setAddReaction] = useState({
    addLike: Like,
    addLove: Loved,
    addStar: Star,
  });

  const { Nombre } = userData;

  const handleReaction = async (typeReaction) => {
    const reaction = await requestWithData("postsendreaction", {
      userName: Nombre,
      typeReaction,
      idNotification: IdNotification,
      fcmToken: FcmToken,
    });
    if (reaction.data[0].Reaction >= 1) {
      //setMyReaction(reaction.data[0].Reaction);
      if (typeReaction === 1) {
        if (myReaction === 2) {
          setMyReaction(1);
          setAddReaction({
            ...addReaction,
            addLike: addReaction.addLike + 1,
            addLove: addReaction.addLove - 1,
          });
        } else if (myReaction === 3) {
          setMyReaction(1);
          setAddReaction({
            ...addReaction,
            addLike: addReaction.addLike + 1,
            addStar: addReaction.addStar - 1,
          });
        } else if (myReaction === 0) {
          setMyReaction(1);
          setAddReaction({
            ...addReaction,
            addLike: addReaction.addLike + 1,
          });
        }
      } else if (typeReaction === 2) {
        if (myReaction === 1) {
          setMyReaction(2);
          setAddReaction({
            ...addReaction,
            addLike: addReaction.addLike - 1,
            addLove: addReaction.addLove + 1,
          });
        } else if (myReaction === 3) {
          setMyReaction(2);
          setAddReaction({
            ...addReaction,
            addLove: addReaction.addLove + 1,
            addStar: addReaction.addStar - 1,
          });
        } else if (myReaction === 0) {
          setMyReaction(2);
          setAddReaction({
            ...addReaction,
            addLove: addReaction.addLove + 1,
          });
        }
      } else {
        if (myReaction === 1) {
          setMyReaction(3);
          setAddReaction({
            ...addReaction,
            addLike: addReaction.addLike - 1,
            addStar: addReaction.addStar + 1,
          });
        } else if (myReaction === 2) {
          setMyReaction(3);
          setAddReaction({
            ...addReaction,
            addLove: addReaction.addLove - 1,
            addStar: addReaction.addStar + 1,
          });
        } else if (myReaction === 0) {
          setMyReaction(3);
          setAddReaction({
            ...addReaction,
            addStar: addReaction.addStar + 1,
          });
        }
      }
    }
  };

  return (
    <Box width="100%" display="flex" flex="row">
      {reactionOptions.map((option) => (
        <Box key={option.type}>
          <ReactButton
            onClick={() => handleReaction(option.type)}
            disabled={myReaction === option.type || user ? true : false}
          >
            <img
              className={myReaction === option.type ? "reaction" : `reactImage`}
              src={option.img}
              alt="like"
              height={18}
            />{" "}
          </ReactButton>
          <Typography variant="caption" color="#3047b0">
            {option.type === 1 && addReaction.addLike}
            {option.type === 2 && addReaction.addLove}
            {option.type === 3 && addReaction.addStar}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Reactions;
