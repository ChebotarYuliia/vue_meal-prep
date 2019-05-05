<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6 lg4 v-for="(item, idx) in recipes" :key="idx">
        <v-card>
          <v-responsive>
              <v-img :src="item.recipe.image"></v-img>
          </v-responsive>

          <v-card-text>
              <div class="title">{{item.recipe.label}}</div>

              <div class="subheading">Ingredients</div>
              <ul>
                  <li v-for="(ingredient, i) in item.recipe.ingredientLines" :key="i">{{ingredient}}</li>
              </ul>
              <v-card-actions>
                <v-btn color="green" dark @click="orderRecipe(item)">Order</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '@/router';

export default {
  name: 'MealRecipes',
  computed: {
    ...mapGetters('recipes', {
      recipes: 'getRecipes',
    }),
    ...mapGetters('user', {
      isAuthenticated: 'getIsAuthenticated',
    }),
  },
  methods: {
    ...mapActions('recipes', {
      addRecipe: 'addRecipe',
    }),
    orderRecipe(item) {
      if (this.isAuthenticated) {
        this.addRecipe(item);
      } else {
        this.$router.push('/sign-in');
      }
    },
  },
};
</script>
