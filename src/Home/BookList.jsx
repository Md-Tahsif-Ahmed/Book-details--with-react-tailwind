import React from 'react';
import Book from './Book';
import { motion, AnimatePresence } from 'framer-motion';

const BookList = ({ books, toggleWishlist, wishlist }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10">
      <AnimatePresence>
        {books.map(book => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <Book
              book={book}
              toggleWishlist={toggleWishlist}
              isWishlisted={wishlist.includes(book.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BookList;

