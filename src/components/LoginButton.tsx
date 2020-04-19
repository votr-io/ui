import React, { useState, useContext } from 'react';
import { Menu, MenuItem, Button, Modal } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { UserContext } from '../user/context';
import * as service from '../user/service';

export const LoginButton: React.FC = () => {
  const [, dispatch] = useContext(UserContext);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const onClick = () => {
  //     service
  //       .login('test@fake.com', 'test')
  //       .then(user => {
  //         dispatch({
  //           type: 'LoggedIn',
  //           payload: {
  //             user,
  //           },
  //         });
  //       })
  //       .catch(e => {
  //         //TODO: manage errors coming from server
  //         alert('error logging in');
  //       });
  //   };

  const modalBody = (
    <div>
      <h1>Login</h1>
      <p>TOOD: login stuff</p>
    </div>
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
