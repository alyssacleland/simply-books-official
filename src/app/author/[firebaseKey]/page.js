import React from 'react';
import PropTypes from 'prop-types';

export default function ViewAuthor({ params }) {
  // grab firebaseKey from url
  const { firebaseKey } = params;
  console.log(firebaseKey); // logging this for now to get rid of lint error
  return <div>view author here (dynamic)</div>;
}
ViewAuthor.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
