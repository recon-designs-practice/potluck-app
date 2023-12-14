import React from "react";
import useEventsStore from "../../stores/eventsStore";
import { Card } from "../../components";

type Props = {};

export default function DashboardPage({}: Props) {
  // @ts-expect-error
  const allEvents = useEventsStore((state) => state.allEvents);

  return (
    <main>
      {allEvents && (
        <div>
          {allEvents.map((event: any, idx: Number) => {
            return <Card event={event} />;
          })}
        </div>
      )}
    </main>
  );
}
