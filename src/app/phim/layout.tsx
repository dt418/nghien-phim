import React, { type PropsWithChildren } from "react";

export default function FilmLayout(props: PropsWithChildren) {
  return <main className="container">{props.children}</main>;
}
