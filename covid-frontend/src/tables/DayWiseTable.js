import React from "react";
import MuiTable from "../components/MuiTable";

export default function DayWiseTable({ data }) {
  const columns = [
    { field: "date", headerName: "Date" },
    { field: "confirmed", headerName: "Confirmed" },
    { field: "deaths", headerName: "Deaths" },
    { field: "recovered", headerName: "Recovered" },
    { field: "active", headerName: "Active" },
  ];

  return <MuiTable rows={data} columns={columns} />;
}
