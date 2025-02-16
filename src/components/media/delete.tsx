import { Box, Button, Typography } from "@mui/material";
import Wz_Modals from "../modal";
import { usePostMethodMutation } from "@/services/data-service";
import { ApiMethod, mediaApiUrl } from "@/shared/enums/api-enum";
import { useAppSelector } from "@/shared/hooks/redux-hook";
import { StringFormatService } from "@/services/string-format-service";

export interface DeleteModalProps {
  isOpen: boolean;
  id:string
  onClose: () => void;
  onDelete: () => void;
}



export function DeleteModal({id, isOpen, onClose, onDelete }: DeleteModalProps) {
    const token = useAppSelector(state => state.user.token)



    
    return (
        <Wz_Modals
            isOpen={isOpen}
            handleClose={onClose}
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
                    Confirm Delete
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Are you sure you want to delete this item? This action cannot be undone.
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button 
                        variant="contained" 
                        color="error"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Wz_Modals>
    );
}