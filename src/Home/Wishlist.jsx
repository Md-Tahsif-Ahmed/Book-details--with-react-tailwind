import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';
import Navbar from './Navbar';

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
      if (wishlist.length) {
        const promises = wishlist.map(id => axios.get(`https://gutendex.com/books/${id}`));
        const responses = await Promise.all(promises);
        setBooks(responses.map(response => response.data));
      } else {
        setBooks([]);  // Clear books when the wishlist is empty
      }
    };

    fetchWishlistedBooks();
  }, [wishlist]); // Depend on wishlist changes

  // Remove book from wishlist
  const removeFromWishlist = (bookId) => {
    const updatedWishlist = wishlist.filter(id => id !== bookId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    // Optimistic update: Remove the book from the displayed list immediately
    setBooks(books.filter(book => book.id !== bookId));
  };

  if (!books.length) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="mx-auto p-4">
        <h1 className="text-2xl mb-4">Wishlist</h1>
        <div className="flex items-center justify-center">
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {books.map(book => (
                <div key={book.id}>
                  <Book 
                    book={book} 
                    toggleWishlist={() => removeFromWishlist(book.id)} // Pass remove function
                    isWishlisted={true}
                  />
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
