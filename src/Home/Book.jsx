// Book.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ book, toggleWishlist, isWishlisted }) => {
  return (
    <div className="card card-compact bg-base-100 w-96 h-full shadow-xl  ">
      <figure>
        <img
          src={book.formats['image/jpeg']}
          alt={book.title}
          className="w-32 h-48 object-cover mt-6"
        />
      </figure>
      <div className="card-body flex flex-col justify-between">
        <div>
          <h2 className="card-title">{book.title}</h2>
          <p className="text-sm truncate">Author: {book.authors.map(author => author.name).join(', ')}</p>
          <p className="text-sm truncate">Genres: {book.subjects.join(', ')}</p>
          <p className="text-sm text-gray-500">ID: {book.id}</p>
        </div>
        <div className="flex items-center justify-between">
          <Link to={`/book/${book.id}`}>
            <button className="btn bg-blue-700 hover:bg-blue-700 py-1 text-white">View Details</button>
          </Link>
          <button 
            onClick={() => toggleWishlist(book.id)}
            className={`btn mt-2 py-4 px-3 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
          >
            {isWishlisted ? '❤️ Wishlisted' : '♡ Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
