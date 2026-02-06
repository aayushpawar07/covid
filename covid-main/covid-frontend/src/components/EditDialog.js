/**
 * Edit Dialog Component
 * 
 * Reusable dialog component for editing table row data
 * 
 * Features:
 * - Dynamic form fields based on column definitions
 * - Supports text and number input types
 * - Filters out non-editable fields (id, country, etc.)
 * - Modern glassmorphism styling
 * - Dark/light theme support
 * 
 * Props:
 * - open: Boolean to control dialog visibility
 * - onClose: Function called when dialog is closed
 * - onSave: Function called when user saves changes
 * - data: Row data object to edit
 * - columns: Array of column definitions
 * - title: Dialog title (default: "Edit Data")
 */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  IconButton,
  Grid,
} from "@mui/material";
import { Close, Save } from "@mui/icons-material";

export default function EditDialog({ open, onClose, onSave, data, columns, title = "Edit Data" }) {
  // Get theme for dark/light mode
  const theme = useTheme();
  const mode = theme.palette.mode;
  
  // Form data state (stores edited values)
  const [formData, setFormData] = useState({});

  /**
   * Effect: Initialize Form Data
   * 
   * When dialog opens with new data, populate form fields
   * Runs whenever 'data' prop changes
   */
  useEffect(() => {
    if (data) {
      setFormData(data); // Initialize form with current row data
    }
  }, [data]);

  /**
   * Handle Field Value Change
   * 
   * Updates form data when user types in a field
   * 
   * @param {string} field - Field name to update
   * @param {*} value - New value for the field
   */
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value, // Update specific field, keep other fields unchanged
    }));
  };

  /**
   * Handle Save Button Click
   * 
   * Saves edited data and closes dialog
   */
  const handleSave = () => {
    onSave(formData); // Pass updated data to parent component
    onClose(); // Close dialog
  };

  /**
   * Filter Editable Columns
   * 
   * Removes non-editable columns from form:
   * - "id" field (primary key, shouldn't be changed)
   * - Fields marked with editable: false
   * 
   * @returns {Array} Filtered array of editable columns
   */
  const editableColumns = columns.filter(
    (col) => col.field !== "id" && col.editable !== false
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: mode === "dark" ? "rgba(22, 27, 34, 0.95)" : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: mode === "dark"
            ? "1px solid rgba(48, 54, 61, 0.6)"
            : "1px solid rgba(208, 215, 222, 0.6)",
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          borderBottom: mode === "dark"
            ? "1px solid rgba(48, 54, 61, 0.5)"
            : "1px solid rgba(208, 215, 222, 0.5)",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "text.secondary",
            "&:hover": {
              bgcolor: mode === "dark" ? "rgba(255, 107, 157, 0.1)" : "rgba(233, 30, 99, 0.1)",
              color: "secondary.main",
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {editableColumns.map((col) => (
            <Grid item xs={12} md={6} key={col.field}>
              <TextField
                fullWidth
                label={col.headerName}
                value={formData[col.field] || ""}
                onChange={(e) => {
                  const value =
                    col.type === "number"
                      ? e.target.value === ""
                        ? null
                        : Number(e.target.value)
                      : e.target.value;
                  handleChange(col.field, value);
                }}
                type={col.type || "text"}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "transparent",
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            "&:hover": {
              bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<Save />}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            fontWeight: 600,
            boxShadow: mode === "dark"
              ? "0 4px 16px rgba(0, 229, 255, 0.3)"
              : "0 4px 12px rgba(0, 102, 204, 0.3)",
            "&:hover": {
              bgcolor: "primary.dark",
              boxShadow: mode === "dark"
                ? "0 8px 24px rgba(0, 229, 255, 0.4)"
                : "0 8px 20px rgba(0, 102, 204, 0.4)",
            },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

