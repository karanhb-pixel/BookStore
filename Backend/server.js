require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const Book = require("./models/Book");

const app = express();
app.use(cors());
app.use(express.json());

// Check and sync database
const initializeDatabase = async () => {
  try {
    // Check if the table exists
    const [results] = await sequelize.query('SHOW TABLES LIKE "books"');
    const tableExists = results.length > 0;

    // Sync the database with { force: false } to avoid dropping existing tables
    await sequelize.sync({ force: false });

    if (tableExists) {
      console.log('Table "books" already exists');
    } else {
      console.log('Table "books" has been created');
    }
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

// Initialize database when server starts
initializeDatabase();

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single book
app.get("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a book
app.put("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, cover, price } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  try {
    const [updated] = await Book.update(
      { title, description, cover, price },
      { where: { id } }
    );
    if (updated === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new book
app.post("/books", async (req, res) => {
  const { title, description, cover, price } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    const book = await Book.create({ title, description, cover, price });
    res.json({
      id: book.id,
      message: "Book added successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a book
app.delete("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const deleted = await Book.destroy({
      where: { id },
    });
    if (deleted === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
