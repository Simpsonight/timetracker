import React from "react";
import { Typography } from "@material-ui/core";
import EntryDate from "../EntryDate/EntryDate";
import * as Styled from "./styles";

const EntryItem = ({
  entryData: { date, task, project, client, description, time },
}) => {

  return (
    <Styled.Container>
      <EntryDate date={new Date(date)} />
      <div>
        <Typography variant="h4" component="p">{task}</Typography>
        <Styled.Subline>
          {client} <span>|</span> {project}
        </Styled.Subline>
      </div>
      <Typography variant="h4" component="p">{time} h</Typography>
    </Styled.Container>
  );
};

export default EntryItem;
