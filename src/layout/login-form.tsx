import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.string().optional(),
});

type LoginSchema = z.infer<typeof schema>;

export default function LoginForm() {
  const [submitResult, setSubmitData] = React.useState<{ status: boolean | null; message: string }>(
    { status: null, message: '' }
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.email === 'admin@example.com' && data.password === 'admin') return resolve(true);
          return reject(new Error('Wrong username or password'));
        }, Math.random() * 1000);
      });
      setSubmitData({ ...submitResult, status: true });
    } catch (error) {
      setSubmitData({ status: false, message: (error as { message: string }).message });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {submitResult.status === true ? (
          <Alert severity="success">Login Success</Alert>
        ) : submitResult.status === false ? (
          <Alert severity="error">{submitResult.message}</Alert>
        ) : null}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...{ error: errors.email !== undefined, helperText: errors?.email?.message || '' }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...{
                  error: errors.password !== undefined,
                  helperText: errors?.password?.message || '',
                }}
              />
            )}
          />
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox color="primary" />}
                label="Remember Me"
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
