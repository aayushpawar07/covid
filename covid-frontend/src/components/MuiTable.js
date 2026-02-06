/**
 * MuiTable Component
 * 
 * Reusable Material-UI table component with advanced features
 * 
 * Features:
 * - Search/filter functionality
 * - Edit and Delete actions per row
 * - Red alert highlighting for countries with high death:recovery ratio
 * - Responsive design with custom styling
 * - Dark/light theme support
 * 
 * Props:
 * - rows: Array of data objects to display
 * - columns: Array of column definitions {field, headerName, type}
 * - onEdit: Function called when user edits a row
 * - onDelete: Function called when user deletes a row
 */
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  Chip,
} from "@mui/material";
import { Search, Clear, Edit, Delete, Warning } from "@mui/icons-material";
import EditDialog from "./EditDialog";

export default function MuiTable({ rows, columns, onEdit, onDelete, editEndpoint, deleteEndpoint, getRowId }) {
  // Search term state for filtering rows
  const [searchTerm, setSearchTerm] = useState("");
  
  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  // Get theme for dark/light mode
  const theme = useTheme();
  const mode = theme.palette.mode;

  /**
   * Handle Edit Button Click
   * 
   * Opens edit dialog with selected row data
   * 
   * @param {Object} row - Row data to edit
   */
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditDialogOpen(true);
  };

  /**
   * Handle Delete Button Click
   * 
   * Shows confirmation dialog, then calls onDelete if confirmed
   * 
   * @param {Object} row - Row data to delete
   */
  const handleDeleteClick = (row) => {
    // Show browser confirmation dialog
    if (window.confirm("Are you sure you want to delete this record?")) {
      // Call parent's delete handler if provided
      if (onDelete) {
        onDelete(row);
      }
    }
  };

  /**
   * Handle Save from Edit Dialog
   * 
   * Called when user saves changes in edit dialog
   * 
   * @param {Object} updatedData - Updated row data
   */
  const handleSaveEdit = (updatedData) => {
    // Call parent's edit handler if provided
    if (onEdit) {
      onEdit(updatedData);
    }
  };

  /**
   * Filter Rows Based on Search Term
   * 
   * Uses useMemo to optimize performance (only recalculates when rows or searchTerm changes)
   * Searches across all column values (case-insensitive)
   * 
   * @returns {Array} Filtered array of rows matching search term
   */
  const filteredRows = useMemo(() => {
    // If no search term, return all rows
    if (!searchTerm) return rows;
    
    // Convert search term to lowercase for case-insensitive search
    const lowerSearch = searchTerm.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) => {
        const value = row[col.field];
        return value !== null && value !== undefined && 
               String(value).toLowerCase().includes(lowerSearch);
      })
    );
  }, [rows, searchTerm, columns]);

  const formatCellValue = (value, field, row) => {
    if (field === "alert") {
      if (row.redAlert) {
        return (
          <Chip
            icon={<Warning />}
            label="ALERT"
            size="small"
            sx={{
              bgcolor: "error.main",
              color: "white",
              fontWeight: 700,
              fontSize: "0.75rem",
              height: 24,
              "& .MuiChip-icon": {
                color: "white",
              },
            }}
          />
        );
      }
      return (
        <Chip
          label="OK"
          size="small"
          sx={{
            bgcolor: mode === "dark" ? "rgba(76, 175, 80, 0.3)" : "rgba(76, 175, 80, 0.2)",
            color: mode === "dark" ? "#81C784" : "#4CAF50",
            fontWeight: 600,
            fontSize: "0.75rem",
            height: 24,
          }}
        />
      );
    }
    
    if (value === null || value === undefined) return "-";
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    return String(value);
  };

  return (
    <Box>
      {/* Search Bar */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <TextField
          placeholder="Search data..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchTerm("")}
                  edge="end"
                >
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: { xs: "100%", sm: 300 },
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
        {searchTerm && (
          <Box sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
            Showing {filteredRows.length} of {rows.length} results
          </Box>
        )}
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          mt: 0,
          borderRadius: 3,
          overflow: "auto",
          maxHeight: "70vh",
          bgcolor: mode === "dark" ? "rgba(22, 27, 34, 0.6)" : "rgba(255, 255, 255, 0.9)",
          backdropFilter: mode === "dark" ? "blur(20px)" : "none",
          WebkitBackdropFilter: mode === "dark" ? "blur(20px)" : "none",
          border: mode === "dark"
            ? "1px solid rgba(48, 54, 61, 0.5)"
            : "1px solid rgba(208, 215, 222, 0.5)",
          boxShadow: mode === "dark"
            ? "0 8px 32px rgba(0, 0, 0, 0.4)"
            : "0 4px 20px rgba(0, 0, 0, 0.08)",
          "&::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(180deg, #00E5FF 0%, #00B8CC 100%)",
            borderRadius: "6px",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "linear-gradient(180deg, #33EEFF 0%, #00E5FF 100%)",
            backgroundClip: "padding-box",
          },
          "&::-webkit-scrollbar-track": {
            background: mode === "dark" ? "rgba(22, 27, 34, 0.6)" : "rgba(248, 249, 250, 0.6)",
            borderRadius: "6px",
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell 
                  key={col.field} 
                  sx={{ 
                    background: mode === "dark"
                      ? "linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(255, 107, 157, 0.2) 100%)"
                      : "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
                    color: mode === "dark" ? "primary.main" : "white", 
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    borderBottom: mode === "dark"
                      ? "1px solid rgba(48, 54, 61, 0.5)"
                      : "1px solid rgba(255, 255, 255, 0.2)",
                    backdropFilter: mode === "dark" ? "blur(10px)" : "none",
                    WebkitBackdropFilter: mode === "dark" ? "blur(10px)" : "none",
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell
                  sx={{
                    background: mode === "dark"
                      ? "linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(255, 107, 157, 0.2) 100%)"
                      : "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
                    color: mode === "dark" ? "primary.main" : "white",
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    borderBottom: mode === "dark"
                      ? "1px solid rgba(48, 54, 61, 0.5)"
                      : "1px solid rgba(255, 255, 255, 0.2)",
                    backdropFilter: mode === "dark" ? "blur(10px)" : "none",
                    WebkitBackdropFilter: mode === "dark" ? "blur(10px)" : "none",
                    textAlign: "center",
                    minWidth: 120,
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Box sx={{ color: "text.secondary" }}>
                    {searchTerm ? "No results found" : "No data available"}
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              // Map through filtered rows and render table rows
              filteredRows.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    // Red background for countries with alert (deaths:recovered > 1:10)
                    backgroundColor: row.redAlert 
                      ? (mode === "dark" ? "rgba(255, 82, 82, 0.25)" : "rgba(255, 204, 204, 0.7)")
                      : "inherit",
                    // Bold text for alert rows
                    fontWeight: row.redAlert ? 700 : "normal",
                    // Red left border for alert rows (visual indicator)
                    borderLeft: row.redAlert 
                      ? (mode === "dark" ? "4px solid #FF5252" : "4px solid #F44336")
                      : "4px solid transparent",
                    borderBottom: mode === "dark"
                      ? "1px solid rgba(48, 54, 61, 0.3)"
                      : "1px solid rgba(208, 215, 222, 0.3)",
                    "&:hover": {
                      backgroundColor: row.redAlert
                        ? (mode === "dark" ? "rgba(255, 82, 82, 0.35)" : "rgba(255, 179, 179, 0.8)")
                        : (mode === "dark" ? "rgba(0, 229, 255, 0.08)" : "rgba(0, 102, 204, 0.08)"),
                      cursor: "pointer",
                      transform: "translateX(2px)",
                      transition: "all 0.2s ease",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {columns.map((col) => (
                    <TableCell 
                      key={col.field} 
                      sx={{ 
                        fontSize: "0.9rem",
                        textAlign: col.field === "alert" ? "center" : "left",
                      }}
                    >
                      {formatCellValue(row[col.field], col.field, row)}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell
                      sx={{
                        fontSize: "0.9rem",
                        textAlign: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        {onEdit && (
                          <Tooltip title="Edit" arrow>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(row);
                              }}
                              sx={{
                                color: "primary.main",
                                bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.1)" : "rgba(0, 102, 204, 0.1)",
                                "&:hover": {
                                  bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 102, 204, 0.2)",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {onDelete && (
                          <Tooltip title="Delete" arrow>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(row);
                              }}
                              sx={{
                                color: "error.main",
                                bgcolor: mode === "dark" ? "rgba(255, 82, 82, 0.1)" : "rgba(244, 67, 54, 0.1)",
                                "&:hover": {
                                  bgcolor: mode === "dark" ? "rgba(255, 82, 82, 0.2)" : "rgba(244, 67, 54, 0.2)",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      {onEdit && (
        <EditDialog
          open={editDialogOpen}
          onClose={() => {
            setEditDialogOpen(false);
            setSelectedRow(null);
          }}
          onSave={handleSaveEdit}
          data={selectedRow}
          columns={columns}
          title="Edit Record"
        />
      )}
    </Box>
  );
}
