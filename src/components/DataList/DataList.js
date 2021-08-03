import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  {
    field: "date",
    headerName: "Datum",
    width: 120,
    valueFormatter: (params) => {
      const date = new Date(`${params.getValue(params.id, "date")}`);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleString('de-DE', options);
    },
  },
  {
    field: "time",
    headerName: "Zeit",
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
    field: "description",
    headerName: "Beschreibung",
    width: 250,
  },
];

const DataList = ({ entries }) => {
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
