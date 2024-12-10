import {create} from 'zustand';
import { sp_text } from "../text";

export const uiStore = create((set) => ({
    language: sp_text,
    currentCategory: 'news',
  
    
    // Function to log in and set the user ID
    setLanguage: (language) => set({
        language: language
    }),
    setCurrentCategory: (category) => set({
        currentCategory: category
    }),

  }));