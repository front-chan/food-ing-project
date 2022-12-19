import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3002/",
  header: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

export const apis = {
  getRecipes: () => instance.get("/recipes"),
  getReviews: (postId) => instance.get(`/reviews?postId=${postId}`),
  getIdRecipes: (id) => instance.get(`/recipes/${id}`),
  createRecipes: (recipe) => instance.post("/recipes", recipe),
  createReviews: (review) => instance.post("/reviews", review),
  editRecipes: (id, recipe) => instance.patch(`/recipes/${id}`, recipe),
  deleteRecipes: (id) => instance.delete(`/recipes/${id}`),
  deleteReviews: (id) => instance.delete(`/reviews/${id}`),
};
