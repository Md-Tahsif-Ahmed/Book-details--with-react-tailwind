import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book.id} className="border p-4 rounded">
          {/* <img src={book.cover?.url} alt={book.title} className="w-full h-64 object-cover" /> */}
          <img 
            src={book.formats['image/jpeg']} 
            alt={book.title} 
            className="w-32 h-48 object-cover mb-4"
            />
          <h2 className="text-xl">{book.title}</h2>
          <p>Author: {book.authors.map(author => author.name).join(', ')}</p>
          <p>Genre: {book.subjects.join(', ')}</p>
          <Link to={`/book/${book.id}`} className="text-blue-500">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default BookList;
