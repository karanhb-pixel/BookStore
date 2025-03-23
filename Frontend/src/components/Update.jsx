import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    cover: "",
    price: null,
  });

  const [errors, setErrors] = useState({});

  //create a navigate object to navigate to different routes
  const navigate = useNavigate();

  //find id from url to update the book
  const bookId = location.pathname.split("/")[2];

  //handle change function to update and add new the book state
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //validate form fields
  const validate = () => {
    let tempErrors = {};
    if (!book.title) tempErrors.title = "Title is required";
    if (!book.desc) tempErrors.desc = "Description is required";
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
        await axios.put("http://localhost:8800/books/" + bookId, book);
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
          required
        />
        {errors.title && <p className="error">{errors.title}</p>}
        <input
          type="text"
          placeholder="Enter Book Descriptions"
          onChange={handleChange}
          name="desc"
          required
        />
        {errors.desc && <p className="error">{errors.desc}</p>}
        <input
          type="text"
          placeholder="Enter Book Cover"
          onChange={handleChange}
          name="cover"
        />
        <input
          type="number"
          placeholder="Enter Book Price"
          onChange={handleChange}
          name="price"
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
