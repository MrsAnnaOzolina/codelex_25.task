<script lang="ts">
import {provide} from 'vue'
import  MovieList from '../components/MovieList.vue';

export default {
 components:{
  MovieList,
 },
    data() {
        return {
            text: "",
            searchValue:" ",
        };
    },
    methods: {
        searchedValue() {
          this.searchValue = this.text;
          this.text=""
        }
    },
 
}




</script>

<template>
    <div >
        <form class="search"  v-on:submit.prevent="searchedValue()">
        <label for=""> Search your favorite movie</label>
        <input 
        class="search__input"
        type="text" 
        placeholder="search your favorite movie" 
       v-model="text"
        >
        <button class="button" >Search</button>
    </form>
    </div>

    <MovieList :value="searchValue"/>
</template>