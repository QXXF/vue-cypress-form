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
        const input = e.target.value
        errors.value = updateFormState( model?.id, model?.val, input )
        // Se l'input è sporco, assegna l'aria relativa alla validazione
        ariaError = dirty ? errors.value.length ? true : false : undefined
    }

</script>

<template>
    <label :for=model?.label>
        {{ model?.label }}
        <!-- :model=model?.model -->
        <select 
            :id=model?.label
            :name=model?.label
            :aria-invalid=ariaError
            autocomplete="nope"
            @change=handleInput
            @blur=handleBlur
        >
            <option value selected>{{ model?.placeholder }}</option>
            <option 
                v-for="{id, label} of model?.set"
                :value=id
                :selected="id == model?.model"
            >
                {{label}}
            </option>
        </select>

        <div class="error-block"  >
            <small v-if="errors?.length && dirty" v-for="error in errors">{{error}}</small>
        </div>
    </label>
</template>