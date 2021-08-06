<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container class="app-max-width">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent
} from '@nuxtjs/composition-api'
import AppBar from '~/components/organisms/AppBar.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    AppBar
  },
  setup () {
    return {
    }
  }
})
</script>
