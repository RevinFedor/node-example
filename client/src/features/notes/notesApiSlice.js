import { apiSlice } from "../../app/api/apiSlice";

const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      providesTags: ["Note"],
    }),
    createNote: builder.mutation({
      query: (data) => ({
        url: "/notes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Note"],
    }),
    updateNote: builder.mutation({
      query: (data) => ({
        url: "/notes",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Note"],
    }),
    deleteNote: builder.mutation({
      query: (data) => ({
        url: "/notes",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const { useGetNotesQuery, useCreateNoteMutation, useUpdateNoteMutation ,useDeleteNoteMutation } = notesApiSlice;
