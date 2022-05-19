import Axios from '../services/axiosService';

const questionService = {
    getAllVQuestions: async () => {
        return await Axios.get(`api/v1/question/all`);
    },

    postQuestion: async (payload) => {
        return await Axios.post(`private/v1/question/post`, payload);
    }
}

export default questionService;