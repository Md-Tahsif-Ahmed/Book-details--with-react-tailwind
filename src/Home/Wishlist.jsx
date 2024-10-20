import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [books, setBooks] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  // Fetch books by ID stored in wishlist
  useEffect(() => {
    const fetchWishlistedBooks = async () => {
      const promises = wishlist.map(id => axios.get(`https://gutendex.com/books/${id}`));
      const responses = await Promise.all(promises);
      setBooks(responses.map(response => response.data));
    };

    if (wishlist.length) {
      fetchWishlistedBooks();
    }
  }, [wishlist]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map(book => (
            <Book 
              key={book.id} 
              book={book} 
              toggleWishlist={() => {}} // Disable wishlist toggle on this page
              isWishlisted={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
