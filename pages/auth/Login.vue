<template>
  <v-row>
    <v-col>
      <v-card
        elevation="3"
        class="rounded-lg"
      >
        <v-card-title>
          로그인
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-text-field
              v-model="models.userId"
              :rules="rules.userId"
              solo
              required
              clearable
              color="primary"
              label="User ID"
              placeholder="ID"
              class="rounded-lg"
              prepend-icon="mdi-account-circle-outline"
            />

            <v-text-field
              v-model="models.password"
              :rules="rules.password"
              solo
              required
              clearable
              color="primary"
              type="password"
              label="Password"
              placeholder="Password"
              class="rounded-lg"
              prepend-icon="mdi-lock-outline"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            large
            elevation="3"
            class="rounded-lg"
            color="primary"
            @click="onClickLogin"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref,
  useContext
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Login',
  setup () {
    const form = ref()
    const context = useContext()
    const models = reactive({
      userId: '',
      password: ''
    })

    const rules = reactive({
      userId: [
        (v?: string) => !!v || '아이디를 입력 해 주세요.'
      ],
      password: [
        (v?: string) => !!v || '비밀번호를 입력 해 주세요.'
      ]
    })

    const onClickLogin = async () => {
      if (!form.value.validate()) {
        return
      }

      const { userId, password } = models
      try {
        const result = await context.$axios.$post('/api/auth/login', {
          userId, password
        })
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    }

    return {
      models,
      form,
      rules,
      onClickLogin
    }
  }
})
</script>

<style scoped>

</style>
