// Book.jsx
import React from 'react';

const Book = ({ book, toggleWishlist, isWishlisted }) => {
  return (
    <div className="border p-4 rounded-lg flex flex-col items-center">
      <img 
        src={book.formats['image/jpeg']} 
        alt={book.title} 
        className="w-32 h-48 object-cover mb-4"
      />
      <h2 className="text-lg font-bold mb-2">{book.title}</h2>
      <p className="text-sm mb-2">Author: {book.authors.map(author => author.name).join(', ')}</p>
      <p className="text-sm mb-2">Genres: {book.subjects.join(', ')}</p>
      <p className="text-sm text-gray-500">ID: {book.id}</p>
      <button 
        onClick={() => toggleWishlist(book.id)}
        className={`p-2 mt-2 rounded ${isWishlisted ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
      >
        {isWishlisted ? '❤️ Wishlisted' : '♡ Add to Wishlist'}
      </button>
    </div>
  );
};

export default Book;
