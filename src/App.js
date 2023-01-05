import { useForm, Controller } from "react-hook-form";
import { Box, Typography, Button, FormHelperText } from "@mui/material";

import MultiSelect from "./MultiSelect";

const dimensions = [
  { id: 1, name: "env" },
  { id: 2, name: "strat" },
  { id: 3, name: "dataGov" }
];

export default function App() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("here is data ", data);
  };
  return (
    <Box
      sx={{
        boxShadow: 24,
        p: 4
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <>
        <Typography variant="h5" textAlign="center" component="h1" gutterBottom>
          AutoComplete with select all options
        </Typography>

        <Box mt={2}>
          <Box mt={2}>
            <Controller
              control={control}
              name="dimensions"
              rules={{
                required: "Veuillez choisir une réponse"
              }}
              render={({ field: { onChange } }) => (
                <MultiSelect
                  items={dimensions}
                  label="Dimensions"
                  selectAllLabel="Sélectionner Tous"
                  onChange={onChange}
                />
              )}
            />
            <FormHelperText error={Boolean(errors.dimensions)}>
              {errors.dimensions?.message}
            </FormHelperText>
          </Box>
        </Box>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Enregistrer
        </Button>
      </>
    </Box>
  );
}
