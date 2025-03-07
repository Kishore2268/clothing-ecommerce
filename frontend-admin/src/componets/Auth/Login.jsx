import * as React from "react";
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";
import { getUser, login } from "../../Redux/Auth/Action";
import { useEffect, useState } from "react";

export default function LoginUserForm({ handleNext }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook to navigate to other pages
  const jwt = localStorage.getItem("jwt");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { user, error } = useSelector((store) => store.auth);

  const handleCloseSnakbar = () => setOpenSnackBar(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    if (error) {
      setOpenSnackBar(true); // Open Snackbar only on error
    }
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData)).then(() => {
      if (user) {
        setOpenSnackBar(true); // Open Snackbar only on successful login
        navigate("/admin"); // Redirect to admin page on successful login
      }
    });
  };

  return (
    <div className="login-page">
      <Card sx={{ maxWidth: "400px", margin: "0 auto", borderRadius: "20px" }}>
        <CardContent>
          <React.Fragment>
            <form className="w-full" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="given-name"
                    sx={{ width: "100%", margin: "0 auto", marginTop:"10px" }} // Set width to 100% and center
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    fullWidth
                    type="password"
                    sx={{ width: "100%", margin: "0 auto" }} // Set width to 100% and center
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className="bg-[#9155FD] w-full"
                    sx={{ padding: ".8rem 0", bgcolor:"#9155FD", color:"white", width: "100%", margin: "0 auto"}}
                    type="submit"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
            <div className="flex flex-col justify-center items-center">
              <div className="py-3 flex items-center">
                <p className="m-0 p-0">Account access only for admins.</p>
              </div>
            </div>
            <Snackbar
              open={openSnackBar}
              autoHideDuration={6000}
              onClose={handleCloseSnakbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseSnakbar}
                severity="success"
                sx={{ width: "100%" }}
              >
                {error ? error : user ? "Login Success" : ""}
              </Alert>
            </Snackbar>
          </React.Fragment>
        </CardContent>
      </Card>
    </div>
  );
}
