import React, { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import backendApi from "./backendApi";
import UserContext from "./UserContext";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import ErrPage from "./ErrPage";
import SignupForm from "./SignupForm";
import PrivateRoute from "./PrivateRoute";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import PostDetail from "./PostDetail";
import UserDetail from "./UserDetail";
import BackendApi from "./backendApi";
import NewPostForm from "./NewPostForm";
import SearchPage from "./SearchPage";
import FilterPage from "./FilterPage";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useLocalStorage("username", "", setLoading);
  const [currUser, setCurrUser] = useState(null);

  const [token, setToken] = useLocalStorage("token", "", setLoading);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function getUser() {
      if (!username) {
        return null;
      }
      let res = await BackendApi.getUser(username);
      setCurrUser(res);
      setLoading(false);
      setErrors(null);
    }
    getUser();
  }, [token, username, setLoading]);

  const signup = async (data) => {
    try {
      let res = await BackendApi.signup(data);
      setUsername(data.username);
      setToken(res);

      setErrors(null);
    } catch (e) {
      return e;
    }
  };

  const login = async (data) => {
    try {
      let res = await BackendApi.login(data);
      setUsername(data.username);
      setToken(res);
      setErrors(null);
    } catch (e) {
      return e;
    }
  };

  const logout = (data) => {
    setUsername(null);
    setToken(null);
    setCurrUser(null);
    window.localStorage.clear();
    BackendApi.logout();
  };

  const updateUser = async (username, data) => {
    try {
      let res = await BackendApi.updateUser(username, data, token);
      setUsername(res.username);
    } catch (e) {
      return e;
    }
  };

  const newComment = async (data) => {
    try {
      await BackendApi.createComment(data, token);
    } catch (e) {
      return e;
    }
  };

  const newPost = async (data) => {
    try {
      await BackendApi.createPost(currUser.username, data, token);
    } catch (e) {
      return e;
    }
  };

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          currUser,
          setCurrUser,
          logout,
          errors,
          setErrors,
          login,
          updateUser,
          loading,
        }}
      >
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/">
            <Homepage></Homepage>
          </Route>
          <Route exact path="/signup">
            <SignupForm signup={signup}></SignupForm>
          </Route>
          <Route exact path="/login">
            <LoginForm login={login}></LoginForm>
          </Route>

          <Route exact path="/profile">
            <Profile updateUser={updateUser}></Profile>
          </Route>

          <Route exact path="/posts/:id">
            <PostDetail newComment={newComment}></PostDetail>
          </Route>

          <Route exact path="/users/:username">
            <UserDetail></UserDetail>
          </Route>

          <Route exact path="/search">
            <SearchPage></SearchPage>
          </Route>

          <Route exact path="/filter">
            <FilterPage></FilterPage>
          </Route>

          {/* <Route exact path="/posts/new/:recipe_id">
            <NewPostForm newPost={newPost}></NewPostForm>
          </Route> */}
          <PrivateRoute
            exact
            path="/posts/new/:recipe_id"
            newPost={newPost}
            component={NewPostForm}
          ></PrivateRoute>

          <PrivateRoute
            exact
            path="/profile"
            updateUser={updateUser}
            component={Profile}
          ></PrivateRoute>

          <Route>
            <ErrPage />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Routes;
