import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style.css";
import "./Books.css";
import { Triangle } from "react-loader-spinner";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Track loading state
  const [deletingId, setDeletingId] = useState(null); // 👈 Track which book is being deleted

  //function for deleting the book
  const handleDelete = async (id) => {
    setDeletingId(id); // 👈 Start loading for this book
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null); // 👈 Stop loading
    }
  };

  //this will run one time to fetch all the books from the books table when books component is mounted
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/books");

        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error("Fetched data is not an array");
          //console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 👈 Always stop loading
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <div className="main">
      <div className="head">
        <h1>Book Shop</h1>
        <div className="addButton">
          <Link className=" formbutton formbutton-primary" to="/add">
            Add Book
          </Link>
        </div>
      </div>
      <div className="books">
        {loading ? (
          <div className="loader">
            <Triangle color="#0984e3" height={50} width={50} /> {/* Spinner */}
            <p>Loading books...</p>
          </div>
        ) : (
          books.map((book) => (
            <div className="book" key={book.id}>
              {book.cover && <img src={book.cover} alt="" />}
              <div className="data">
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>{book.price}</span>
              </div>
              <Link
                className="button formbutton formbutton-primary "
                to={`./update/${book.id}`}
              >
                Update
              </Link>
              <button
                className="button formbutton formbutton-secondary"
                onClick={() => handleDelete(book.id)}
                disabled={deletingId === book.id} // 👈 Disable button while deleting
              >
                {deletingId === book.id ? (
                  <span>Deleting...</span> // 👈 Show loading text
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Books;
