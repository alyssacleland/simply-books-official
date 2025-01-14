/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { getPublicBooks } from '../../api/bookData';
import DiscoverBookCard from '../../components/DiscoverBookCard';

// TODO: Would be cool if i could actually loop through books from an API like google books instead?

// We use state with a variable, books. We update books with setBooks. We make a function, getAllTheBooks, that retrieves the books by API call getBooks, and we set books equal to that array of books with setBooks.
// We actually call getAllTheBooks in a useEffect that runs on component render. Without this, the books array would be empty on render because the API call is asynchronous and would not have completed by the time the component renders.
// We loop through the books array and render a BookCard component for each book.

function DiscoverBooks() {
  // Set a state for books
  const [books, setBooks] = useState([]);

  // create a function that makes the API call to get all the books
  const getThePublicBooks = () => {
    getPublicBooks().then(setBooks);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getThePublicBooks();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* map over books here using BookCard component */}
        {books.map((book) => (
          <DiscoverBookCard key={book.firebaseKey} bookObj={book} />
        ))}
      </div>
    </div>
  );
}

export default DiscoverBooks;
