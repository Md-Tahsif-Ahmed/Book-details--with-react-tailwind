import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`https://gutendex.com/books/${id}`);
      setBook(res.data);
    };
    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
   <>
   <Navbar></Navbar>
   <div className="container mx-auto p-4">
      <h1 className="text-2xl">{book.title}</h1>
      <img 
            src={book.formats['image/jpeg']} 
            alt={book.title} 
            className="w-32 h-48 object-cover mb-4"
            />
      <p>Author: {book.authors.map(author => author.name).join(', ')}</p>
      <p>Genre: {book.subjects.join(', ')}</p>
      <p>{book.description}</p>
    </div>
   </>
  );
};

export default BookDetail;
