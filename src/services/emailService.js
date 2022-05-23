import Axios from '../services/axiosService';


const emailService = {
    generateOTP: async () => {
        return await Axios.post(`private/v1/email/generate-otp`);
    },

    validateOTP: async (userOTP) => {
        return await Axios.post(`private/v1/email/validate-otp/${userOTP}`)
    }
}

export default emailService;