import { Box, Button, Typography } from "@mui/material";
import Wz_Modals from "../modal";
import { useState } from "react";
import { usePostMethodMutation } from "@/services/data-service";
import { useAppSelector } from "@/shared/hooks/redux-hook";
import { StringFormatService } from "@/services/string-format-service";
import { ApiMethod, mediaApiUrl } from "@/shared/enums/api-enum";
import { toast } from "sonner";

export interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

    const token = useAppSelector(state => state.user.token)
    const [uploadMedia, { isLoading }] = usePostMethodMutation()

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile) {
            const response = await fetch(mediaApiUrl.uploadMedia, {
                method: ApiMethod.POST,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                body: selectedFile
            })
            if(response.status === 200){
                onUpload(selectedFile);
                setSelectedFile(null);
                setPreview(null);
                setError(null);
                onClose();
                toast.success("Media uploaded successfully");
                return;
            }
            toast.error("Failed to upload media");
            return
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            if (file.size > MAX_FILE_SIZE) {
                setError("File size exceeds 10MB limit");
                setSelectedFile(null);
                setPreview(null);
                return;
            }

            setSelectedFile(file);
            setError(null);
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    };

    return (
        <Wz_Modals
            isOpen={isOpen}
            handleClose={() => {
                onClose();
                setPreview(null);
                setSelectedFile(null);
                setError(null);
            }}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2
            }}
        >
            <Box>
                <Typography variant="h6" component="h2">
                    Upload Media
                </Typography>
                <Box
                    component="form"
                    sx={{ mt: 2 }}
                    onSubmit={handleSubmit}
                >
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        {selectedFile ? selectedFile.name : 'Choose File'}
                        <input
                            type="file"
                            hidden
                            accept="image/*,video/*"
                            onChange={handleFileSelect}
                        />
                    </Button>

                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    
                    {preview && (
                        <Box sx={{ mb: 2, textAlign: 'center' }}>
                            {selectedFile?.type.startsWith('image/') ? (
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    style={{ 
                                        maxWidth: '100%', 
                                        maxHeight: '200px',
                                        objectFit: 'contain' 
                                    }} 
                                />
                            ) : (
                                <video 
                                    src={preview} 
                                    controls 
                                    style={{ 
                                        maxWidth: '100%', 
                                        maxHeight: '200px' 
                                    }}
                                />
                            )}
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button onClick={() => {
                            onClose();
                            setPreview(null);
                            setSelectedFile(null);
                            setError(null);
                        }}>
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            variant="contained"
                            disabled={!selectedFile || !!error}
                        >
                            Upload
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Wz_Modals>
    );
}
