import { api } from "../api_index";
import axios from 'axios';

export const fetchArticles = async (stateSetter) => {
    try {
      const response = await axios.get(api.get_articles);
      stateSetter(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  export const deleteArticles = async (id) => {
    try {
        await axios.delete(`${api.get_articles}/${id}`);
        alert('Article deleted successfully!');
      } catch (error) {
        console.error('Error deleting article:', error);
      }
  }