import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!book.title) tempErrors.title = "Title is required";
    if (!book.description) tempErrors.description = "Description is required";
    if (!book.price) tempErrors.price = "Price is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (!book.cover) {
        book.cover = "abc";
      }
      try {
        setIsSubmitting(true);
        await axios.post("http://localhost:8800/books", book);
        navigate("/");
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
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
        <button
          className="formbutton formbutton-primary"
          onClick={handleClick}
          disabled={isSubmitting}
        >
          {isSubmitting ? <div className="spinner"></div> : "Add Book"}
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

export default Add;
