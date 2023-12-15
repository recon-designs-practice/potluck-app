import React from "react";
import { useRouteError } from "react-router-dom";

// type Props = {};

export default function ErrorPage() {
  const routeError = useRouteError();
  console.log(routeError);

  return (
    <main>
      <section>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          {/** @ts-expect-error */}
          <i>{routeError.statusText || routeError.message}</i>
        </p>
      </section>
    </main>
  );
}
