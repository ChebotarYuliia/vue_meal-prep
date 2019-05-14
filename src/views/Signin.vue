<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="brown lighten-4">
            <v-toolbar-title>Login Form</v-toolbar-title>
          </v-toolbar>
          <div v-if="formError">
            'Email or password is wrong'
          </div>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field prepend-icon="person" name="email" label="Email" type="email"
                            v-model="email" :rules="emailRules" required>
              </v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Password" id="password"
                            type="password" required v-model="password" :rules="passwordRules">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="brown lighten-4" :disabled="!valid" @click="submit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Signin',
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      formError: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6
          || 'Password must be greater than 6 characters',
      ],
    };
  },
  methods: {
    ...mapActions('user', {
      userLogin: 'userLogin',
    }),
    submit() {
      if (this.$refs.form.validate()) {
        this.userLogin({
          email: this.email,
          password: this.password,
        });
      } else {
        this.formError = true;
      }
    },
  },
};
</script>

<style scoped>
</style>
