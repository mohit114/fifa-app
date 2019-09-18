<template>
  <v-card flat class="back-ground-color">
 <v-snackbar
    :timeout="snackBarProp.timeout"
    :color="snackBarProp.color"
    :multi-line="snackBarProp.mode === 'multi-line'"
    :vertical="snackBarProp.mode === 'vertical'"
    v-model="snackBarProp.snackbar"
    >
    {{ snackBarProp.text }}
    <v-btn dark flat @click.native="snackBarProp.snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-form @submit.prevent="submit" ref="form" lazy-validation>
      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12 sm8 offset-sm2 mt-2>
            <v-card flat color="transparent">
              <v-card-title primary-title style="padding-left:0px"><h1 style="color:#DC4C46">Get In Touch</h1></v-card-title>
            </v-card>
           <v-card-text style="padding-left:0px">Have any problem or issue? Fill out the form below and I’ll get back to you soon.
           </v-card-text>                                           
          </v-flex>
          </v-layout>
          <v-layout wrap>
          <v-flex xs12 sm8 offset-sm2 mt-3>
            <v-text-field
              color="green darken-2"
              label="Email"
              required
              prepend-icon="email"
              v-model="form.email"
              :rules="rules.emailRules"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm8 offset-sm2 mt-3>
             <v-select
              :items="issues"
              v-model="form.issue"
              label="Select an issue"
              prepend-icon="bug_report"
              required></v-select>
          </v-flex>
          <v-flex xs12 sm8 offset-sm2 mt-3>
            <v-text-field
              color="teal"
              multi-line
              prepend-icon="message"
              required
              v-model="form.message"
              :rules="rules.name"
            >
              <div slot="label">
                Short Description*
              </div>
            </v-text-field>
          </v-flex>
            <v-flex xs12 sm8 offset-sm2 mt-3>
              <v-card flat color="transparent">
            <v-card-actions>
            <v-spacer></v-spacer>          
             <v-btn flat color="red" @click="resetForm">Clear</v-btn>   
              <v-btn
                flat
                color="primary"
                type="submit"
              >Submit</v-btn>       
          </v-card-actions>
              </v-card>
            </v-flex>       
           </v-layout>          
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import axios from 'axios';
  export default {
    data () {
      const defaultForm = Object.freeze({
        email: '',
        message: '',
        issue: null
      })
      return {
        data: '',
        issues: ['Send Password Reset Link', 'Edit Username', 'Remove Account', 'Suggestion', 'Error Report'],
        form: Object.assign({}, defaultForm),
        rules: {
          name: [val => (val || '').length > 0 || 'This field is required'],
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
          ]
        },
        snackBarProp:{
              snackbar: false,
              color: 'success',
              timeout: 8000,
              text: 'Message sent successfully. Thank you for contacting us.',
              mode: 'vertical'
          },
        defaultForm
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.email &&
          this.form.message
        )
      }
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        if (this.$refs.form.validate()) {
            if(this.form.issue){
              axios.post(process.env.ROOT_API + '/add/support',
              this.form
              ).then(response => {
                this.snackBarProp.color = 'success'
                this.snackBarProp.text = 'Message sent successfully. Thank you for contacting us.'
                this.snackBarProp.snackbar = true
                this.resetForm()
            }).catch(err => {
                console.log('Error : ' + err.message);
            })
          }
          else{
            this.snackBarProp.color = 'error'
            this.snackBarProp.text = 'Please select an issue.'
            this.snackBarProp.snackbar = true
          }
        }
      }
    }
  }
</script>
