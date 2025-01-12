import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleBook(bookFirebaseKey)
      .then((bookObject) => {
        getSingleAuthor(bookObject.author_id).then((authorObject) => {
          // bookObject.author_id is the author's firebaseKey
          resolve({ authorObject, ...bookObject }); // results in an object containing authorObject and properties of bookObject like this structure: { authorObject: { ... }, (book)title: '...', ... }.
        });
      })
      .catch((error) => reject(error));
  });

const viewAuthorDetails = (authorFirebaseKey) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
      .then(([authorObject, authorBooksArray]) => {
        resolve({ ...authorObject, books: authorBooksArray });
      })
      .catch((error) => reject(error));
  });

const deleteAuthorBooks = (authorId) =>
  new Promise((resolve, reject) => {
    getAuthorBooks(authorId)
      .then((booksArray) => {
        console.warn(booksArray, 'Author Books');
        const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

        Promise.all(deleteBookPromises).then(() => {
          deleteSingleAuthor(authorId).then(resolve);
        });
      })
      .catch((error) => reject(error));
  });

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
