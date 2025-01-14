import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

const getBooks = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// TODO: DELETE BOOK
const deleteBook = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: GET SINGLE BOOK
const getSingleBook = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: CREATE BOOK
const createBook = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: UPDATE BOOK
const updateBook = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getBooksByAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const booksOnSale = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const onSale = Object.values(data).filter((item) => item.sale);
        resolve(onSale);
      })
      .catch(reject);
  });

// TODO: STRETCH...SEARCH BOOKS
const bookSearch = (uid, searchValue) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
      // update to order by uid
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const searchBooks = Object.values(data).filter((item) => item.title.toLowerCase().includes(searchValue));
        // you fetch the user's books by uid and then filter them in JavaScript to keep only those that you search for. how? ...
        // Object.values(data): This method takes the data object (which is the books retrieved from the database) and extracts all of its values. Since Firebase stores data in an object with each key being a unique book ID, Object.values(data) will return an array of book objects.
        // .filter((item) => XXX : This .filter() method goes through the array of books and returns only the books where XXX is true.
        resolve(searchBooks);
      })
      .catch(reject);
  });

// GET PUBLIC BOOKS
const getPublicBooks = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="public"&equalTo=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getBooks, createBook, booksOnSale, deleteBook, getSingleBook, updateBook, getBooksByAuthor, bookSearch, getPublicBooks };
