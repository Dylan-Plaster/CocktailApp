import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BackendApi {
  // static APItoken;
  static async request(endpoint, data = {}, method = "get", APItoken) {
    console.debug("API Call:", endpoint, data, method, APItoken);

    const url = `${BASE_URL}/${endpoint}`;

    const headers = {
      Authorization: `Bearer ${APItoken}`,
    };

    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error: ", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // USER ROUTES *******************
  static async signup(data) {
    let res = await this.request("auth/register", data, "POST");
    this.APItoken = res.token;
    return res.token;
  }

  static async login(data) {
    let res = await this.request("auth/token", data, "POST");
    this.APItoken = res.token;
    return res.token;
  }

  static async logout() {
    this.APItoken = "";
    console.log("LOGOUT");
  }

  static async getAllUsers() {
    let res = await this.request("users", {}, "GET");
    return res.users;
  }

  static async getUser(username) {
    let res = await this.request(`users/username/${username}`, {}, "GET");
    return res.user;
  }

  static async getUserById(id) {
    let res = await this.request(`users/id/${id}`, {}, "GET");
    // console.log(res);
    return res.user;
  }

  static async updateUser(username, data, token) {
    let res = await this.request(`users/${username}`, data, "PATCH", token);
    return res.user;
  }

  static async deleteUser(username, token) {
    let res = await this.request(`users/${username}`, {}, "DELETE", token);
    return res.deleted;
  }

  // POSTS ROUTES ***********************//

  static async createPost(username, data, token) {
    // data is {title, body, recipe_id}
    let res = await this.request(`posts/new/${username}`, data, "POST", token);
    return res.post;
  }

  static async getAllPosts() {
    let res = await this.request(`posts`, {}, "GET");
    console.log(res);
    return res.posts;
  }

  static async getPost(id) {
    let res = await this.request(`posts/${id}`, {}, "GET");
    return res.post;
  }

  static async updatePost(post_id, username, data, token) {
    let res = await this.request(
      `posts/${post_id}/${username}`,
      data,
      "PATCH",
      token
    );
    return res.post;
  }

  static async deletePost(post_id, username, token) {
    let res = await this.request(
      `posts/${post_id}/${username}`,
      {},
      "DELETE",
      token
    );
    return res.deleted;
  }

  // COMMENT ROUTES *****************
  static async createComment(data, token) {
    let res = await this.request(`comments`, data, "POST", token);
    return res.comment;
  }

  static async deleteComment(id, token) {
    let res = await this.request(`comments/${id}`, {}, "DELETE", token);
    return res.deleted;
  }

  static async updateComment(id, data, token) {
    let res = await this.request(`comments/${id}`, data, "PATCH", token);
    return res.comment;
  }
}

export default BackendApi;
