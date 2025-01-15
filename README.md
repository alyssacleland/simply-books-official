# Simply Books [![Netlify Status](https://api.netlify.com/api/v1/badges/251c52bf-3b0d-46e6-be11-e6076a0af65d/deploy-status)](https://app.netlify.com/sites/simplybooks-ac/deploys)

<!-- update the netlify badge above with your own badge that you can find at netlify under settings/general#status-badges -->

Simply Books is a web application that allows users to view and manage a collection of books and authors. Users can add, edit, and delete books and authors, view detailed information about each author and their associated books, view their user profile, and discover public books to add to their collection.

[View App](https://simplybooks-ac.netlify.app/)

## About the User <!-- This is a scaled down user persona -->

The target users for Simply Books are book enthusiasts who want to keep track of their book collection and favorite authors. They are tech-savvy individuals who enjoy reading and organizing their book collections digitally.

## Features <!-- List your app features using bullets! Do NOT use a paragraph. No one will read that! -->

- View a list of books and authors
- Add, edit, and delete books
- Add, edit, and delete authors
- View detailed information about each author and their associated books
- View user profile
- Discover public books and add them to your collection
- User specific collection of books and authors, and public books are viewable by all users
- Responsive design for mobile and desktop

## Video Walkthrough of APP NAME <!-- A loom link is sufficient -->

[Video Walkthrough](https://www.loom.com/share/76a48ecef11e49779bb55d6089ca22e4?sid=8fe18aae-0b71-4717-8672-4444a30f1a64)

## Relevant Links <!-- Link to all the things that are required outside of the ones that have their own section -->

- [Check out the deployed site](https://simplybooks-ac.netlify.app/)
- [Project Board](https://github.com/users/alyssacleland/projects/3/views/1)
- [ERD](https://dbdiagram.io/d/Almost-Amazon-60315ba6fcdcb6230b20bbaa?utm_source=dbdiagram_embed&utm_medium=bottom_open)

## Code Snippet <!-- OPTIONAL, but doesn't hurt -->

Here's a code snippet demonstrating how to fetch author details:

```javascript
useEffect(() => {
  viewAuthorDetails(firebaseKey).then(setAuthorDetails);
}, [firebaseKey]);
```

## Project Screenshots <!-- These can be inside of your project. Look at the repos from class and see how the images are included in the readme -->

<img width="1148" alt="Your Alt" src="https://github.com/alyssacleland/simply-books-official/blob/main/public/images/Screenshot%202025-01-13%20at%208.20.55%E2%80%AFPM.png">

## Contributors

- [Alyssa Cleland](https://github.com/alyssacleland)
