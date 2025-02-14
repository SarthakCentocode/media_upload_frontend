import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { usePostMethodMutation } from '@/services/data-service';
import { ApiMethod, LoginApiUrls } from '@/shared/enums/api-enum';
import { ResponseInterface } from '@/shared/types/http-types';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

const SignUp = () => {
  const [postMethod] = usePostMethodMutation();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema)
  });

  const [signUpUser, { isLoading, isError }] = usePostMethodMutation();

  const onSubmit = async (values: SignupFormData) => {
    const response = await signUpUser({
      httpResponse: {
        url: LoginApiUrls.SignUp,
        reqType: ApiMethod.POST
      },
      payload: values
    });
    console.log(response);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        padding: 3
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      <TextField
        fullWidth
        id="fullName"
        label="Full Name"
        {...register('fullName')}
        error={Boolean(errors.fullName)}
        helperText={errors.fullName?.message}
      />

      <TextField
        fullWidth
        id="email"
        label="Email"
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        id="password"
        label="Password"
        type="password"
        {...register('password')}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />

      <TextField
        fullWidth
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        {...register('confirmPassword')}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
