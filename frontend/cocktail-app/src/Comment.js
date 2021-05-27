import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackendApi from "./backendApi";
import "./Comment.css";

const Comment = ({ comment }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      let res = await BackendApi.getUserById(comment.user_id);
      setUser(res);
      setLoading(false);
    }

    getUser();
  }, [comment]);

  return (
    <>
      {loading ? null : (
        <>
          <div className="Comment row">
            <div className="col-3 username">
              <b>
                <Link className="commentLink" to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </b>
            </div>
            <div className="col-9 text-start Comment-body">
              <span>{comment.body}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Comment;
