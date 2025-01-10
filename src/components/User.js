/* eslint-disable @next/next/no-img-element */
import React from 'react';
// import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import { useAuth } from '../utils/context/authContext';

export default function User({ user = {} }) {
  // above avoids having to do const user = props.user || {};

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <img src={user.photoURL} alt="user" />
        <Card.Body>
          <Card.Title>{user.displayName}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>Last Login: {user.metadata.lastSignInTime}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    img: PropTypes.string,
  }),
};
