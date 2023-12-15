import React from "react";
import styled from "@emotion/styled";
import {
  Dialog,
  DialogTitle,
  FormControl,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Form } from "../../components";

type Props = {
  isModalOpen?: Boolean;
  closeModal?: () => void;
};

// type StateType = {
//   eventName: String | null
// }

export default function AddEventModal({ isModalOpen, closeModal }: Props) {
  // const [isNewEventModalOpen, setIsNewEventModalOpen] = React.useState(false);
  const [eventName, setEventName] = React.useState(null);
  const [eventDescription, setEventDescription] = React.useState(null);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  return (
    <div>
      <Dialog
        // @ts-expect-error
        onClose={() => closeModal((prevState) => !prevState)}
        // @ts-expect-error
        open={isModalOpen}
        fullWidth={fullWidth}
        // @ts-expect-error
        maxWidth={maxWidth}
      >
        <DialogTitle>Create event</DialogTitle>
        <Form>
          <List>
            <ListItem>
              <FormControl fullWidth>
                <TextField
                  label="Event name"
                  type="text"
                  value={eventName}
                  // @ts-expect-error
                  onChange={(e) => setEventName(e.target.value)}
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth>
                <TextField
                  label="Event description"
                  type="text"
                  value={eventDescription}
                  // @ts-expect-error
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <Button variant="contained" onClick={() => alert(`${eventName}, ${eventDescription}`)}>
                Create
              </Button>
            </ListItem>
          </List>
        </Form>
        {/* <AddEventModal /> */}
        {/* <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem disableGutters key={email}>
              <ListItemButton onClick={() => alert("list item click fired")}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={() => alert("list item click fired")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add account" />
            </ListItemButton>
          </ListItem>
        </List> */}
      </Dialog>
    </div>
  );
}
