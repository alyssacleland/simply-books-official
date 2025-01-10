'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import deleteAuthor from '../api/authorData';

export default function AuthorCard({ authorObj = {}, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE author AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE authorS
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name} ${authorObj.last_name}?`)) {
      deleteAuthor(authorObj.firebaseKey).then(() => onUpdate()); // TODO: understand what onUpdate does
    }
  };
  return (
    <div>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          {/* TODO: add favorite? and logic that goes with it */}
          <br />
          <Card.Title>
            {authorObj.first_name} {authorObj.last_name}
          </Card.Title>
          <p>{authorObj.email}</p>
          {/* DYNAMIC LINK TO VIEW THE author DETAILS  */}
          <Link href={`/author/${authorObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">
              VIEW
            </Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE author DETAILS  */}
          <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
