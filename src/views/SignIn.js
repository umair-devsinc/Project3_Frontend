import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { boxStyle, submitButtonStyle, avatarStyle } from "../style/SignUp";
import Copyright from "../utils/Copyright";
import { userSignin } from "../apis/userApi";
const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({ email: false, password: false });

  const validation = (user) => {
    user.email ? (errors.email = false) : (errors.email = true);
    user.password ? (errors.password = false) : (errors.password = true);

    setErrors({ ...errors });

    if (Object.values(errors).find((e) => e === true)) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    validation(user) &&
      userSignin(user).then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("id", response.data.id);

          navigate("/home");
        } else {
          response.json().then((data) => alert(data.error));
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={boxStyle}>
          <Avatar sx={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={errors.email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={errors.password}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={submitButtonStyle}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
