'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/context/authContext';
import { createBook, updateBook } from '../api/bookData';

function DiscoverBookCard({ bookObj }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleAdd = () => {
    // Create a new book with the user's id, auto set it to private
    console.log(user.uid);
    const payload = {
      author_id: bookObj.author_id,
      description: bookObj.description,
      image: bookObj.image,
      price: bookObj.price,
      public: false,
      sale: bookObj.sale,
      title: bookObj.title,
      uid: user.uid,
    };
    createBook(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateBook(patchPayload).then(() => {
        router.push('/'); // TODO: later can change this to make the button say "this book has been added to your collection" but probably won't actually do this. then we would need to track the books that have been added to the user's collection somehow and not show them in the discover page and that is beyond me right now
      });
    });
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={bookObj.image} alt={bookObj.title} style={{ height: '400px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{bookObj.title}</Card.Title>
        <p className="card-text bold">
          {bookObj.sale && ( // short circuit evaluation: if sale is true, then display SALE
            <span className="bg-success text-white p-1">
              SALE
              <br />
            </span>
          )}{' '}
          ${bookObj.price}
        </p>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/book/${bookObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        {/* add to user's collection  */}
        <Button variant="primary" className="m-2" onClick={handleAdd}>
          ADD TO MY COLLECTION
        </Button>
      </Card.Body>
    </Card>
  );
}

DiscoverBookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
    author_id: PropTypes.string,
  }).isRequired,
};

export default DiscoverBookCard;
