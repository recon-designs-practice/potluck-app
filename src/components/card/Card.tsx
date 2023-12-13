import React from "react";
import styled from "@emotion/styled";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDb } from "../../firebase";

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
  return (
    <CardContainer>
      <p>{`${event.id}: ${event.event_name}`}</p>
    </CardContainer>
  );
}
