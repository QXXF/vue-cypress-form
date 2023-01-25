<script setup lang="ts">
    // #Components
    import TextInput from '@/components/inputs/TextInput.vue'
    import SelectField from '@/components/inputs/SelectField.vue'
    import { inputTypes } from '@/types'

    // #Props
    const { inputs } = defineProps({
        inputs: Object
    })

</script>

<template>
    <div v-for="model in inputs" >
        <TextInput v-if="model.type == inputTypes.TEXT" :key="model.id" :model="model" />
        <SelectField v-if="model.type == inputTypes.SELECT" :key="model.id" :model="model" />
    </div>
</template>