import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from './BookList';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(`https://gutendex.com/books?search=${searchTerm}&topic=${genre}`);
      setBooks(res.data.results);
    };
    fetchBooks();
  }, [searchTerm, genre]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Book List</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border rounded mb-4"
      />
      <select onChange={handleGenreChange} className="p-2 border rounded mb-4">
        <option value="">All Genres</option>
        {/* Add genre options here */}
      </select>

      <BookList books={currentBooks} />

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

export default Book;
