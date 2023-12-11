import React from "react";
import HeroSection from "./heroSection";

type Props = {};

export default function DashboardPage({}: Props) {
  return (
    <main>
      <p>Dashboard page</p>
      <HeroSection />
    </main>
  );
}
