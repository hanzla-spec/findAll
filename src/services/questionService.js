import Axios from '../services/axiosService';

const questionService = {
    getAllVQuestions: async () => {
        return await Axios.get(`api/v1/question/all`);
    },

    postQuestion: async (payload) => {
        return await Axios.post(`private/v1/question/post`, payload);
    },

    getAllTags: async () => {
        return await Axios.get(`api/v1/question/allTags`);
    },

    postNewTag: async (payload) => {
        return await Axios.post(`private/v1/question/tag/post`, payload);
    },

    getQuestionByQuestionId: async (questionId) => {
        return await Axios.get(`api/v1/question/get/${questionId}`);
    },

    voteQuestion: async (payload) => {
        return await Axios.put(`private/v1/question/upvote`, payload);
    },

    upViewQuestion: async (questionId) => {
        return await Axios.put(`api/v1/question/upView/${questionId}`);
    }
}

export default questionService;