import React from "react";
import { Grid, Typography, Container, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm();

  return (
    <Container>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1">Create Election</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="name"
              variant="outlined"
              margin="dense"
              name="name"
              inputRef={register}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="description"
              name="description"
              multiline
              variant="outlined"
              margin="dense"
              inputRef={register}
            ></TextField>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
