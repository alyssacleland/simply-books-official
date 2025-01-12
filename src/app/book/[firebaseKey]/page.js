/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import { viewBookDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

// the link for the view details in the BookCard component looks like href={`/book/${bookObj.firebaseKey}, so the button in BookCard will take us to this page (for a specific book)
export default function ViewBook({ params }) {
  // params is an object containing the firebaseKey
  const [bookDetails, setBookDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params; // this ia same as params.firebaseKey but destructured so we can use firebaseKey directly
  // URL looks like this: .../book/%5BfirebaseKey%5D

  // make call to API layer to get the data
  useEffect(() => {
    viewBookDetails(firebaseKey).then(setBookDetails);
  }, [firebaseKey]); // when firebaseKey changes, useEffect will run again
  // viewBookDetails results in an object containing authorObject and properties of bookObject like this structure: { authorObject: { ... }, (book)title: '...', ... }.

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={bookDetails.image} alt={bookDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        {/* i'm not sure why details is here above b/c it's not in globals.css and nothing changes if i remove it */}
        <h5>
          {bookDetails.title} by {bookDetails.authorObject?.first_name} {bookDetails.authorObject?.last_name}
          {bookDetails.authorObject?.favorite ? '   ⭐' : ''}
        </h5>
        Author Email: <a href={`mailto:${bookDetails.authorObject?.email}`}>{bookDetails.authorObject?.email}</a>
        {/* TODO: understand the ? in the above line */}
        <p>{bookDetails.description || ''}</p>
        <Link href={`/author/${bookDetails.author_id}`} passHref>
          {/* above, bookDetails.author_id is the author's firebaseKey */}
          <Button variant="primary" className="m-2">
            VIEW AUTHOR
          </Button>
        </Link>
        <hr />
        <p>{bookDetails.sale ? `🏷️ Sale $${bookDetails.price}` : `$${bookDetails.price}`}</p>
      </div>
    </div>
  );
}

ViewBook.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
