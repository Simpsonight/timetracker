import React, { useContext } from "react";
import { ClientContext } from "../../../contexts/ClientContext";
import { Typography } from "@material-ui/core";
import { timeToDecimal } from "../../../helpers/sumTimes";
import Paper from "../../Ui/Paper";

const Amount = ({ entries }) => {
  const { clients } = useContext(ClientContext);

  let salary = "0.00";

  if (entries.length > 0) {
    const calculatedSalaries = entries.map((entry) => {
      const multiplier = timeToDecimal(entry.time);
      const client = clients.find((client) => client.id === entry.clientId);
      const projectHourRate = client.projects.find(
        (project) => project.id === entry.projectId
      );

      return +(projectHourRate.hourlyRate * multiplier);
    });

    salary = calculatedSalaries.reduce((prev, curr) => prev + curr).toFixed(2);
  }

  return (
    <Paper>
      <Typography variant="h3" component="p">
        € {salary}
      </Typography>
      <Typography variant="overline" display="block">
        Amount Due
      </Typography>
    </Paper>
  );
};

export default Amount;
