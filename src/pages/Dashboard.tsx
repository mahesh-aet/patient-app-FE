import { Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import { PatientTable } from "../components/patient/PatientTable";
import PatientForm from "../components/patient/PatientForm";

export const DashBoard = () => {
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const handleFormDisplay = () => {
    setShowCreateForm(true);
  };
  return (
    <Grid container flexDirection={"column"} spacing={2}>
      <Grid sx={{ my: 1, backgroundColor: "#f3f3f3" }}>
        <Typography fontSize={24}>Patient Dashboard</Typography>
      </Grid>
      <Grid container>
        {!showCreateForm && (
          <Button type="submit" variant="contained" onClick={handleFormDisplay}>
            <AddIcon />
            <Typography fontSize={16} textTransform={"none"}>
              Add New Patient
            </Typography>
          </Button>
        )}
        {showCreateForm && (
          <PatientForm setShowCreateForm={setShowCreateForm} />
        )}
      </Grid>

      <PatientTable />
    </Grid>
  );
};
