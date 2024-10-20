// Books.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from './BookList';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [genre, setGenre] = useState('');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(`https://gutendex.com/books?search=${searchTerm}&topic=${genre}`);
      setBooks(res.data.results);
    };
    fetchBooks();
  }, [searchTerm, genre]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  // Toggle wishlist functionality
  const toggleWishlist = (bookId) => {
    let updatedWishlist;

    if (wishlist.includes(bookId)) {
      updatedWishlist = wishlist.filter(id => id !== bookId);
    } else {
      updatedWishlist = [...wishlist, bookId];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Book List</h1>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border rounded mb-4 w-full"
      />
      
      {/* Genre Select */}
      <select onChange={handleGenreChange} className="p-2 border rounded mb-4 w-full">
        <option value="">All Genres</option>
        {/* You can add more genre options */}
        <option value="fiction">Fiction</option>
        <option value="science fiction">Science Fiction</option>
        <option value="horror">Horror</option>
      </select>

      {/* Book List */}
      <BookList books={currentBooks} toggleWishlist={toggleWishlist} wishlist={wishlist} />

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
