import React from "react";
import MuiTable from "../components/MuiTable";

export default function FullGroupedTable({ data }) {
  const columns = [
    { field: "country", headerName: "Country" },
    { field: "confirmed", headerName: "Confirmed" },
    { field: "deaths", headerName: "Deaths" },
    { field: "recovered", headerName: "Recovered" },
    { field: "active", headerName: "Active" },
    { field: "population", headerName: "Population" },
  ];

  return <MuiTable rows={data} columns={columns} />;
}
