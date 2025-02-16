"use client";

import { DeleteModal } from "@/components/media/delete";
import { UpdateModal } from "@/components/media/update";
import { UploadModal } from "@/components/media/upload";
import { useGetMethodQuery } from "@/services/data-service";
import { localStorageHelper } from "@/services/local-storage-service";
import { StringFormatService } from "@/services/string-format-service";
import { ApiMethod, mediaApiUrl } from "@/shared/enums/api-enum";
import { useAppSelector } from "@/shared/hooks/redux-hook";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { Box, Button, Card, CardActions, InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";

interface MediaItem {
  _id: string;
  fileName: string;
  fileUrl: string;
  userId: string;
  fileType: string;
  createdAt: string;
  updatedAt: string;
  title: string;
}

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);

  const itemsPerPage = 10;
  const userId = localStorageHelper.getUserId();

  const filteredItems = items.filter(item => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      item.fileName.toLowerCase().includes(searchTerm)
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const userData = useAppSelector((state)=> state.user)

  const { data, isError, isLoading } = useGetMethodQuery({
    httpResponse: {
      url: StringFormatService(mediaApiUrl.getAllMedia, [userData.userId]),
      reqType: ApiMethod.GET,
      headers: {
        token: userData.token,
      }
    }
  });

  useEffect(() => {
    if (data?.response?.media) {
      setItems(data.response.media);
    }
  }, [data]);

  const handleUpdateItem = (id: string, updatedItem: { file?: File }) => {
    // Handle file update logic here
    setItems(prevItems => 
      prevItems.map(item => item._id === id ? { ...item } : item)
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const handleUpload = async (file: File) => {
    try {
      // TODO: Implement actual file upload logic
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);
      
      // TODO: Make API call to upload file
      setUploadModalOpen(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      // TODO: Add error handling and user notification
    }
  };

  if (isLoading) {
    return <Box sx={{ p: 2 }}><Typography>Loading...</Typography></Box>;
  }

  if (isError) {
    return <Box sx={{ p: 2 }}><Typography color="error">Error loading media</Typography></Box>;
  }

  return (
    <Box sx={{ 
      padding: 1, 
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: "space-between",
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 2, sm: 0 },
        mb: 1
      }}>
        <Typography variant="h4" sx={{
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          Media Dashboard
        </Typography>
        
        <Box sx={{ 
          display: "flex", 
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          width: { xs: '100%', sm: 'auto' }
        }}>
          <TextField
            size="small"
            placeholder="Search media..."
            fullWidth
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            sx={{ maxWidth: { sm: '200px' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
            sx={{ maxWidth: { sm: 'none' } }}
            onClick={() => setUploadModalOpen(true)}
          >
            Upload Media
          </Button>
          <UploadModal
            isOpen={uploadModalOpen}
            onClose={() => setUploadModalOpen(false)}
            onUpload={handleUpload}
          />
        </Box>
      </Box>

      <Box sx={{ 
        flexGrow: 1,
        overflow: 'auto',
        minHeight: 0, 
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        msOverflowStyle: 'none',  
        scrollbarWidth: 'none',    
        py: 1
      }}>
        <Grid container spacing={3}>
          {currentItems.map((item) => {

            return (
              <Grid key={item._id} size={{xs:12,sm:12,md:6,lg:4,xl:3}}>
                <Card sx={{ 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    {item.fileName}
                  </Typography>
                  <Box sx={{ mb: 2, height: 200, overflow: 'hidden' }}>
                    {item.fileType === 'image' ? (
                      <img 
                        src={`${process.env.NEXT_PUBLIC_API_URL}/`+item.fileUrl}
                        alt={item.fileName}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <video
                        src={`${process.env.NEXT_PUBLIC_API_URL}`+item.fileUrl}
                        controls
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                    Uploaded: {new Date(item.createdAt).toLocaleDateString()}
                  </Typography>
                  <CardActions>
                    <Box sx={{
                      display: "flex", 
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1
                    }}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        size="small"
                        onClick={() => setUpdateModalOpen(true)}
                      >
                        Update
                      </Button>
                      <Button 
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => setDeleteModalOpen(true)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardActions>
                </Card>

                <UpdateModal
                  isOpen={updateModalOpen}
                  onClose={() => setUpdateModalOpen(false)}
                  item={{title: item.fileName, id:item._id, fileUrl:item.fileUrl, fileType:item.fileType}}
                  onSave={(updatedItem) => {
                    handleUpdateItem(item._id, updatedItem);
                    setUpdateModalOpen(false);
                  }}
                />

                <DeleteModal 
                  isOpen={deleteModalOpen}
                  onClose={() => setDeleteModalOpen(false)}
                  onDelete={() => {
                    handleDeleteItem(item._id);
                    setDeleteModalOpen(false);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Pagination 
          count={Math.ceil(filteredItems.length / itemsPerPage)}
          color="primary" 
          size="large"
          onChange={(_, page) => setCurrentPage(page)}
          page={currentPage}
        />
      </Box>
    </Box>
  );
}
