/* eslint-disable no-unused-vars */
import {create} from 'zustand';
import axios from 'axios';

const API_URL="http://localhost:5000/api/auth";
axios.defaults.withCredentials =true;


export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    message:null,

    signup:async(email,password,name)=>{
        set({isLoading:true,error:null});
        try {
           const response =  await axios.post(`${API_URL}/signup`,{email,password,name});
                set({user:response.data.user,isAuthenticated:true,isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error signuping up",isLoading:false})
            throw error;
        }
    },

    login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

    logout:async()=>{
        set({isLoading:true,error:null});
        try {
            await axios.post(`${API_URL}/logout`);
            set({user:null, isAuthenticated:false,error:null,isLoading:false});
        } catch (error) {
            set({error:"Error logging out", isLoading:false});
            throw error;
        }
    },

    verifyEmail:async(code)=>{
        set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`,{code});
            set({user:response.data.user,isAuthenticated:true,isLoading:false});
            return response.data;
        } catch (error) {
            set({error:error.response.data.message || "Error verifying Email",isLoading:false});
            throw error;
        }

    },

    checkAuth : async()=>{
        // await new Promise((resolve)=>setTimeout(resolve,2000))
        set({isCheckingAuth: true, error:null});
        try {
                const response=await axios.get(`${API_URL}/check-auth`)
            // const response =await axios.get(`${API_URL}/check-auth`);
            set({user:response.data.user, isAuthenticated:true,isCheckingAuth:false});
        } catch (error) {
            set({error:null, isCheckingAuth:false});
        }
    },

    forgotPassword: async(email)=>{
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/forgot-password`,{email});
            set({message:response.data.message,isLoading:false});
        } catch (error) {
            set({
                isLoading:false,
                error:error.response.data.message || "Error sending reset password email"
            });
            throw error;
        }
    },

    resetPassword:async(token,password)=>{
        set({ isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            // const response = await axios.post(`${API_URL}/reset-password`,{token,password});
            set({message:response.data.message , isLoading:false});
        } catch (error) {
            set({
                isLoading:false,
                error:error.response.data.message || "Error resetting password",
            })
            throw error;
        }
    }

}))
