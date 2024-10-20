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
      <Navbar />
      <div className="container mx-auto p-4 flex justify-center">
        <div className="card card-compact bg-base-100 w-96 h-full shadow-xl">
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
              <p className="text-sm">Author: {book.authors.map(author => author.name).join(', ')}</p>
              <p className="text-sm">Genres: {book.subjects.join(', ')}</p>
              <p className="text-sm text-gray-500">ID: {book.id}</p>
              <p className="text-sm mt-4">
                {book.description ? book.description : 'No description available.'}
              </p>
            </div>
            <div className="card-actions justify-end">
              <a href={book.formats['text/plain']} className="btn text-white bg-blue-700 hover:bg-blue-700 py-1" download>
                Download Text
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
