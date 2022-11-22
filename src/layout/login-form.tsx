import React from 'react';
import { Control, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';

import { Alert, AlertIcon, Box, Button, Container, Heading, Icon, Text } from '@chakra-ui/react';
import { MdLockOutline } from 'react-icons/md';
import AvatarWrapper from '../component/avatar-wrapper';

import StateManager from '../state/context';
import { successGetCredential } from '../state/credential/action';
import ChakraTextField from '../component/form/text-field';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  customError: z.string().optional(),
});

type LoginSchema = z.infer<typeof schema>;

export default function Login() {
  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setError,
    register,
    control,
  } = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location?.state as { from?: { pathname: string } })?.from?.pathname || '/';
  const { dispatch } = React.useContext(StateManager);

  React.useEffect(() => {
    if (isSubmitSuccessful)
      new Promise((resolve) => {
        setTimeout(() => {
          navigate(from, { replace: true });
          resolve(true);
        }, 500);
      });
  }, [isSubmitSuccessful]);

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response: { token: string } = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.email === 'admin@example.com' && data.password === 'admin')
            return resolve({ token: v4() });
          return reject(new Error('Wrong username or password'));
        }, Math.random() * 1000);
      });
      dispatch(successGetCredential(response.token));
    } catch (error) {
      setError('customError', {
        type: 'value',
        message: (error as Error).message,
      });
    }
  };

  return (
    <Container maxW="md" mt="8" display="flex" flexDirection="column" alignItems="center">
      <AvatarWrapper>
        <Icon as={MdLockOutline} w={6} h={6} />
      </AvatarWrapper>
      <Heading as={'h4'} fontSize={'2xl'}>
        Login
      </Heading>
      <Text>Hint: admin@example.com|admin</Text>
      <Box as="form" noValidate mt="1" onSubmit={handleSubmit(onSubmit)} width="100%">
        {isSubmitSuccessful ? (
          <Alert status="success">
            <AlertIcon />
            Login Successful
          </Alert>
        ) : null}
        {errors.customError !== undefined ? (
          <Alert status="error">
            <AlertIcon />
            {errors.customError.message}
          </Alert>
        ) : null}
        <ChakraTextField
          field="email"
          control={control as unknown as Control}
          error={errors.email}
          label="Email"
        />
        <ChakraTextField
          field="password"
          control={control as unknown as Control}
          error={errors.password}
          label="Password"
          type="password"
        />
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Login
        </Button>
      </Box>
    </Container>
  );
}
