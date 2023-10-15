
import  { useState, useEffect } from 'react';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://gutendex.com/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
     console.log(books);

  return (
    <>
    <div className='book-list'>
      {loading ? (
        <p>Loading...</p>
      ) : (
      
        books.map((book) => (
          <div className="book-card" key={book.id}>
             {book.formats['image/jpeg'] && (
              <img src={book.formats['image/jpeg']} alt="Book Cover" />
            )}
            <h2>{book.title}</h2>
            <p>Author: {book.authors.map((author) => author.name).join(', ')}</p>
            
          </div>
         
        ))
      
        )
      }
    </div>
    </>
  );
}

export default BookList;





