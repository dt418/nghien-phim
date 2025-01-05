import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '404: Page could not be found',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 px-6 py-28 md:px-24 md:py-20 lg:flex-row lg:gap-28 lg:py-32">
      <div className="w-full lg:w-1/2">
        <Image
          className="hidden lg:block"
          src="/bg_001.png"
          alt="Image 1"
          width={518}
          height={349}
        />
        <Image
          className="hidden md:block lg:hidden"
          src="/bg_002.png"
          alt="Image 2"
          width={415}
          height={259}
        />
        <Image
          className="md:hidden"
          src="/bg_003.png"
          alt="Image 3"
          width={320}
          height={207}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-4 text-3xl font-extrabold lg:text-4xl">
          Looks like you&apos;ve found the doorway to the great nothing
        </h1>
        <p className="py-2 text-base">
          The content you’re looking for doesn’t exist. Either it was removed,
          or you mistyped the link.
        </p>
        <p className="py-2 text-base">
          Sorry about that! Please visit our hompage to get where you need to
          go.
        </p>
        <Button className="mt-4 w-full lg:w-auto" size={'lg'} asChild>
          <Link href={'/'}>Go back to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
