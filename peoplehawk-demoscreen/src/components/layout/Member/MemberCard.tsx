import styled from "styled-components";
import Tooltip from "../tooltip/Tooltip";
import personalityQuizCompleted from "../../../assests/img/personality_quiz-completed.svg";
import personalityQuizEmpty from "../../../assests/img/personality_quiz-empty.svg";
import gamesEmpty from "../../../assests/img/games_icon-empty.svg";
import gamesCompleted from "../../../assests/img/games_icon-completed.svg";
import videoCompleted from "../../../assests/img/video-completed.svg";
import videoEmpty from "../../../assests/img/video-empty.svg";
import cvOptimizedCompleted from "../../../assests/img/cv_optimiser-completed.svg";
import cvOptimizedEmpty from "../../../assests/img/cv_optimiser-empty.svg";
import cvGeneratedEmpty from "../../../assests/img/cv_genrated-empty.svg";
import cvGeneratedCompleted from "../../../assests/img/cv_genrated-completed.svg";
import documentCompleted from "../../../assests/img/document-completed.svg";
import documentEmpty from "../../../assests/img/document-empty.svg";
import profile from "../../../assests/img/profile_placeholder-3x.png";
import { Dispatch, FC } from "react";
import {
  ShortlistReducerProps,
  MemberAnalytics,
} from "../../../interface/Interface";
import { Action } from "../../../store/ShortlistReducer";
import StarIcon from "@mui/icons-material/Star";

const MemberCardTitle = styled.div({
  color: "#4D5767",
  fontSize: "18px",
  fontWeight: 600,
});

const MemberCardSubTitle = styled.div({
  color: "#4D5767",
  fontSize: "14px",
  fontWeight: 600,
});

const StarDiv = styled.div<StarProps>(({ isShortlisted }) => ({
  border: `1px solid ${isShortlisted ? "#0097A2" : "#D1DBE3"}`,
  backgroundColor: isShortlisted ? "#0097A2" : "#FFFFFF",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "42px",
  width: "42px",
  marginTop: "20px",
  cursor: "pointer",

  ".star-icon": {
    color: isShortlisted ? "#FFFFFF" : "#D1DBE3",
  },
}));

const MembarCard = styled.div<TransistionProps>(({ isVisible, delay }) => ({
  backgroundColor: "white",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  width: "400px",
  gap: "15px",
  height: "300px",
  padding: "20px",
  transform: `translateX(${isVisible ? "0" : "100vw"})`,
  transition: "transform 0.5s ease-in-out",
  transitionDelay: `${delay}ms`,
  boxShadow:
    "0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)",
  "&:hover": {
    transform: `translateX(${isVisible ? "0" : "100vw"}) scale(1.05)`,
    boxShadow:
      "0 .25rem .5rem rgba(0, 0, 0, .15), 0 .5rem .75rem rgba(0, 0, 0, .1)",
    cursor: "pointer",
  },
}));

const MemberMainCard = styled.div({
  display: "flex",
  gap: "40px",
});

const UpdatedDate = styled.div({
  display: "flex",
  justifyContent: "end",
});

const MemberImg = styled.img({
  height: "110px",
});

const MemberLeftCard = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
});

const CompletionCont = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const OwnedByDiv = styled.div({
  display: "flex",
  justifyContent: "end",
  alignItems: "end",
  height: "160px",
});

const CompletionCard = styled.div({
  display: "flex",
  gap: "5px",
});

const MemberRightCard = styled.div({
  display: "flex",
  flexDirection: "column",
});

const CompletionImg = styled.img({
  height: "24px",
});

const BorderBottom = styled.div({
  borderBottom: "1px solid #B4B4B4",
  marginTop: "10px",
  width: "250px",
});

interface StarProps {
  isShortlisted: boolean;
}

interface TransistionProps {
  isVisible: boolean;
  delay: number;
}

interface MemberCardProps {
  isVisible: boolean;
  index: number;
  isOn?: boolean;
  state: ShortlistReducerProps;
  dispatch: Dispatch<Action>;
  item: MemberAnalytics;
  onUser: (id: number) => void;
  onShortlistOpener: () => void;
}

