<!-- TO BE CONTINUED.. -->
<template>
  <div class="form-control" :class="{ invalid: !value.isValid }">
    <label :for="fieldName">{{ label }}</label>
    <slot> 
        <input :type="type" :id="fieldName" v-model.number="value.val" @blur="clearValidity()"/> 
    </slot>
    
    <p v-if="!value.isValid">{{ errorMessage }}</p>

  </div>
</template>

<script>
export default {
    props: {
        fieldName: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        errorMessage: {
            type: String,
            required: false,
            default: 'This field is not valid'
        },
        type: {
            type: String,
            required: false,
            default: 'text',
            validator: function(value) {
                if(value !== 'text' && value !== 'number') {
                    console.error('"type" is not valid. Allowed values are : "text", "number"');
                    return false;
                }
                return true;
            }
        },
        payload: {
            type: Object,
            required: true,
            validator: function(value) {
                console.log('Validating payload', value);
                if(!value.val) {
                    console.error('"val" field not defined');
                    // return false;
                } else if(!value.isValid) {
                    console.error('"isValid" field not defined');
                    return false;
                }
                return true;
            }
        }
    },
    computed: {
        value() {
            return this.payload;
        }
    },
    methods: {
        clearValidity() {
            this.$emit('clearValidity', this.fieldName);
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}
</style>