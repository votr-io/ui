import React, { useState, useContext } from 'react';
import { Menu, MenuItem, Button, Modal } from '@material-ui/core';
import styled from '@emotion/styled';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { UserContext } from '../user/context';
import * as service from '../user/service';
import { useForm } from 'react-hook-form';

interface Form {
  email: string;
  password: string;
}

export const LoginButton: React.FC = () => {
  const [, dispatch] = useContext(UserContext);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, errors, formState, setError } = useForm<Form>();

  const onSubmit = handleSubmit(data => {
    const { email, password } = data;
    return service
      .login(email, password)
      .then(user => {
        dispatch({
          type: 'LoggedIn',
          payload: {
            user,
          },
        });
      })
      .catch(e => {
        //TODO: conditional check on kind of error
        setError([
          {
            name: 'password',
            type: 'invalid',
            message: 'password is incorrect',
          },
        ]);
      });
  });

  const modalBody = (
    <ModalWindow>
      <h1>Login / Register</h1>
      <Form onSubmit={onSubmit}>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          ref={register({ required: 'email is required' })}
        />
        <Error>{errors.email && errors.email.message}</Error>

        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          ref={register({ required: 'password is required' })}
        />
        <Error> {errors.password && errors.password.message}</Error>

        <Input
          className="btn btn-lg btn-primary btn-block text-uppercase"
          type="submit"
          disabled={formState.isSubmitting}
        />
      </Form>
    </ModalWindow>
  );

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        Log In
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </div>
  );
};

/**
 * TODO: talk to erin about styles and CSS patterns for this project
 *
 * styled components?
 * material-ui theme?
 */
const ModalWindow = styled.div`
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 400px;
  background-color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 5px 0 0 0;
`;

const Input = styled.input`
  margin: 5px 0 5px 0;
`;

const Error = styled.div`
  color: red;
`;
