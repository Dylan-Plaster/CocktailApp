import { Link } from "react-router-dom";

const ErrPage = () => {
  return (
    <div>
      <h1>PAGE NOT FOUND</h1>
      <h2>
        Return to <Link to="/">Home</Link>
      </h2>
    </div>
  );
};

export default ErrPage;
