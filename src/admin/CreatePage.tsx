import React, { useContext } from 'react';
import {
  Grid,
  Typography,
  Container,
  TextField,
  Box,
  OutlinedInput,
  Button,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Page } from '../components/Page';
import { TextInput } from '../components/TextInput';
import { Flex } from '@rebass/grid/emotion';
import styled from '@emotion/styled';
import { theme } from '../theme';
import { UserContext } from '../user/context';

/**
 * Election Management
 *
 *
 * Configure:
 *  name
 *  description
 *  candidates
 *    name
 *    description
 *    image
 *
 * Manage Status:
 *  start
 *  stop
 */

export const CreatePage: React.FC = () => {
  const [state] = useContext(UserContext);
  const { register, handleSubmit } = useForm();

  return (
    <Page header>
      <Form onSubmit={handleSubmit(data => console.log(data))}>
        <Flex mb={theme.spacing(2)}>
          <Typography variant="h4">Create New Election</Typography>
        </Flex>
        <Flex mb={`${theme.spacing(1)}px`} flexDirection="column">
          <Typography
            htmlFor="name"
            component="label"
            variant="body1"
            style={{ fontWeight: 'bold' }}
          >
            Name
          </Typography>
          <OutlinedInput
            id="name"
            name="name"
            fullWidth
            margin="dense"
            inputRef={register}
          ></OutlinedInput>
          <Typography variant="caption" color="error">
            What is the election called?
          </Typography>
        </Flex>
        <Flex mb={`${theme.spacing(2)}px`} flexDirection="column">
          <Typography
            htmlFor="description"
            component="label"
            variant="body1"
            style={{ fontWeight: 'bold' }}
          >
            Description
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ fontStyle: 'italic' }}
            >
              {' '}
              optional
            </Typography>
          </Typography>
          <OutlinedInput
            id="description"
            name="description"
            fullWidth
            margin="dense"
            inputRef={register}
          ></OutlinedInput>
          <Typography variant="caption" color="error">
            What is the election called?
          </Typography>
        </Flex>
        <Flex mb={`${theme.spacing(1)}px`} flexDirection="column">
          <Typography variant="h6">Candidates</Typography>
        </Flex>
        <hr />
        {!state.user && (
          <Flex mb={`${theme.spacing(1)}px`} flexDirection="column">
            <Typography variant="h6">Create Account</Typography>
            <Typography
              htmlFor="name"
              component="label"
              variant="body1"
              style={{ fontWeight: 'bold' }}
            >
              Email
            </Typography>
            <OutlinedInput
              id="name"
              name="name"
              fullWidth
              margin="dense"
              inputRef={register}
            />

            <Typography
              htmlFor="name"
              component="label"
              variant="body1"
              style={{ fontWeight: 'bold' }}
            >
              Password
            </Typography>
            <OutlinedInput
              id="name"
              name="name"
              fullWidth
              margin="dense"
              inputRef={register}
            />
          </Flex>
        )}

        <Flex flex="1 0 auto" justifyContent="flex-end" alignItems="flex-end">
          <Button variant="contained" color="primary">
            Save
          </Button>
        </Flex>
      </Form>
    </Page>
  );
};

const Form = styled.form`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
`;
