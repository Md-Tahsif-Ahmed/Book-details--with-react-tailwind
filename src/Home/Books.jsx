import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from './BookList';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || ''); // Load searchTerm from localStorage
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [genre, setGenre] = useState(localStorage.getItem('genre') || ''); // Load genre from localStorage
  const [wishlist, setWishlist] = useState([]);

  // Fetch books based on search term and genre
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

  // Save search term and genre to localStorage when they change
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('genre', genre);
  }, [searchTerm, genre]);

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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle genre selection change
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  return (
    <div className=" mx-auto p-4 max-w-screen-7xl">
      <h1 className="text-2xl mb-4">Book List</h1>
  <div className="flex items-center justify-between space-x-6">
        
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border rounded mb-4 w-full"
      />
      
      {/* Genre Select */}
      <select onChange={handleGenreChange} value={genre} className="p-2 border rounded mb-4 w-full">
        <option value="">All Genres</option>
        <option value="fiction">Fiction</option>
        <option value="science fiction">Science Fiction</option>
        <option value="horror">Horror</option>
      </select>
  </div>

      {/* Book List */}
     <div className=" flex justify-center items-center">
     <BookList books={currentBooks} toggleWishlist={toggleWishlist} wishlist={wishlist} />
     </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
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
