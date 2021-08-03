import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { format } from "@date-io/date-fns";

const columns = [
  {
    field: "date",
    headerName: "Datum",
    width: 250,
    // valueGetter: (params) => {
    //     const date = `${params.getValue(params.id, "date")}`;

    //     return format(date, 'dd.MM.yyyy')
    // },
  },
  {
    field: "client",
    headerName: "Kunde",
    width: 150,
  },
  {
    field: "project",
    headerName: "project",
    width: 150,
  },
  {
    field: "task",
    headerName: "Aufgabe",
    width: 150,
  },
  {
    field: "time",
    headerName: "Zeit",
    valueGetter: (params) =>
      `${params.getValue(params.id, "timeHours") || ""} : ${
        params.getValue(params.id, "timeMinutes") || ""
      }`,
  },
  {
    field: "description",
    headerName: "Beschreibung",
    width: 250,
  },
];

const DataList = ({entries}) => {
  let content = <p>Keine Einträge vorhanden</p>;

  if (entries.length > 0) {
    content = (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={entries}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    );
  }

  return <>{content}</>;
};

export default DataList;
