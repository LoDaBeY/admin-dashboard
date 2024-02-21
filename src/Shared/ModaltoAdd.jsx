import { Box, Modal } from "@mui/material";



function ModaltoAdd({ children, handleClose, open }) {
  return (
    <Box>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
              position: "fixed",
              top: {xs: "15%", md: "50%"},
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {xs: 350, md: 400},
              bgcolor: "background.paper",
              border: "none",
              borderRadius: "10px",
              boxShadow: 24,
              p: 4,
          }}>{children}</Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default ModaltoAdd;
