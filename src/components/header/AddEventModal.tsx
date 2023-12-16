import React from "react";
import { v4 as uuid } from "uuid";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "../../firebase";
import useUserStore from "../../stores/userStore";
// import useEventsStore from "../../stores/eventsStore";
import {
  Dialog,
  DialogTitle,
  FormControl,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Form } from "../../components";

type Props = {
  isModalOpen?: Boolean;
  closeModal?: () => void;
};

export default function AddEventModal({ isModalOpen, closeModal }: Props) {
  // @ts-expect-error
  const currentUser = useUserStore((state) => state.currentUser);
  // const allEvents = useEventsStore((state) => state.allEvents);
  const [eventName, setEventName] = React.useState(null);
  // const [eventDescription, setEventDescription] = React.useState(null);
  const [eventDate, setEventDate] = React.useState(null);
  const [eventLocation, setEventLocation] = React.useState(null);
  const [eventTime, setEventTime] = React.useState(null);

  async function handleAddEvent(e: any) {
    e.preventDefault();
    const { user_uid, user_rsvp_events, user_created_events } = currentUser;
    const uniqueId = uuid();
    const userDocumentRef = doc(firestoreDb, "users", user_uid);
    const newEventRef = doc(firestoreDb, "events", uniqueId);

    setDoc(newEventRef, {
      event_name: eventName ? eventName : null,
      // event_description: eventDescription,
      event_description: null,
      // @ts-expect-error
      event_date: eventDate ? eventDate.format("MMMM D, YYYY (dddd)") : null,
      event_time: eventTime ? eventTime : null,
      event_location: eventLocation ? eventLocation : null,
      event_created_by: userDocumentRef,
      event_image:
        "https://images.unsplash.com/photo-1583779791512-eeccdee5c5dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWNkb25hbGRzfGVufDB8fDB8fHww",
      event_rsvp_users: [userDocumentRef],
    })
      .then(() => console.log("Field with reference added successfully."))
      .catch((error) =>
        console.log("Error adding field with refernce.", error)
      );

    updateDoc(userDocumentRef, {
      user_created_events: [...user_created_events, newEventRef],
      user_rsvp_events: [...user_rsvp_events, newEventRef],
    })
      .then(() => console.log("Field with reference added successfully."))
      .catch((error) =>
        console.log("Error adding field with refernce.", error)
      );

    setEventName(null);
    // setEventDescription(null);
    setEventDate(null);
    setEventLocation(null);
    setEventTime(null);
    // @ts-expect-error
    closeModal((prevState) => !prevState);
  }

  function handleDialogOnClose() {
    setEventName(null);
    // setEventDescription(null);
    setEventDate(null);
    setEventLocation(null);
    setEventTime(null);
    // @ts-expect-error
    closeModal((prevState) => !prevState);
  }

  function handleCloseModalClick() {
    setEventName(null);
    // setEventDescription(null);
    setEventDate(null);
    setEventLocation(null);
    setEventTime(null);
    // @ts-expect-error
    closeModal((prevState) => !prevState);
  }

  function handleDateChange(date: any) {
    setEventDate(date);
  }

  return (
    <div>
      <Dialog
        onClose={handleDialogOnClose}
        // @ts-expect-error
        open={isModalOpen}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Create event</DialogTitle>
        {/** @ts-expect-error */}
        <Form onsubmit={(e) => handleAddEvent(e)}>
          <List>
            <ListItem>
              <FormControl fullWidth>
                <TextField
                  label="Name"
                  type="text"
                  value={eventName}
                  // @ts-expect-error
                  onChange={(e) => setEventName(e.target.value)}
                />
              </FormControl>
            </ListItem>
            {/* <ListItem>
              <FormControl fullWidth>
                <TextField
                  label="Description"
                  type="text"
                  value={eventDescription}
                  // @ts-expect-error
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </FormControl>
            </ListItem> */}
            <ListItem sx={{ gap: "20px" }}>
              <FormControl fullWidth>
                <DatePicker
                  label="Date"
                  value={eventDate}
                  onChange={handleDateChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Time"
                  type="text"
                  value={eventTime}
                  // @ts-expect-error
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth>
                <TextField
                  label="Location"
                  type="text"
                  value={eventLocation}
                  // @ts-expect-error
                  onChange={(e) => setEventLocation(e.target.value)}
                />
              </FormControl>
            </ListItem>
            <ListItem sx={{ gap: "20px" }}>
              <Button variant="contained" type="submit" size="large">
                Create
              </Button>
              <Button
                type="button"
                size="large"
                onClick={handleCloseModalClick}
              >
                Cancel
              </Button>
            </ListItem>
          </List>
        </Form>
      </Dialog>
    </div>
  );
}
