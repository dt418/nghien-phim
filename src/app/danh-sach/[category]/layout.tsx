import type { PropsWithChildren } from 'react'
import React from 'react'

export default function FilmListLayout(props: Readonly<PropsWithChildren>) {
  return <main className="container">{props.children}</main>
}
