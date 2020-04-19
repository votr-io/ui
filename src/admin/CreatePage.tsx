import React, { useContext, useState } from 'react';
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
import * as UserService from '../user/service';
import * as ElectionService from '../election/service';
import { Redirect } from 'react-router-dom';

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

interface Form {
  name: string;
  description?: string;
  candidates: {
    name: string;
    description?: string;
  };
  email: string;
  password: string;
}
export const CreatePage: React.FC = () => {
  const [state, dispatch] = useContext(UserContext);
  const { register, handleSubmit, errors, formState, setError } = useForm<Form>({
    defaultValues: {},
  });
  const [electionId, setElectionId] = useState<string | null>(null);

  const onSubmit = handleSubmit(async data => {
    //if the user is not logged in, then they will have to register for an account to create an election
    if (!state.user) {
      const { email, password } = data;
      try {
        const user = await UserService.login(email, password);
        dispatch({
          type: 'LoggedIn',
          payload: {
            user,
          },
        });
      } catch (e) {
        //TODO: catch server errors lke "password incorrect" and use setError
        setError([
          {
            name: 'password',
            type: 'invalid',
            message: 'incorrect password',
          },
        ]);

        /**
         * if there are any errors logging in / regisering a user
         * we should early return, since creating the election will fail.
         */
        return;
      }
    }

    const { name, description } = data;
    //TODO: replace hardcoded candidates with data coming from form once input is figured out
    const candidates = [
      {
        name: 'A',
        description: '',
      },
      {
        name: 'B',
        description: '',
      },
      {
        name: 'C',
        description: '',
      },
    ];

    try {
      const { id } = await ElectionService.upsertElection({
        name,
        description: description || '',
        candidates,
      });

      //CONSIDER: should this redirect use react-router or set the window location?
      //I'm assuming we want to avoid the full page reload
      setElectionId(id);
      // window.location.href = `/elections/${id}/admin`;
    } catch (e) {
      //TODO: handle network errors
      console.log(e);
      alert('there was an error creating this election, see logs for details');
    }
  });

  return (
    <Page header>
      {electionId && <Redirect to={`/elections/${electionId}/admin`} />}
      <Form onSubmit={onSubmit}>
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
            inputRef={register({ required: 'What is the election called?' })}
          ></OutlinedInput>
          <Typography variant="caption" color="error">
            {errors.name && errors.name.message}
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
        </Flex>
        <Flex mb={`${theme.spacing(1)}px`} flexDirection="column">
          <Typography variant="h6">Candidates</Typography>
          <pre>TODO (A, B, and C are hardcoded right now)</pre>
        </Flex>
        <hr />
        {state.phase === 'notLoggedIn' && (
          <Flex mb={`${theme.spacing(1)}px`} flexDirection="column">
            <Typography variant="h6">Login / Create Account</Typography>
            <Typography
              htmlFor="name"
              component="label"
              variant="body1"
              style={{ fontWeight: 'bold' }}
            >
              Email
              <Typography
                variant="caption"
                color="textSecondary"
                style={{ fontStyle: 'italic' }}
              >
                {' '}
                we will never give your email address to anyone
              </Typography>
            </Typography>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              fullWidth
              margin="dense"
              inputRef={register({ required: 'email is required' })}
            />
            <Typography variant="caption" color="error">
              {errors.email && errors.email.message}
            </Typography>

            <Typography
              htmlFor="name"
              component="label"
              variant="body1"
              style={{ fontWeight: 'bold' }}
            >
              Password
            </Typography>

            <OutlinedInput
              id="password"
              name="password"
              type="password"
              fullWidth
              margin="dense"
              inputRef={register({ required: 'password is required' })}
            />
            <Typography variant="caption" color="error">
              {errors.password && errors.password.message}
            </Typography>
          </Flex>
        )}

        <Flex flex="1 0 auto" justifyContent="flex-end" alignItems="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formState.isSubmitting}
          >
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
