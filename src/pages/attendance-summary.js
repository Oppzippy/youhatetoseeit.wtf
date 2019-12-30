import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";

export default () => {
  return (
    <div>
      <Helmet>
        <title>&lt;You Hate to See It&gt; Attendance</title>
      </Helmet>
      <Link to="/attendance">Details</Link>
    </div>
  );
};
