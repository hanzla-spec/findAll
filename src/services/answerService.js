import Axios from '../services/axiosService';

const answerService = {
    getAnswersOfQuestion: async (questionId) => {
        return await Axios.get(`api/v1/answer/${questionId}`);
    },

    postAnswer: async (payload) => {
        return await Axios.post(`private/v1/answer/post`, payload)
    },

    upvoteAnswer: async (payload) => {
        return await Axios.put(`private/v1/answer/upvote`, payload);
    }


}
export default answerService;