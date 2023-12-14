import React from "react";
import styled from "@emotion/styled";
import { getDoc } from "firebase/firestore";
import { Typography } from "@mui/material";

type Props = {
  event?: any;
};

const CardContainer = styled("div")`
  border: 2px solid gray;
`;

export default function Card({ event }: Props) {
  const [createdByName, setCreatedByName] = React.useState(null);
  const [creatorImage, setCreatorImage] = React.useState(null);
  const {
    event_created_by,
    event_name,
    event_description,
    event_location,
    event_date,
  } = event;

  const eventDate = event_date.toDate().toLocaleString();

  React.useEffect(() => {
    async function getOneDoc() {
      const docRef = event_created_by;
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // @ts-expect-error
        const { user_name, user_image } = docSnap.data();

        setCreatedByName(user_name);

        setCreatorImage(user_image);
      }
    }

    getOneDoc();
  }, []);

  return (
    <CardContainer>
      <Typography variant="h6" fontWeight="bold">
        {event_name ? event_name : "Event name"}
      </Typography>
      <Typography variant="body1" fontWeight="medium">
        {event_description}
      </Typography>
      <Typography variant="body2" fontWeight="medium">
        {event_location}
      </Typography>
      <Typography variant="body2" fontWeight="medium">
        {eventDate ? eventDate : "Date:"}
      </Typography>
      <Typography variant="body2" fontWeight="regular">
        {`By ${createdByName ? createdByName : ""}`}
      </Typography>
      {creatorImage && (
        <div
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            overflow: "hidden",
            background: `url(${creatorImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />
      )}
    </CardContainer>
  );
}
