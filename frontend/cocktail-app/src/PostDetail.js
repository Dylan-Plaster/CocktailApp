import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import UserContext from "./UserContext";
import BackendApi from "./backendApi";
import Comment from "./Comment";
import PostCard from "./PostCard";
import "./PostDetail.css";

const PostDetail = ({ newComment }) => {
  const { id } = useParams();
  const { currUser } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ body: "" });
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getPost() {
      let res = await BackendApi.getPost(id);
      //   console.log("HERE");
      setPost(res);
      setLoading(false);
    }
    setLoading(true);
    getPost();
    if (!currUser) {
      setShowForm(false);
    }
  }, [id, currUser, refresh]);

  const showCommentForm = () => {
    setShowForm(true);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function handleComment() {
      let data = {
        body: formData.body,
        user_id: currUser.id,
        post_id: post.id,
      };
      e.target.reset();
      let err = await newComment(data);

      if (err) {
        setError(err);
      }
    }
    handleComment();
    setShowForm(false);
    setRefresh((state) => !state);
  };

  //   let showAddButton = currUser && !showForm;

  return (
    <>
      {loading ? (
        <h1>Loading . . . </h1>
      ) : (
        <div className="container">
          {error ? <div className="error">{error}</div> : null}
          <div className="PostDetail mt-3">
            <PostCard post={post}></PostCard>
            <div className="PostDetail-comments">
              <h1 className="Comment-header">Comments: </h1>
              {currUser ? (
                <>
                  {showForm ? null : (
                    <button className="m-3 addBtn" onClick={showCommentForm}>
                      Add Comment
                    </button>
                  )}
                </>
              ) : (
                <h2>
                  <Link className="loginLinks" to="/login">
                    Login
                  </Link>{" "}
                  or{" "}
                  <Link className="loginLinks" to="/signup">
                    Signup
                  </Link>{" "}
                  to add a comment
                </h2>
              )}
              {showForm ? (
                <div className="Form">
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <div className="d-flex flex-column">
                        <div className="text-center">
                          <label htmlFor="body">Comment Body:</label>
                        </div>
                        <div className=" p-0">
                          <textarea
                            name="body"
                            onChange={handleChange}
                          ></textarea>
                        </div>
                        <div className=" p-0 align-items-center d-flex justify-content-center">
                          <button className="PostDetail-submit">Submit</button>
                        </div>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
              ) : null}
              {post.comments.map((comment, idx) => (
                <Comment key={idx} comment={comment}></Comment>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
