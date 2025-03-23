import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav
      style={{
        background: "var(--primary)",
        padding: "1rem",
        color: "white",
        marginBottom: "2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Bookstore
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
