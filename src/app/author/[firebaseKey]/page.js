'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { viewAuthorDetails } from '../../../api/mergedData';
import BookCard from '../../../components/BookCard';

export default function ViewAuthor({ params }) {
  // grab firebaseKey from url. see notes in ViewBook for more on how this works.
  const { firebaseKey } = params;

  const [authorDetails, setAuthorDetails] = useState({});

  useEffect(() => {
    // call back function
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]); // depenedency array: when firebaseKey changes, useEffect will run again

  const books = authorDetails.books || []; // if authorDetails.books is undefined, set books to an empty array TODO: understand why this fixed it...

  // Because of the way ViewAuthorDetails is structured, authorDetails will be an object with the authorObject properties directly accessible via authorDetails, and author books array accessible via authorDetails.books. Can map through that array simliar to how we did in Home page (with BookCard component).
  return (
    <div>
      <div style={{ display: 'flex', alignItms: 'center' }}>
        <Card.Img variant="top" src={authorDetails.image} alt={authorDetails.title} style={{ width: '400px' }} />
        <div style={{ marginLeft: '2rem' }}>
          <h2 className="text-white" style={{ marginTop: '2rem' }}>
            {authorDetails.first_name} {authorDetails.last_name} {authorDetails.favorite && '   ⭐'}
          </h2>
          <h4>
            Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
          </h4>
        </div>
      </div>
      <hr />
      <h3>Books:</h3>
      <div className="d-flex flex-wrap">
        {/* map over books here using BookCard component */}
        {books.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} />
          // got rid of onUpdate above bc it was undefined. idk if need it. i think it's only for delete? TODO: deal with that.
        ))}
      </div>
    </div>
  );
}
ViewAuthor.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
