import { defineStore } from 'pinia'
import axios from "axios";
import type  { Movie } from "./MovieStore"

export type SearchMovies = {
    Search: Movie[],
    totalResults:string,
    Response: String

}

export const useMovieSearchStore = defineStore('movieSearchStore', {
    state: () => {
        return {
            data: {} as SearchMovies
        }
    },
    actions: {
        async fetchMovieSearch(SearchText:string,page:number) {
            this.data = (await axios.get(`https://www.omdbapi.com/?s=${SearchText}&page=${page}&apikey=402a5ecd`))
        }
    }
}
);
