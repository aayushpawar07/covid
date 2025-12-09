import React from "react";
import MuiTable from "../components/MuiTable";

export default function CleanCompleteTable({ data }) {
  const columns = [
    { field: "country", headerName: "Country" },
    { field: "confirmed", headerName: "Confirmed" },
    { field: "deaths", headerName: "Deaths" },
    { field: "recovered", headerName: "Recovered" },
    { field: "active", headerName: "Active" },
    { field: "newCases", headerName: "New Cases" },
    { field: "newDeaths", headerName: "New Deaths" },
    { field: "newRecovered", headerName: "New Recovered" },
  ];

  return <MuiTable rows={data} columns={columns} />;
}
