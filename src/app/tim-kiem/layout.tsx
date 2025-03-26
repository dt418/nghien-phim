import type { PropsWithChildren } from 'react'
import React from 'react'

export default function SearchLayout(props: Readonly<PropsWithChildren>) {
  const { children } = props
  return <main className="container">{children}</main>
}
