

"use client";

import { Box } from "@mui/material";


// there is some changes in the layout file
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {children}
    </Box>
  );
}
