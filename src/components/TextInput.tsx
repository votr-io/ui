import React from "react";
import styled from "@emotion/styled";
import { Typography, OutlinedInput } from "@material-ui/core";
import { theme } from "../theme";

export const TextInput: React.FC = () => {
  return (
    <InputWrapper>
      <Label name="name">Name</Label>
      <Typography variant="body2" color="textSecondary">
        What is the election called?
      </Typography>
      <OutlinedInput fullWidth margin="dense"></OutlinedInput>
      <Typography variant="caption">What is the election called?</Typography>
    </InputWrapper>
  );
};

const Label: React.FC<{ name: string }> = ({ children, name }) => (
  <Typography
    htmlFor={name}
    component="label"
    variant="body1"
    style={{ fontWeight: "bold" }}
  >
    {children}
  </Typography>
);

const InputWrapper = styled.div`
  max-width: 800px;
  margin-bottom: ${theme.spacing(2)}px;
`;
