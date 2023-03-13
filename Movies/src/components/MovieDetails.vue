<script lang="ts">
import { useMovieStore } from '@/stores/MovieStore';

export default {
    props: ["imdbID"],
    setup() {
        const movieStore = useMovieStore();
        movieStore.fetchMovieDetails("");

        return { movieStore }
    },
    watch: {
        imdbID: function () {
            const movieStore = useMovieStore();
            movieStore.fetchMovieDetails(this.imdbID);

            return { movieStore }
        }
    },
}
</script>

<template>
    <div>
        <div v-for='result in movieStore.data'>
            <div v-show="JSON.stringify(result)[2] === 'T'">
                <h1 class="detailsHeader">Detailed information about selcted movie: </h1>
                <div class="detailsCard">
                    <h1>{{ result.Title }}</h1>
                    <p> <u></u> {{ result.Year }}</p>
                    <p> <u>Released:</u> {{ result.Released }}</p>
                    <p> <u>Genre:</u> {{ result.Genre }}</p>
                    <span v-if="String(result.Poster).length > 4">
                        <img :src="result.Poster" alt="logo">
                    </span>
                    <span v-else>
                        <img src="../../public/noLogo.jpg">
                    </span>
                    <p><u>Actors:</u> {{ result.Actors }}</p>
                </div>
            </div>
        </div>
    </div>
</template>