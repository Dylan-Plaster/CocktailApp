import axios from "axios";

const BASE_URL = `https://www.thecocktaildb.com/api/json/v2/9973533`;

class CocktailApi {
  static async request(endpoint) {
    const url = `${BASE_URL}/${endpoint}`;

    try {
      let res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.error("API Error: ", err.response);
      //   let message = err.response.data.error.message;
      //   throw Array.isArray(message) ? message : [message];
    }
  }

  static async search(name) {
    let res = await this.request(`search.php?s=${name}`, {}, "GET");
    return res.drinks;
  }

  static async listIngredients() {
    let res = await this.request(`list.php?i=list`, {}, "GET");
    return res.drinks;
  }

  static async getIngredientById(id) {
    let res = await this.request(`lookup.php?iid=${id}`, {}, "GET");
    return res.ingredients[0];
  }

  static async getIngredientByName(name) {
    let res = await this.request(`search.php?i=${name}`, {}, "GET");
    return res.ingredients[0];
  }

  static async getDrink(id) {
    let res = await this.request(`lookup.php?i=${id}`, {}, "GET");
    return res.drinks[0];
  }

  static async getRandomDrinks() {
    let res = await this.request(`randomselection.php`, {}, "GET");
    return res.drinks;
  }

  static async filterIngredients(arr) {
    let str = arr.join(",");
    let res = await this.request(`filter.php?i=${str}`, {}, "GET");
    return res.drinks;
  }

  static async getAllDrinks() {
    let res = await this.request("filter.php?a=Alcoholic", {}, "GET");
    return res.drinks;
  }
}

export default CocktailApi;
