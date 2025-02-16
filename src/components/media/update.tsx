import { Box, Button, TextField, Typography } from "@mui/material";
import Wz_Modals from "../modal";
import { useState } from "react";
import { usePostMethodMutation } from "@/services/data-service";
import { ApiMethod, mediaApiUrl } from "@/shared/enums/api-enum";
import { useAppSelector } from "@/shared/hooks/redux-hook";
import { StringFormatService } from "@/services/string-format-service";
import { toast } from "sonner";

export function UpdateModal({ 
  isOpen, 
  onClose,
  item,
  onSave
}: {
  isOpen: boolean;
  onClose: () => void;
  item: { title: string; id: string;  fileUrl: string;fileType:string  };
  onSave: (updatedItem: { file?: File }) => void;
}) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const [updateMedia, { isLoading }] = usePostMethodMutation()
    const token = useAppSelector(state => state.user.token)
    const handleSave = async () => {
        const response = await updateMedia({
            httpResponse: {
                url: StringFormatService(mediaApiUrl.updateMedia, [item.id]),
                reqType: ApiMethod.PATCH,
                headers: {
                    token: token
                }
            }
        });
        if (response.data?.statusCode === 200) {
            toast.success("Media updated successfully");
            setPreview(null);
            setSelectedFile(null);
            onClose();
            return
        }
        toast.error("Failed to update media");
    };

    return (
        <Wz_Modals
            isOpen={isOpen}
            handleClose={onClose}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2
            }}
        >
            <Box>
                <Typography variant="h6" component="h2">
                    Update Item
                </Typography>

                <Box sx={{ mt: 2, height: 200, overflow: 'hidden' }}>
                    {item.fileType === 'image' ? (
                        <img 
                            src={preview || item.fileUrl}
                            alt={item.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    ) : (
                        <video
                            src={preview || item.fileUrl}
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

                <Button
                    variant="outlined"
                    component="label"
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    Choose New File
                    <input
                        type="file"
                        hidden
                        accept={item.fileType === 'image' ? 'image/*' : 'video/*'}
                        onChange={handleFileSelect}
                    />
                </Button>

                
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save Changes</Button>
                </Box>
            </Box>
        </Wz_Modals>
    );
}