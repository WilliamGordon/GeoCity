import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InboxIcon from '@mui/icons-material/MoveToInbox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const SideBar = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const generateItinary = () => {
    props.generateItinary();
  }

  return (
    <Drawer
      elevation={16}
      sx={{
        width: "33%",
        flexShrink: 0,
        zIndex: 1301,
        '& .MuiDrawer-paper': {
          width: "33%",
          boxSizing: 'border-box',
          position: "fixed",
          top: "65px",
          height: 'calc(100% - 65px)'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="overline" display="block" gutterBottom align="center" component="div" sx={{ fontSize: "initial", width: "80%", margin: "0 auto" }}>
          Create your itinary
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {
          props.pointOfInterestList &&
          props.pointOfInterestList.map((p) => {
            return <ListItem button key={p.id} onClick={handleOpen}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={p.id + "|" + p.position[0].toString().substring(0, 5) + "_" + p.position[1].toString().substring(0, 5)} />
            </ListItem>
          })
        }
      </List>
      <Button variant="contained" sx={{
        marginBottom: "15px !important",
        color: '#9fafce',
        backgroundColor: "#10377a",
        width: "90%",
        margin: "0 auto",
        '&:hover': {
          backgroundColor: "#10377a", color: '#ffffff'
        }
      }}>
        Add new step
      </Button>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Button
        onClick={generateItinary}
        variant="contained"
        sx={{
          marginBottom: "15px !important",
          color: '#9fafce',
          backgroundColor: "#10377a",
          width: "90%",
          margin: "0 auto",
          '&:hover': {
            backgroundColor: "#10377a", color: '#ffffff'
          }
        }}>
        {props.itinaryIsGenerated && <>Reset</>}
        {!props.itinaryIsGenerated && <>Generate Itinary</>}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <TextField
              id="itinaryName-input"
              name="itinaryName"
              label="Name"
              type="text"
              autoComplete='off'
              required
              fullWidth
              sx={{
                marginTop: 4,
                marginBottom: 4,
              }}
            />
            <TextField
              id="itinaryName-input"
              name="itinaryName"
              label="Price"
              type="text"
              autoComplete='off'
              required
              fullWidth
              sx={{
                marginBottom: 4,
              }}
            />
            <TextField
              id="itinaryName-input"
              name="itinaryName"
              label="Duration"
              type="text"
              autoComplete='off'
              required
              fullWidth
              sx={{
                marginBottom: 4,
              }}
            />
            <TextField
              multiline
              rows={5}
              id="itinaryDescription-input"
              name="itinaryDescription"
              label="Description"
              type="text"
              autoComplete='off'
              required
              fullWidth
              sx={{
                marginBottom: 4,
              }}
            />
        </Box>
      </Modal>
    </Drawer>
  );
}

export default SideBar;