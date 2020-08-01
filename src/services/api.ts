/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios';
import { equals, prop } from 'ramda';
import Note from '@interfaces/Note';

class API {
  api!: AxiosInstance;

  constructor() {
    this.initAxios();
  }

  initAxios() {
    this.api = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.api.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        return request;
      },
      (error: AxiosError) => {
        if (equals(error.message, 'Network Error')) return { retry: true };
        return error;
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse): any => {
        if (!response.status) return { retry: true };
        return prop('data')(response);
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }

  createNote(note: Note) {
    return this.api.post('notes', note);
  }

  deleteNote(noteId: string) {
    console.log('api:', noteId);
    return this.api.delete(`notes/${noteId}`);
  }

  searchNotes(searchText?: string) {
    return this.api.get(`notes?search=${searchText ?? ''}`);
  }

  updateNote(note: Note) {
    return this.api.put(`notes/${note.id}`, note);
  }
}

export default new API();
