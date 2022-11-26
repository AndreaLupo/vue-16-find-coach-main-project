<template>
  <base-card>
    <section>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </section>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm
  },
  methods: {
    saveData(formData) {
      this.$store.dispatch('coaches/registerCoach', formData);
      // go to the new route and not allow to go back
      this.$router.replace('/coaches');
    }
  }
}
</script>

<style>

</style>