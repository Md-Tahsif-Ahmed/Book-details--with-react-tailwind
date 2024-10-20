// BookList.jsx
import React from 'react';
import Book from './Book';

const BookList = ({ books, toggleWishlist, wishlist }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map(book => (
        <Book
          key={book.id}
          book={book}
          toggleWishlist={toggleWishlist}
          isWishlisted={wishlist.includes(book.id)}
        />
      ))}
    </div>
  );
};

export default BookList;
