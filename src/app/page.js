/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';

// We use state with a variable, books. We update books with setBooks. We make a function, getAllTheBooks, that retrieves the books by API call getBooks, and we set books equal to that array of books with setBooks.
// We actually call getAllTheBooks in a useEffect that runs on component render. Without this, the books array would be empty on render because the API call is asynchronous and would not have completed by the time the component renders.
// We loop through the books array and render a BookCard component for each book.

function Home() {
  // Set a state for books
  const [books, setBooks] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getBooks(user.uid).then(setBooks);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheBooks();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/book/new" passHref>
        <Button>Add A Book</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over books here using BookCard component */}
        {books.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
        ))}
      </div>
    </div>
  );
}

export default Home;
