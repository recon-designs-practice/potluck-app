import React from "react";
import useEventsStore from "../../stores/eventsStore";
import { Card } from "../../components";
import HeroSection from "./heroSection";

type Props = {};

export default function DashboardPage({}: Props) {
  // @ts-expect-error
  const allEvents = useEventsStore((state) => state.allEvents);

  return (
    <main>
      <p>Dashboard page</p>
      {allEvents && (
        <ul>
          {allEvents.map((event: any, idx: Number) => {
            return <Card event={event} />;
          })}
        </ul>
      )}
      <HeroSection />
    </main>
  );
}
