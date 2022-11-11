import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation } = usersApiSlice;
