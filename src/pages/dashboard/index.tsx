import React from "react";
import useEventsStore from "../../stores/eventsStore";
import { Button } from "@mui/material";
import { Card } from "../../components";

type Props = {};

export default function DashboardPage({}: Props) {
  // @ts-expect-error
  const allEvents = useEventsStore((state) => state.allEvents);

  async function handleAddEvent() {
    // const eventId = uuid();
    alert("Add event button clicked.");
  }

  return (
    <main>
      <Button
        onClick={handleAddEvent}
        variant="contained"
        size="large"
        style={{ fontWeight: "bold" }}
      >
        Add event
      </Button>
      {allEvents && (
        <ul>
          {allEvents.map((event: any, idx: Number) => {
            return <Card event={event} />;
          })}
        </ul>
      )}
    </main>
  );
}
