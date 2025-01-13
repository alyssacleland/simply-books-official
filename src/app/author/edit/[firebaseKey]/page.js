'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthorForm from '../../../../components/forms/AuthorForm';
import { getSingleAuthor } from '../../../../api/authorData';

export default function EditAuthor({ params }) {
  // grab firebaseKey from url
  const { firebaseKey } = params;

  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <div>
      <AuthorForm obj={editItem} />
    </div>
  );
}
EditAuthor.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
