import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard.js";
import BackendApi from "./backendApi";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    async function getUser() {
      let res = await BackendApi.getUser(username);
      setUser(res);
      setLoading(false);
    }
    setLoading(true);
    getUser();
  }, [username]);

  return (
    <>
      {loading ? (
        <h1>Loading . . .</h1>
      ) : (
        <div className="container-lg UserDetail">
          <h1 className="UserDetail-header">{user.username}'s posts:</h1>
          {user.posts.map((post, idx) => (
            <PostCard post={post} key={idx}></PostCard>
          ))}
        </div>
      )}
    </>
  );
};

export default UserDetail;
