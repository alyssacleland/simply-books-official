'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getAuthors } from '../../api/authorData';
import { createBook, updateBook } from '../../api/bookData';

const initialState = {
  // this is the default value for obj prop. If obj prop is not passed (i.e., for create), this will be used.
  description: '',
  image: '',
  price: '',
  sale: false,
  title: '',
  author_id: '',
};

function BookForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj); // sets the initial state of the form to the obj prop that is passed in (in the case of editing a book) or to the default value of initial state (in the case of creating a book)
  const [authors, setAuthors] = useState([]);
  const router = useRouter(); // gives us access to the router object. note: push works on router object. usually push only works on arrays, but for some reason it works on the router object. i guess it's a special object that has a push method?? it's not the same as push for arrays. it's a method that allows us to navigate to a different page.
  const { user } = useAuth(); // gives us access to the user object

  useEffect(() => {
    getAuthors(user.uid).then(setAuthors); // gets the authors from the database and sets them in the authors state

    if (obj.firebaseKey) setFormInput(obj); // if the obj prop has a firebaseKey (editing case), set the form input to the obj prop
  }, [obj, user]);

  // this is used in each input field for onChange. Every time the input field changes, this function is called. It updates the formInput state with the new value of the input field.
  const handleChange = (e) => {
    const { name, value } = e.target; // destructure the name and value from the target of the event
    setFormInput((prevState) => ({
      ...prevState, // spread in the previous state so we don't lose any other values in the state
      [name]: value, // title input example: name="title" value={formInput.title}, so [name]: value is "title": "{formInput.title}"
    }));
  };

  // router.push() tells Next.js to load a new route, just like clicking a link would
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents the form from refreshing the page
    if (obj.firebaseKey) {
      // if the obj prop has a firebaseKey (EDITING)
      updateBook(formInput).then(() => router.push(`/book/${obj.firebaseKey}`)); // navigates to the book's details page
    } else {
      // if the obj prop does not have a firebaseKey (CREATING)
      const payload = { ...formInput, uid: user.uid }; // creates a payload object with the form input and the user's uid
      createBook(payload).then(({ name }) => {
        // creaes a book with the payload. the name is the firebase key of the book that was created
        const patchPayload = { firebaseKey: name }; // patch payload with the firebase key of the book that was created
        updateBook(patchPayload).then(() => {
          // updates the book with the patch payload (adds the firebase key to the book)
          router.push('/'); // navigates to the home page
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Book</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Book Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter a title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Book Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Book Price" className="mb-3">
        <Form.Control type="text" placeholder="Enter price" name="price" value={formInput.price} onChange={handleChange} required />
      </FloatingLabel>

      {/* AUTHOR SELECT  */}
      {/* https://react-bootstrap.netlify.app/docs/forms/select */}
      <FloatingLabel controlId="floatingSelect" label="Author">
        <Form.Select aria-label="Author" name="author_id" onChange={handleChange} className="mb-3" value={formInput.author_id || ''} required>
          <option value="">Select an Author</option>
          {authors.map((author) => (
            <option key={author.firebaseKey} value={author.firebaseKey}>
              {author.first_name} {author.last_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="sale"
        name="sale"
        label="On Sale?"
        checked={formInput.sale} // sets the checked value of the switch to the value of the sale property in the formInput state
        // this uses a different way to handle the onChange event for the switch. it uses an arrow function to update the formInput state with the new value of the switch.
        // checked attribute of an HTML element is a boolean attribute. When the checkbox or switch is checked, the checked attribute is true, and when it is unchecked, the checked attribute is false.
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked, // sets the sale property in the formInput state to the checked value of the switch
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      {/* on the button, display the word create vs update based on whether the obj prop has a firebaseKey */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Book</Button>
    </Form>
  );
}

BookForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    sale: PropTypes.bool,
    title: PropTypes.string,
    author_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default BookForm;
