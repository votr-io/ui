import React, { useState, useContext, useRef } from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UserContext } from '../user/context';
import * as service from '../user/service';

export const AccountMenu: React.FC = () => {
  const [, dispatch] = useContext(UserContext);

  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    service.logout();
    dispatch({ type: 'LoggedOut' });
  };

  return (
    <div>
      <IconButton ref={buttonRef} onClick={handleClick}>
        <AccountCircleIcon />
      </IconButton>

      <Menu anchorEl={buttonRef.current} keepMounted open={open} onClose={handleClose}>
        <MenuItem onClick={() => alert('not implemented yet')}>My Elections</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
