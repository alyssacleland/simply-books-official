import React from 'react';
import PropTypes from 'prop-types';
import AuthorForm from '../../../../components/forms/AuthorForm';

export default function EditAuthor({ params }) {
  // grab firebaseKey from url
  const { firebaseKey } = params;
  console.log(firebaseKey); // logging this for now to get rid of lint error

  // TODO: need to get single author data to pass to form
  return (
    <div>
      <AuthorForm />
    </div>
  );
}
EditAuthor.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
