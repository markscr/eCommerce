import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import {
  useLazyGet400BadRequestErrorQuery,
  useLazyGet401UnauthorizedErrorQuery,
  useLazyGet404NotFoundErrorQuery,
  useLazyGet500ServerErrorQuery,
  useLazyGetValidationErrorQuery,
} from "./errorApi";
import { useState } from "react";

export const AboutPage = () => {
  const [trigger400Error] = useLazyGet400BadRequestErrorQuery();
  const [trigger401Error] = useLazyGet401UnauthorizedErrorQuery();
  const [trigger404Error] = useLazyGet404NotFoundErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();
  const [trigger500Error] = useLazyGet500ServerErrorQuery();

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationErrors = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        const errorArray = (error as { message: string }).message.split(", ");
        setValidationErrors(errorArray);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h3">
        Errors for testing
      </Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          onClick={() => trigger400Error().catch((err) => console.log(err))}
        >
          Test 400 error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger401Error().catch((err) => console.log(err))}
        >
          Test 401 error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger404Error().catch((err) => console.log(err))}
        >
          Test 404 error
        </Button>
        <Button variant="contained" onClick={getValidationErrors}>
          Test validation error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger500Error().catch((err) => console.log(err))}
        >
          Test 500 error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation errors</AlertTitle>
          <List>
            {validationErrors.map((error: string) => (
              <ListItem key={error}>{error}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
};
