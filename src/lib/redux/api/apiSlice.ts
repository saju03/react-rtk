import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import type { IUser } from '../../../interface';

// Define types for our API responses
export interface User {
  id: number;
  userName: string;
  email: string;
  status: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Create the API slice
export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders:(headers)=>{
            headers.set('Authorization', `Bearer some token`);
        return headers;
        }
    }),
    tagTypes:['Product','user'],
    endpoints:({mutation})=>({
        loginRegister:mutation({
            queryFn: async (body: IUser) => {
                try {
                    const response = await axios.post('http://localhost:3000/api/auth/login', {
                        ...body
                    });
                    return { data: response.data };
                } catch (error: any) {
                    return { 
                        error: {
                            status: error.response?.status || 500,
                            data: error.response?.data || 'Network error'
                        }
                    };
                }
            },
            invalidatesTags: ['user']
        })
        })

});

// Export hooks for usage in functional components
export const {
  useLoginRegisterMutation
} = apiSlice;
