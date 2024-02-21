import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import {
  Box,
  Stack,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
// @ts-ignore
import LogInVideo from "../Assests/SıgnUp.mp4";
import {  Google, PasswordRounded, Person } from "@mui/icons-material";
import InputIcon from "@mui/icons-material/Input";
import { useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfige";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Lottie from "react-lottie";
import animationDataDark from "../Assests/LoadingDark.json";

const defaultOptionsForDark = {
  loop: true,
  autoplay: true,
  animationData: animationDataDark,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [FullName, setFullName] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user)

        updateProfile(auth.currentUser, {
          displayName: FullName,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error.code);
            // ...
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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

  const FullNameValue = (eo) => {
    let inputFullNameValue = eo.target.value;
    setFullName(inputFullNameValue);
  };

  if (loading ) {
    return (
      <Box>
        <Lottie options={defaultOptionsForDark} height={"100%"} width={"100%"} />
      </Box>
    );
  }

if (!user) {
  return (
    <div>
      <Helmet>
        <title>SignUp</title>
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
          height: "570px",
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
          Welcome to Sign Up Page
        </Typography>

        <Stack sx={{ width: "100%", flexDirection: "column", gap: 3, mt: 1 }}>
          <Stack sx={{ width: "100%", mx: 2, gap: 2, flexDirection: "row" }}>
            <IconButton aria-label="Log In" sx={{ color: "white" }}>
              <Person />
            </IconButton>
            <TextField
              id="filled-required"
              label="Full Name"
              variant="filled"
              defaultValue={FullName}
              {...register("FullName", { required: true })}
              sx={{
                color: "white",
                width: "70%",
                "& .MuiInputBase-root": { color: "white" },
                "& .MuiFormLabel-root": { color: "white" },
              }}
              error={Boolean(errors.FullName)}
              onChange={(eo) => {
                FullNameValue(eo);
              }}
            />
          </Stack>

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
                "& .MuiTextField-root": { color: "white" },
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
          Sign Up
        </Button>

        <Box textAlign={"center"}>
          <Typography sx={{ mt: 5 }} variant="body1" color="White">
            Or Sign Up With
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
              Sign Up With Google
            </Button>
          </Stack>
        </Box>

        <Typography sx={{ mt: 5 }} variant="caption" color="white">
          Have an Account?{" "}
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
              navigate("/Login");
            }}
          >
            Sign In Here
          </span>
        </Typography>
      </Box>
    </div>
  );
}
}

export default SignUp;
