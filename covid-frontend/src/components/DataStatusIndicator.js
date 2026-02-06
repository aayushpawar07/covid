import React from "react";
import { Box, Chip, Tooltip } from "@mui/material";
import { CheckCircle, Error, Info } from "@mui/icons-material";

export default function DataStatusIndicator({ data, loading, error }) {
  if (loading) {
    return (
      <Tooltip title="Loading data...">
        <Chip
          icon={<Info />}
          label="Loading..."
          color="info"
          size="small"
          variant="outlined"
        />
      </Tooltip>
    );
  }

  if (error) {
    return (
      <Tooltip title="Error loading data">
        <Chip
          icon={<Error />}
          label="Error"
          color="error"
          size="small"
          variant="outlined"
        />
      </Tooltip>
    );
  }

  if (data && data.length > 0) {
    return (
      <Tooltip title="Data loaded successfully">
        <Chip
          icon={<CheckCircle />}
          label={`${data.length} records`}
          color="success"
          size="small"
          variant="outlined"
        />
      </Tooltip>
    );
  }

  return (
    <Tooltip title="No data available">
      <Chip
        icon={<Info />}
        label="No data"
        color="default"
        size="small"
        variant="outlined"
      />
    </Tooltip>
  );
}

