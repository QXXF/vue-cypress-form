<script setup lang="ts">
    // #Components
    import TextInput from '@/components/inputs/TextInput.vue'
    import MailInput from '@/components/inputs/MailInput.vue'
    import SelectField from '@/components/inputs/SelectField.vue'
    import { inputTypes } from '@/types'

    // #Lifecycle
    const { inputs } = defineProps({
        inputs: Object
    })

</script>

<template>
    <div v-for="model in inputs" >
        <TextInput v-if="model.type == inputTypes.TEXT" :model="model" />
        <MailInput v-if="model.type == inputTypes.MAIL" :model="model" />
        <SelectField v-if="model.type == inputTypes.SELECT" :model="model" />
    </div>
</template>