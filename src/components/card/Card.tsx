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
    // event_location,
    event_date,
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
            {event_name}
          </Typography>
        }
        subheader={event_date}
        disableTypography
        // @ts-expect-error
        avatar={<Avatar src={creatorImage} />}
      />
      <CardMedia component="img" height="200" image={event_image} />
      <CardContent>
        {/* <Typography variant="body2" color="text.secondary">{event_description}</Typography> */}
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
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
