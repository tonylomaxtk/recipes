import styled from "styled-components";
import { Button, TextField } from "@mui/material";

export const NewRecipeForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  margin: 0 auto;
`;

export const SubmitRecipeButton = styled(Button)`
  width: 30%;
  align-self: center;
`;

export const FormInput = styled(TextField)`
  margin-bottom: 2rem !important;
`;
