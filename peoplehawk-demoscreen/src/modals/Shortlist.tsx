import styled, { css, keyframes } from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { addShortlist, getShortlist } from "../services/ShortlistService";
import { Dispatch, useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { Action } from "../store/ShortlistReducer";
import {
  Shortlist as ShortlistProps,
  ShortlistReducerProps,
  UserShortlist,
} from "../interface/Interface";
import {
  addUserInShortlist,
  removeUserInShortlist,
} from "../services/ShortlistService";
import { Formik, Form, ErrorMessage } from "formik";
import Input from "../components/layout/form/Input";
import * as Yup from "yup";

interface ModalProps {
  onClose: () => void;
  state: ShortlistReducerProps;
  dispatch: Dispatch<Action>;
  onUserlist: (list: ShortlistProps[], userId: number) => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  animation: ${css`
    ${fadeIn} 0.3s ease-in-out
  `};
`;

const ModalContent = styled.div`
  background: #eef2f6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 480px;
  padding: 10px 20px 20px 20px;
  position: relative;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  animation: ${css`
    ${slideIn} 0.3s ease-in-out
  `};
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Title = styled.div`
  color: black;
  font-size: 20px;
  display: flex;
  font-weight: 900;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;

const ModalBody = styled.div`
  flex-direction: column;
  gap: 10px;
  background-color: #f7f9fc;
  height: 400px;
  padding: 10px;
`;

const ShortlistItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  line-height: 28px;
`;
const AddDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  gap: 3px;
  cursor: pointer;

  .add-icon {
    color: #009702;
  }

  .remove-icon {
    color: #f9c1be;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  gap: 3px;
  background: transparent;
  padding: 0px;
  color: black;

  .add-icon {
    color: #009702;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 10px;
  margin-bottom: 20px;

  div {
    width: 100%;
    .error {
      color: red;
    }
  }
`;

const ModalClose = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 30px;
`;

const ConfirmButton = styled.button({
  backgroundColor: "#0097A2",
  padding: "12px 26px",
  fontSize: "15px",
  fontWeight: 700,
  borderRadius: "0px",

  "&:hover": {
    backgroundColor: "#00B0BA",
  },
});

const CancelButton = styled.button({
  backgroundColor: "#eef2f6",
  padding: "12px 26px",
  fontSize: "15px",
  color: "#0097A2",
  border: "1px solid #eef2f6",
  borderRadius: "0px",
  fontWeight: 700,

  "&:hover": {
    border: "1px solid #0097A2",
  },
});

const Shortlist: React.FC<ModalProps> = ({
  onClose,
  state,
  dispatch,
  onUserlist,
}) => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getShortlist();
    response && dispatch({ type: "POST_SHORTLIST", payload: response });
  };

  const isInShortlist = (item: ShortlistProps) =>
    state.userList.some((subItem) => subItem.id === item.id);

  const addUser = async (data: UserShortlist) => {
    const response = await addUserInShortlist(data);
    response &&
      dispatch({
        type: "ADD_IN_USERLIST",
        payload: { id: response.id, name: response.name },
      });
    response &&
      onUserlist(
        [...state.userList, { id: response.id, name: response.name }],
        state.userId
      );
  };

  const removeUser = async (userId: number, shortlistId: number) => {
    const response = await removeUserInShortlist(userId, shortlistId);
    response && dispatch({ type: "DELETE_IN_USERLIST", payload: shortlistId });
    response &&
      onUserlist(
        state.userList.filter((item) => item.id != shortlistId),
        state.userId
      );
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("please enter shortlist name"),
  });

  const [isNewShortlist, setIsNewShortlist] = useState<boolean>(false);
  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalClose onClick={onClose}>
            <HighlightOffOutlinedIcon fontSize="large" />
          </ModalClose>
          <Title>
            Add to Shortlist :
            {!isNewShortlist && (
              <ConfirmButton
                onClick={() => {
                  setIsNewShortlist(true);
                }}
              >
                NEW SHORTLIST
              </ConfirmButton>
            )}
          </Title>
          {isNewShortlist && (
            <Formik
              validationSchema={validationSchema}
              initialValues={{ title: "" }}
              onSubmit={async (values) => {
                const response = await addShortlist({
                  id: 0,
                  name: values.title,
                  userId: state.userId,
                });
                response &&
                  dispatch({ type: "ADD_IN_SHORTLIST", payload: response });
                response && (await addUser(response));
                setIsNewShortlist(false);
              }}
            >
              {({ setFieldValue, errors, touched }) => (
                <Form>
                  <FlexDiv>
                    <div>
                      <Input
                        placeholder="Create a Shortlist"
                        name="title"
                        error={Boolean(errors.title && touched.title)}
                        onChange={(e) => setFieldValue("title", e.target.value)}
                      />
                      <ErrorMessage
                        name="title"
                        className="error"
                        component="div"
                      />
                    </div>
                    <AddButton type="submit">
                      Add
                      <AddCircleOutlineIcon className="add-icon" />
                    </AddButton>
                  </FlexDiv>
                </Form>
              )}
            </Formik>
          )}
        </ModalHeader>
        <ModalBody>
          {state.list &&
            state.list.map((item, index) => (
              <ShortlistItem key={index}>
                {item.name}
                {isInShortlist(item) ? (
                  <AddDiv
                    onClick={() => {
                      removeUser(state.userId, item.id);
                    }}
                  >
                    Remove
                    <RemoveCircleOutlineRoundedIcon className="remove-icon" />
                  </AddDiv>
                ) : (
                  <AddDiv
                    onClick={() => {
                      addUser({
                        id: item.id,
                        name: item.name,
                        userId: state.userId,
                      });
                    }}
                  >
                    Add
                    <AddCircleOutlineIcon className="add-icon" />
                  </AddDiv>
                )}
              </ShortlistItem>
            ))}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Shortlist;
