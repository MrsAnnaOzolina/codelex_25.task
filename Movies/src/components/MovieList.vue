<script lang="ts">
import { useMovieSearchStore } from "@/stores/MovieSearchStore"
import MovieDetails from "./MovieDetails.vue";

type range = {
    name: number;
    isDisabled: boolean;
}

export default {
    data() {
        return {
            text: "",
            currentPage: 1,
            filmValue: "Undefined",
            totalPages: 100,
            maxVisibleButtons: 4
        };
    },
    setup() {
        const moviesSearchStore = useMovieSearchStore();
        moviesSearchStore.fetchMovieSearch("Undefined", 1);
        return { moviesSearchStore };
    },
    props: ["value"],
    watch: {
        value: function () {
            if (this.value === "") {
                const moviesSearchStore = useMovieSearchStore();
                moviesSearchStore.fetchMovieSearch(" ", this.currentPage);
                // console.log(Math.floor((moviesSearchStore.data.data.totalResults/10)+1))
                // this.totalPages = Math.floor((moviesSearchStore.data.data.totalResults/10)+1)
                // if (this.totalPages < 5 ){
                //     this.maxVisibleButtons = this.totalPages
                // }
                return { moviesSearchStore };
            }
            else {
                this.filmValue = this.value
                this.currentPage = 1
                const moviesSearchStore = useMovieSearchStore();
                moviesSearchStore.fetchMovieSearch(this.filmValue, this.currentPage);
                // this.totalPages = Math.floor((moviesSearchStore.data.data.totalResults/10)+1)
                return { moviesSearchStore };
            }
        }
    },
    methods: {
        displatValue(movieId: string) {
            document.getElementById("bottom")?.scrollIntoView({ behavior: "smooth" })
            this.text = movieId;
           
        },
        changePgae(number: number) {
            this.currentPage = number
            const moviesSearchStore = useMovieSearchStore();
            moviesSearchStore.fetchMovieSearch(this.filmValue, number);
            return { moviesSearchStore };
        },
        goToLastpage() {
            this.currentPage = this.totalPages;
            const moviesSearchStore = useMovieSearchStore();
            moviesSearchStore.fetchMovieSearch(this.filmValue, this.currentPage);
            return { moviesSearchStore };
        },
        goToFirstpage() {
            this.currentPage = 1;
            const moviesSearchStore = useMovieSearchStore();
            moviesSearchStore.fetchMovieSearch(this.filmValue, this.currentPage);
            return { moviesSearchStore };
        },
    },

    components: {
        MovieDetails
    },
    computed: {
        startPage() {
            if (this.currentPage === 1) {
                return 1;
            }
            if (this.currentPage === this.totalPages) {
                return this.totalPages - this.maxVisibleButtons;
            }
            return this.currentPage - 1;
        },
        pages(): range[] {
            const range = [];
            for (
                let i: number = this.startPage;
                i <= Math.min(this.startPage + this.maxVisibleButtons, this.totalPages);
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }
            return range;
        },
    },
}
</script>

<template>
    <div v-for='(result, index) in moviesSearchStore.data' :value="index" class="movieList">
        <div v-for='(data, index) in result.Search' :value="index" class="movieList__card">
            <p>{{ data.Title }} <span>, {{ data.Year }}</span></p>
            <button class="movieList__button" @click="$event=> displatValue(data.imdbID)">More details</button>
        </div>
    </div>
    <div class="movieList__pagination">
        <span @click="$event => goToFirstpage()"> &laquo; </span>
        <span v-for="page in pages" :key="page.name">
            <button class="paginationButton" @click="$event=>changePgae(page.name)" type="button" :disabled="page.isDisabled">
                {{ page.name }}
            </button>
        </span>
        <span @click="$event => goToLastpage()">&raquo;</span>
    </div>

    <MovieDetails :imdbID="text"  id="bottom"/>

</template>