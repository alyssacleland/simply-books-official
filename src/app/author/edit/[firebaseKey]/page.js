import React from 'react';
import PropTypes from 'prop-types';

export default function EditAuthor({ params }) {
  // grab firebaseKey from url
  const { firebaseKey } = params;
  console.log(firebaseKey); // logging this for now to get rid of lint error
  return <div>edit author here (dynamic)</div>;
}
EditAuthor.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
