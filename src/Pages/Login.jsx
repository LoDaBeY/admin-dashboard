import {
  Box,
  Stack,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
// @ts-ignore
import LogInVideo from "../Assests/LogIn.mp4";
import {  Google, PasswordRounded } from "@mui/icons-material";
import InputIcon from "@mui/icons-material/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfige";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Lottie from "react-lottie";
import animationDataDark from "../Assests/LoadingDark.json";
import { useAuthState } from "react-firebase-hooks/auth";

const defaultOptionsForDark = {
  loop: true,
  autoplay: true,
  animationData: animationDataDark,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const EmailValue = (eo) => {
    let inputValue = eo.target.value;
    setEmail(inputValue);
  };

  const EmailPassword = (eo) => {
    let inputPassword = eo.target.value;
    setPassword(inputPassword);
  };

  if (loading ) {
    return (
      <Box>
        <Lottie options={defaultOptionsForDark} height={800} width={800} />
      </Box>
    );
  }

  if (!user) {
    return (
      <div>
        <Helmet>
          <title>Login</title>
        </Helmet>
  
        <Box sx={{ height: "100vh" }}>
          <video
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
            src={LogInVideo}
            autoPlay
            loop
            muted
          />
        </Box>
  
        <Box
          sx={{
            width: { xs: "280px", sm: "300px", md: "330px" },
            height: "500px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(51, 49, 79, 0.42)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(7.6px)",
            border: "1px solid rgba(51, 49, 79, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h6" sx={{ my: 3 }} color="whitesmoke">
            Welcome to Login Page
          </Typography>
  
          <Stack sx={{ width: "100%", flexDirection: "column", gap: 3, mt: 1 }}>
            <Stack sx={{ width: "100%", mx: 2, gap: 2, flexDirection: "row" }}>
              <IconButton
                aria-label="Log In"
                sx={{ color: "white" }}
                onChange={() => {}}
              >
                <MailIcon />
              </IconButton>
              <TextField
                id="filled-required"
                label="Email Address"
                variant="filled"
                defaultValue={email}
                {...register("email", { required: true })}
                sx={{
                  color: "white",
                  width: "70%",
                  "& .MuiInputBase-root": { color: "white" },
                  "& .MuiFormLabel-root": { color: "white" },
                }}
                error={Boolean(errors.email)}
                onChange={(eo) => {
                  EmailValue(eo);
                }}
              />
            </Stack>
  
            <Stack sx={{ width: "100%", mx: 2, gap: 2, flexDirection: "row" }}>
              <IconButton aria-label="Log In" sx={{ color: "white" }}>
                <PasswordRounded />
              </IconButton>
              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
                defaultValue={password}
                {...register("password", { required: true })}
                sx={{
                  color: "white",
                  width: "70%",
                  "& .MuiInputBase-root": { color: "white" },
                  "& .MuiFormLabel-root": { color: "white" },
                }}
                error={Boolean(errors.password)}
                onChange={(eo) => {
                  EmailPassword(eo);
                }}
              />
            </Stack>
          </Stack>
  
          <Button
            variant="text"
            color="warning"
            endIcon={<InputIcon />}
            sx={{
              mt: 3,
              bgcolor: "white",
              px: 3,
              ":hover": { bgcolor: "white" },
            }}
            type="submit"
          >
            Log In
          </Button>
  
          <Box textAlign={"center"}>
            <Typography sx={{ mt: 4 }} variant="body1" color="White">
              Or Sign in With
            </Typography>
  
            <Stack gap={1}>
              <Button
                variant="text"
                color="secondary"
                endIcon={<Google />}
                sx={{
                  mt: 1,
                  bgcolor: "white",
                  px: 3,
                  ":hover": { bgcolor: "white" },
                }}
                onClick={() => {
                  signInWithPopup(auth, provider)
                    .then((result) => {
                      // This gives you a Google Access Token. You can use it to access the Google API.
                      const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                      const token = credential.accessToken;
                      // The signed-in user info.
                      const user = result.user;
                      navigate("/")
                      // IdP data available using getAdditionalUserInfo(result)
                      // ...
                    })
                    .catch((error) => {
                      // Handle Errors here.
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      // The email of the user's account used.
                      const email = error.customData.email;
                      // The AuthCredential type that was used.
                      const credential =
                        GoogleAuthProvider.credentialFromError(error);
                      // ...
                    });
                }}
              >
                Log In With Google
              </Button>
  
            </Stack>
          </Box>
  
          <Typography sx={{ mt: 6 }} variant="caption" color="white">
            Don't Have an Account?{" "}
            <span
              style={{
                backgroundColor: "whitesmoke",
                color: "black",
                borderRadius: "15px",
                cursor: "pointer",
                padding: "10px",
                marginLeft: "14px",
              }}
              onClick={() => {
                navigate("/SignUp");
              }}
            >
              Sign Up Here
            </span>
          </Typography>
        </Box>
      </div>
    );
  }


}

export default Login;
