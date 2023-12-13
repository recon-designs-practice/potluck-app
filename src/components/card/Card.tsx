import React from "react";
import styled from "@emotion/styled";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDb } from "../../firebase";
import { Typography } from "@mui/material";

type Props = {
  event?: any;
};

const CardContainer = styled("div")`
  border: 2px solid gray;
`;

// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

// const fetchData = async () => {
//   const docRef = doc(firestoreDb, 'events', event.id);
//   const docSnap = await getDoc(docRef);

//   console.log(docSnap);
// };

// fetchData();

export default function Card({ event }: Props) {
  const [createdByName, setCreatedByName] = React.useState(null);
  const [creatorImage, setCreatorImage] = React.useState(null);
  const { event_created_by } = event;

  React.useEffect(() => {
    async function getOneDoc() {
      const docRef = event_created_by;
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // @ts-expect-error
        const { user_name, user_image } = docSnap.data();

        setCreatedByName(user_name);

        setCreatorImage(user_image);

        // console.log("Document data:", docSnap.data());
      } else {
        console.log("No document.");
      }
    }

    getOneDoc();
  }, []);

  return (
    <CardContainer>
      <Typography variant="h6" fontWeight="bold">
        {createdByName ? createdByName : "Event name"}
      </Typography>
      <Typography variant="body1" fontWeight="medium">
        {event.event_description}
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
