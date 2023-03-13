import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import axios from "axios";

export type Movie = {
    Title: string,
    Year: string,
    Rated: string,
    Releades: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Poster: string,
    Ratings: [{
        Source: string,
        Value: string
    }
    ],
    Metascore: string,
    imdbRating: string,
    imdbVotes: string,
    imdbID: string,
    Type: string,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
    Response: boolean
}

export const useMovieStore = defineStore('movieStore',{
    state: () => {
        return {
            data: {} as Movie
        }
},
    actions: {
         async fetchMovieDetails(id:string) {
          this.data = (await axios.get(`https://www.omdbapi.com/?i=${id}&page=1&apikey=402a5ecd`))
        }
    }

}
);
