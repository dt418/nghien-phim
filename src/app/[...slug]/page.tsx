import { notFound } from 'next/navigation';

export const runtime = 'nodejs';

export default function CatchAll() {
  notFound();
}
