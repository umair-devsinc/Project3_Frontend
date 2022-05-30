const homeStyle = {
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  marginTop: 10,
};

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
const modelButtonStyle = { mt: 3, mb: 2 };
const createButtonStyle = {
  position: "fixed",
  top: "90%",
  left: "80vw",
  marginRight: "35px",
  fontWeight: "bolder",
};
const divStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
  marginBottom: "20px",
};

module.exports = {
  homeStyle,
  modelStyle,
  modelButtonStyle,
  createButtonStyle,
  divStyle,
};
