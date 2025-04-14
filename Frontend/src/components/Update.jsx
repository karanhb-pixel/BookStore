import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  //find id from url to update the book
  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${bookId}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [bookId]);

  //handle change function to update and add new the book state
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //validate form fields
  const validate = () => {
    let tempErrors = {};
    if (!book.title) tempErrors.title = "Title is required";
    if (!book.description) tempErrors.description = "Description is required";
    if (!book.price) tempErrors.price = "Price is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  //handle click function to post the data to the backend
  const handleClick = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Set a default cover if the cover field is empty
      if (!book.cover) {
        book.cover = "abc";
      }
      try {
        await axios.put(`http://localhost:8800/books/${bookId}`, book);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  //Display the form to add new book
  return (
    <div className="form">
      <h1>Update Book</h1>
      <div className="inputform">
        <input
          type="text"
          placeholder="Enter Book Title"
          onChange={handleChange}
          name="title"
          value={book.title || ""}
          required
        />
        {errors.title && <p className="error">{errors.title}</p>}
        <input
          type="text"
          placeholder="Enter Book Description"
          onChange={handleChange}
          name="description"
          value={book.description || ""}
          required
        />
        {errors.description && <p className="error">{errors.description}</p>}
        <input
          type="text"
          placeholder="Enter Book Cover"
          onChange={handleChange}
          name="cover"
          value={book.cover || ""}
        />
        <input
          type="number"
          placeholder="Enter Book Price"
          onChange={handleChange}
          name="price"
          value={book.price || ""}
          required
        />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>
      <div className="inputbutton">
        <button className="formbutton formbutton-primary" onClick={handleClick}>
          Update
        </button>
        <button
          className="formbutton formbutton-secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Update;
