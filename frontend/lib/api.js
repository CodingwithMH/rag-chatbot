import axios from "axios";

export const uploadDocument = async(file) => {

  const formData = new FormData();

  formData.append("file", file);

  return axios.post(
    "https://rag-chatbot-alpha-weld.vercel.app/_/backend/upload",
    formData
  );
};

export const sendQuestion = async(question) => {

  return axios.post(
    "https://rag-chatbot-alpha-weld.vercel.app/_/backend/chat",
    {
      question
    }
  );
};