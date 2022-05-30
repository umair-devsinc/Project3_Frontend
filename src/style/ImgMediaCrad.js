const modelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ITEM_HEIGHT = 40;

const divStyle = { display: "flex", justifyContent: "center" };
const cardStyle = { minWidth: 700, maxWidth: 1300, margin: 5 };
const avatarStyle = { bgcolor: "red" };
const menuStyle = {
  maxHeight: ITEM_HEIGHT * 4.5,
  width: "20ch",
};
const submitButtonStyle = { mt: 3, mb: 2, me: 2 };
const commentStyle = {
  display: "flex",
  alignItems: "flex-end",
  padding: "20px",
};
module.exports = {
  modelStyle,
  divStyle,
  cardStyle,
  avatarStyle,
  menuStyle,
  submitButtonStyle,
  commentStyle,
};
