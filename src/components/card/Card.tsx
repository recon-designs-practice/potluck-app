import React from "react";
import { getDoc } from "firebase/firestore";
import {
  Card as MUICard,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  // Collapse,
  Avatar,
  // IconButton,
  Button,
  Typography,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  event?: any;
};

export default function Card({ event }: Props) {
  // const [createdByName, setCreatedByName] = React.useState(null);
  const [creatorImage, setCreatorImage] = React.useState(null);
  // const [isReadMoreOpen, setIsReadMoreOpen] = React.useState(false);
  const {
    event_created_by,
    event_name,
    // event_description,
    // event_location,
    event_date,
    event_image,
  } = event;

  const eventDate = event_date.toDate().toLocaleString();

  React.useEffect(() => {
    async function getOneDoc() {
      const docRef = event_created_by;
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // @ts-expect-error
        // const { user_name, user_image } = docSnap.data();
        const { user_image } = docSnap.data();


        // setCreatedByName(user_name);

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
        subheader={eventDate}
        disableTypography
        // @ts-expect-error
        avatar={<Avatar src={creatorImage} />}
      />
      <CardMedia component="img" height="200" image={event_image} />
      <CardContent>
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
        {/* <ExpandMore
          expand={isReadMoreOpen}
          onClick={() => setIsReadMoreOpen((prevState) => !prevState)}
          aria-expanded={isReadMoreOpen}
          aria-label="expand"
        >
          <ExpandMoreIcon timeout="auto" unmountOnExit />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={isReadMoreOpen}>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </MUICard>
  );
}
