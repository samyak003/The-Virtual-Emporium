import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8888/.netlify/functions/",
	// baseURL: process.env.REACT_APP_BACKEND,
});

export default instance;
