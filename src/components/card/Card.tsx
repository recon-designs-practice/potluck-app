import React from "react";
import { getDoc } from "firebase/firestore";
import {
  Card as MUICard,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

type Props = {
  event?: any;
};

export default function Card({ event }: Props) {
  const [creatorImage, setCreatorImage] = React.useState(null);
  const {
    event_created_by,
    event_name,
    // event_description,
    event_location,
    event_date,
    event_time,
    event_image,
  } = event;

  React.useEffect(() => {
    async function getOneDoc() {
      const docRef = event_created_by;
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // @ts-expect-error
        const { user_image } = docSnap.data();

        setCreatorImage(user_image);
      }
    }

    getOneDoc();
  });

  return (
    <MUICard variant="outlined">
      <CardHeader
        title={
          <Typography variant="h6" color="text.secondary" fontWeight="bold">
            {event_name ? event_name : "Add name"}
          </Typography>
        }
        // subheader={event_date ? event_date : "Add date"}
        disableTypography
        // @ts-expect-error
        avatar={<Avatar src={creatorImage} />}
      />
      <CardMedia component="img" height="140" image={event_image} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ margin: "0px" }}
            >
              Where
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ height: "40px", overflow: "hidden" }}
            >
              {event_location ? event_location : "Add location"}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="body1" color="text.primary">
              Time
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* {event_time ? event_time : "Add time"} */}
              {event_date ? event_date : "Add date"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event_time ? event_time : "Add time"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button
            variant="outlined"
            onClick={() => alert("RSVP button clicked.")}
            disabled
          >
            RSVP
          </Button>
          <Button onClick={() => alert("View event button clicked.")} disabled>
            View event
          </Button>
        </div>
      </CardActions>
    </MUICard>
  );
}