const MemberCard: FC<MemberCardProps> = ({
  isVisible,
  index,
  isOn = false,
  state,
  dispatch,
  item,
  onUser,
  onShortlistOpener,
}) => {
  return (
    <MembarCard
      isVisible={isVisible}
      delay={index * 120}
      key={item.userId}
      onClick={() => {
        onUser(item.userId);
      }}
    >
      <Tooltip id={`personality-${index}`} place="right-start">
        {item.completion.isPersonalityQuizGiven
          ? "Completed Personality Test"
          : "Not Completed Personality Test"}
      </Tooltip>
      <Tooltip id={`games-${index}`} place="bottom">
        {item.completion.isGames
          ? "Completed Cognition Abilities"
          : "Not Completed Cognition Abilities"}
      </Tooltip>
      <Tooltip id={`photo-${index}`} place="bottom">
        {item.photoContent
          ? "Uploaded Profile Photo"
          : "Not Uploaded Profile Photo"}
      </Tooltip>
      <Tooltip id={`resume-${index}`} place="bottom">
        {item.completion.isCVUploaded
          ? "Uploaded Resume"
          : "Not Uploaded Resume"}
      </Tooltip>
      <Tooltip id={`compentency-${index}`} place="bottom">
        {item.completion.isCompentencyQuizGiven
          ? "Completed Compentency Quiz"
          : "Not Completed Compentency Quiz"}
      </Tooltip>
      <Tooltip id={`note-${index}`} place="bottom">
        {item.completion.isDocumentGiven ? "Added Notes" : "Not Added Notes"}
      </Tooltip>
      <UpdatedDate>Updated : 28 August 2024</UpdatedDate>
      <MemberMainCard>
        <MemberLeftCard>
          {isOn ? (
            <MemberImg src={profile} alt="profile" />
          ) : (
            <MemberImg
              src={
                item.photoContent
                  ? `data:image/jpeg;base64,${item.photoContent}`
                  : profile
              }
              alt="profile"
            />
          )}
          <CompletionCont>
            <CompletionCard>
              <CompletionImg
                data-tooltip-id={`personality-${index}`}
                src={
                  item.completion.isPersonalityQuizGiven
                    ? personalityQuizCompleted
                    : personalityQuizEmpty
                }
                alt="personality-quiz"
              />
              <CompletionImg
                data-tooltip-id={`games-${index}`}
                src={item.completion.isGames ? gamesCompleted : gamesEmpty}
                alt="games"
              />
              <CompletionImg
                data-tooltip-id={`photo-${index}`}
                src={item.photoContent ? videoCompleted : videoEmpty}
                alt="video"
              />
            </CompletionCard>
            <CompletionCard>
              <CompletionImg
                data-tooltip-id={`resume-${index}`}
                src={
                  item.completion.isCVUploaded
                    ? cvOptimizedCompleted
                    : cvOptimizedEmpty
                }
                alt="cv-optimizer"
              />
              <CompletionImg
                data-tooltip-id={`compentency-${index}`}
                src={
                  item.completion.isCompentencyQuizGiven
                    ? cvGeneratedCompleted
                    : cvGeneratedEmpty
                }
                alt="cv-generated"
              />
              <CompletionImg
                data-tooltip-id={`note-${index}`}
                src={
                  item.completion.isDocumentGiven
                    ? documentCompleted
                    : documentEmpty
                }
                alt="video"
              />
            </CompletionCard>
          </CompletionCont>
          <StarDiv
            isShortlisted={item.shortlist.length > 0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({ type: "POST_USERID", payload: item.userId });
              dispatch({
                type: "POST_USERLIST",
                payload: item.shortlist,
              });
              onShortlistOpener();
            }}
          >
            <StarIcon fontSize="small" className="star-icon" />
          </StarDiv>
        </MemberLeftCard>
        <MemberRightCard>
          <MemberCardTitle>
            {isOn ? `Member ${item.userId}` : item.firstName}
          </MemberCardTitle>
          <BorderBottom />
          <CompletionCont>
            <CompletionCard>
              <MemberCardSubTitle>Member Type:</MemberCardSubTitle>
              <div>{item.memberType}</div>
            </CompletionCard>
            <CompletionCard>
              <MemberCardSubTitle>Country:</MemberCardSubTitle>
              <div>{item.country && item.country.countryName}</div>
            </CompletionCard>

            <OwnedByDiv>
              <MemberCardSubTitle>ownedBy:</MemberCardSubTitle>
              <div>{item.owned_By}</div>
            </OwnedByDiv>
          </CompletionCont>
        </MemberRightCard>
      </MemberMainCard>
    </MembarCard>
  );
};

export default MemberCard;
