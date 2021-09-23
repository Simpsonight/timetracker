import React, { useContext } from "react";
import { ClientContext } from "../../../contexts/ClientContext";
import { Typography } from "@material-ui/core";
import { timeToDecimal } from "../../../helpers/sumTimes";
import { getProjectHourRate } from "../../../helpers/getProjectData";
import Paper from "../../Ui/Paper/Paper";

const Amount = ({ entries }) => {
  const { clients } = useContext(ClientContext);

  let salary = "0.00";
  let projectData = [];

  const calculatedSalaries = entries.map((entry) => {
    return +(getProjectHourRate(entry, clients).hourlyRate * timeToDecimal(entry.time));
  });

  const combinedProjectItems = (entries = []) => {
    const res = entries.reduce((acc, obj) => {
      let found = false;
      let newObj = {};

      for (let i = 0, n = acc.length; i < n; i++) {
        if (acc[i].projectId === obj.projectId) {
          found = true;
          acc[i].amount.push(timeToDecimal(obj.time));
        }
      }

      if (!found) {
        newObj.amount = [timeToDecimal(obj.time)];
        newObj.projectId = obj.projectId;
        newObj.name = obj.project;
        newObj.rate = getProjectHourRate(obj, clients).hourlyRate;
        acc.push(newObj);
      }

      return acc;
    }, []);

    return res;
  };

  if (entries.length > 0) {
    projectData = combinedProjectItems(entries).map((item) => {
      item.amount = item.amount.reduce((prev, curr) => prev + curr).toFixed(2);
      item.sum = (item.rate * item.amount).toFixed(2);
      return item;
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
      {projectData.length > 0 ? (
        projectData.map((item) => {
          return (
            <div key={item.name}>
              {item.name} | {item.amount} h | {item.rate} €/h == {item.sum} €
            </div>
          );
        })
      ) : (
        <Typography variant="overline" display="block">
          Keine Projekte in dem Zeitraum
        </Typography>
      )}
    </Paper>
  );
};

export default Amount;
