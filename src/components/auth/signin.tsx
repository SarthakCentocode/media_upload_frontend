"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostMethodMutation } from "@/services/data-service";
import { ApiMethod, LoginApiUrls } from "@/shared/enums/api-enum";

// Define validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required")
});

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema)
  });

  const [signInUser, { isLoading, isError, error }] = usePostMethodMutation();

  const onSubmit = async (data: SignInFormData) => {
    console.log(data);
    const response = await signInUser({
        httpResponse:{
            url:LoginApiUrls.SignIn,
            reqType:ApiMethod.POST,
        },payload:data
    });
    console.log(response);
    

  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Sign In
      </Typography>
      
      <TextField
        required
        fullWidth
        label="Email Address"
        autoFocus
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </Box>
  );
}
