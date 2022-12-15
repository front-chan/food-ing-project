import styled, { css } from "styled-components";

const Button = (props) => {
  const {
    onClick,
    children,
    borderColor,
    add,
    back,
    view,
    post,
    recipedel,
    recipefix,
    recipeback,
    addComment,
    commentdel,
    home,
  } = props;
  return (
    <StButton
      home={home}
      add={add}
      back={back}
      view={view}
      post={post}
      recipedel={recipedel}
      recipefix={recipefix}
      recipeback={recipeback}
      borderColor={borderColor}
      addComment={addComment}
      commentdel={commentdel}
      onClick={onClick}
    >
      {children}
    </StButton>
  );
};

const StButton = styled.button`
  cursor: pointer;
  ${(props) =>
    props.home &&
    css`
      padding: 10px 30px;
      font-size: 20px;
      border-radius: 20px;
      background-color: #7ec1e0;
      border: 0;
      color: black;
      font-weight: bold;
      transition: background-color 0.3s;
      &:hover {
        background-color: #d3e2e9;
        box-shadow: 1px 1px 4px 0px gray;
      }
    `}
  ${(props) =>
    props.add &&
    css`
      background-color: #4ea1ba;
      width: 180px;
      height: 40px;
      border-radius: 10px;
      border: 0;
      font-size: 20px;
      margin: 20px;
      margin-top: 30px;
      transition: background-color 0.2s;
      &:hover {
        background-color: #89c9dd;
      }
    `}
  ${(props) =>
    props.back &&
    css`
      width: 180px;
      height: 40px;
      border-radius: 10px;
      border: 0;
      font-size: 20px;
      margin: 20px;
      margin-top: 30px;
      background-color: #b9c6cb;
      transition: background-color 0.2s;
      &:hover {
        background-color: #d9e1e4;
      }
    `}
  ${(props) =>
    props.view &&
    css`
      padding: 10px;
      background-color: transparent;
      border: none;
      transition: 0.2s;
      /* margin-bottom: 0.5rem; */
      border-radius: 30px;
      margin-bottom: 15px;
      &:hover {
        background: rgba(14, 15, 16, 0.1);
        transform: scale();
      }
      font-weight: bold;
      color: #056683;
    `}
    ${(props) =>
    props.post &&
    css`
      width: 100px;
      height: 30px;
      background-color: #056683;
      color: white;
      border: 0px;
      border-radius: 30px;
      box-shadow: 0 2px 5px rgba(42, 52, 75, 0.658);
      font-weight: bold;
      transition: background-color 0.3s;
      &:hover {
        background: rgba(184, 217, 254, 0.366);
        transform: scale();
        cursor: pointer;
        color: #056683;
        font-weight: bold;
      }
      font-family: "Nanum Gothic", sans-serif;
    `}
    ${(props) =>
    props.recipedel &&
    css`
      border: 1px solid ${({ borderColor }) => borderColor};
      height: 40px;
      width: 120px;
      background-color: transparent;
      color: #056683;
      border-radius: 12px;
      margin-left: 10px;
      transition: background-color 0.2s;
      font-weight: bold;
      &:hover {
        background-color: #1195bd;
        color: white;
      }
    `}
    ${(props) =>
    props.recipefix &&
    css`
      border: 1px solid ${({ borderColor }) => borderColor};
      height: 40px;
      width: 120px;
      background-color: #1195bd;
      color: white;
      border-radius: 12px;
      transition: background-color 0.2s;
      font-weight: bold;
      &:hover {
        background-color: white;
        color: #1195bd;
      }
    `}
    ${(props) =>
    props.recipeback &&
    css`
      border: 1px solid ${({ borderColor }) => borderColor};
      height: 40px;
      width: 120px;
      background-color: #b9c6cb;
      border-radius: 12px;
      transition: background-color 0.3s;
      /* font-weight: bold; */
      &:hover {
        background-color: #dae1e3;
      }
    `}
    ${(props) =>
    props.addComment &&
    css`
      position: relative;
      border: none;
      min-width: 150px;
      min-height: 50px;
      margin-left: 55px;
      background: linear-gradient(90deg, #c0e9fc 0%, #6ccefc 100%);
      border-radius: 1000px;
      color: darkslategray;
      cursor: pointer;
      box-shadow: 12px 12px 24px rgba(79, 209, 197, 0.64);
      font-weight: 700;
      transition: 0.3s;

      &:hover {
        transform: scale(1.2);
      }

      &:hover::after {
        content: "";
        width: 30px;
        height: 30px;
        border-radius: 100%;
        border: 8px solid #c0e9fc;
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: ring 1.5s infinite;
      }
    `}
    ${(props) =>
    props.commentdel &&
    css`
      border-radius: 10px;
    `}
`;

export default Button;
