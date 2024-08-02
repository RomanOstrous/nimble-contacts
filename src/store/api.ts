import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact, NewContact } from '../types/ContactTypes';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/',
  prepareHeaders: (headers) => {
    headers.set('Authorization', 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn');
    return headers;
  },
});

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery,
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    getContacts: builder.query<{ resources: Contact[] }, void>({
      query: () => 'contacts?sort=created:desc',
      providesTags: (result) => {
        const contacts = result?.resources || [];
        return [
          ...contacts.map(({ id }) => ({ type: 'Contact' as const, id })),
          { type: 'Contact' as const, id: 'LIST' },
        ];
      },
    }),
    createContact: builder.mutation<void, NewContact>({
      query: (newContact) => ({
        url: 'contact',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: [{ type: 'Contact' as const, id: 'LIST' }],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (contactId) => ({
        url: `contact/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Contact' as const, id: 'LIST' }],
    }),
    getContactById: builder.query<Contact, string>({
      query: (contactId) => `contact/${contactId}`,
      providesTags: (result, error, id) => [{ type: 'Contact' as const, id }],
    }),
    addTag: builder.mutation<void, { id: string; tags: string[] }>({
      query: ({ id, tags }) => ({
        url: `contact/${id}/tags`,
        method: 'PUT',
        body: { tags },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Contact' as const, id }],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetContactByIdQuery,
  useAddTagMutation,
} = contactsApi;
