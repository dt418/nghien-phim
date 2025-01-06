import React, { type PropsWithChildren } from 'react';

export default function SearchLayout(props: Readonly<PropsWithChildren>) {
  return <main className="container">{props.children}</main>;
}
