<script setup lang="ts">
    // #Framework
    import { updateFormState } from '@/helpers';
    import { ref, type Ref } from 'vue';

    // #Lifecycle
    let { model } = defineProps({
        model: Object
    })

    let dirty: boolean = false
    let errors: Ref<any[]> = ref([])
    let ariaError: boolean | undefined

    const handleInput = (e: any) => {
        validate(e)
    }

    const handleBlur = (e: any) => {
        if ( !dirty ) dirty = true
        validate(e)
    }

    const validate = (e: any) => {
        const input = e.target.value.trim()
        errors.value = updateFormState( model?.id, model?.val, input )
        ariaError = dirty ? errors.value.length ? true : false : undefined
    }

</script>

<template>
    <label :for=model?.label>
        {{ model?.label }}
        <input type="text"
            :name=model?.label
            :placeholder=model?.placeholder
            :value=model?.model
            :aria-invalid=ariaError
            autocomplete="nope"
            @input=handleInput
            @blur=handleBlur
        >
        <div class="error-block"  >
            <small v-if="errors?.length && dirty" v-for="error in errors">{{error}}</small>
        </div>
    </label>
</template>