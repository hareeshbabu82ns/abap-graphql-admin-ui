import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => (
  <div>
    <p>
      404! - <Link to="/">Dashboard</Link>
    </p>
  </div>
);

export default ErrorPage;
