import { Book } from '@/features/books/components';
import React from 'react';

export default function page() {
  return (
    <>
      <section className="w-full md:mx-20 flex justify-center">
        <Book />
      </section>
    </>
  )
};
