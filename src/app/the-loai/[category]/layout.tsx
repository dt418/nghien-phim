import React, { type PropsWithChildren } from 'react';

export default function CategoryLayout(props: Readonly<PropsWithChildren>) {
  return <main className="container">{props.children}</main>;
}
