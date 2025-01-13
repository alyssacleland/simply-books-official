'use client';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { updateAuthor, createAuthor } from '../../api/authorData';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  image: '',
  favorite: false,
};

export default function AuthorForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]); // whenever obj changes, if it has a firebaseKey, set the form input to the obj

  // when input field changes, upate formInput with that input (and with prev state to prevent overwriting/so we get whole thing)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      // make payload containing formInput and the uid
      const payload = { ...formInput, uid: user.uid };
      // create author with payload
      createAuthor(payload).then(({ name }) => {
        // name is the firebase key of the newly created author
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push(`/authors`);
        });
      });
    }
  };

  return (
    <div>
      {/* // note to self: apparently the className="text-black" matters a ton. labels weren't showing up until clickign input (just empty inputs) without it. */}
      <Form onSubmit={handleSubmit} className="text-black">
        <h2 className="text-white mt-5"> {obj.firebaseKey ? 'Update' : 'Create'} Author</h2>
        {/* FIRST NAME INPUT */}
        <FloatingLabel controlId="floatingInputFirstName" label="First Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter First Name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
        </FloatingLabel>

        {/* LAST NAME INPUT */}
        <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Last Name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
        </FloatingLabel>

        {/* EMAIL INPUT */}
        <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
          <Form.Control type="email" placeholder="Enter Email" name="email" value={formInput.email} onChange={handleChange} required />
        </FloatingLabel>

        {/* IMAGE URL INPUT */}
        <FloatingLabel controlId="floatingInput4" label="image" className="mb-3">
          <Form.Control type="url" placeholder="Enter image URL" name="image" value={formInput.image} onChange={handleChange} required />
        </FloatingLabel>

        {/* FAVORITE CHECK */}
        <Form.Check
          className="text-white mb3"
          type="switch"
          label="Favorite?"
          id="favorite"
          name="favorite"
          checked={formInput.favorite}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              favorite: e.target.checked,
            }));
          }}
        />

        {/* SUBMIT BUTTON */}
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
      </Form>
    </div>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
  }),
};
