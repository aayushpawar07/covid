import React from "react";
import MuiTable from "../components/MuiTable";

export default function WorldometerTable({ data }) {
  const columns = [
    { field: "country", headerName: "Country" },
    { field: "totalCases", headerName: "Total Cases" },
    { field: "newCases", headerName: "New Cases" },
    { field: "totalDeaths", headerName: "Total Deaths" },
    { field: "newDeaths", headerName: "New Deaths" },
    { field: "totalRecovered", headerName: "Recovered" },
    { field: "activeCases", headerName: "Active" },
  ];

  return <MuiTable rows={data} columns={columns} />;
}
