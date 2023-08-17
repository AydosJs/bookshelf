import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import theme from '../../../themes';
import { Button, FormControl, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "6px"
};

type Props = {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

export default function CreateBook({ handleClose, open }: Props) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" sx={{ mb: 6, fontWeight: 500, color: theme.palette.text.primary }} component="h2">
            Create a Book
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <Box mb={2}>
              <TextField sx={{ width: "100%" }} id="outlined-basic" label="Title" variant="outlined" />
            </Box>
            <Box mb={2}>
              <TextField sx={{ width: "100%" }} id="outlined-basic" label="Cover link" variant="outlined" />
            </Box>
            <Box mb={2}>
              <TextField sx={{ width: "100%" }} id="outlined-basic" label="Published date" variant="outlined" />
            </Box>
            <Box >
              <TextField type='number' sx={{ width: "100%" }} id="outlined-basic" label="Pages" variant="outlined" />
            </Box>

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 6 }}
            >
              Create
            </Button>

          </FormControl>
        </Box>
      </Modal>
    </div>
  )
}