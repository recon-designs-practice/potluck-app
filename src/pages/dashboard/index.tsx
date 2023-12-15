import React from "react";
import styled from "@emotion/styled";
import useEventsStore from "../../stores/eventsStore";
// import { useParams } from 'react-router-dom'
import { Card } from "../../components";
import { Unstable_Grid2 } from "@mui/material";
const Grid = Unstable_Grid2;

type Props = {};

const Main = styled("main")`
  box-sizing: border-box;
  position: relative;
  padding: 20px 20px;

  @media (min-width: 600px) {
    padding: 40px 40px;
  }

  @media (min-width: 900px) {
    padding: 80px 80px;
  }
`;

export default function DashboardPage({}: Props) {
  // @ts-expect-error
  const allEvents = useEventsStore((state) => state.allEvents);
  // let userId = useParams()

  // console.log(444, userId)

  return (
    <Main>
      {allEvents && (
        <Grid container spacing={2}>
          {allEvents.map((event: any, idx: Number) => {
            return (
              <Grid xs={12} md={6} lg={3}>
                <Card event={event} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Main>
  );
}
