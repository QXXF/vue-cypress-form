<script setup lang="ts">
    // #Components
    import { getDescriptorValues } from '@/helpers';
    import { activeStep } from '@/store';
    import type { FormStep } from '@/types';
    import { computed, ref, type ComputedRef, type Ref } from 'vue';

    // #Lifecycle
    const { form } = defineProps({
        form: Object
    })

    // Varia al variare dello stato di validazione dello step
    const valid: Ref<boolean> = ref(false)
    
    // RenderedStep
    const rs: ComputedRef<FormStep> = computed(() => {
        // Se ogni input di questo step non ha errori permetti di proseguire
        const active = form?.steps?.find( (x: FormStep) => x?.stepid === activeStep.value.id )
        valid.value =  active?.inputs?.every( (x: any) => x?.errors === false )
        return active
    })

    const logres = () => {
        alert( JSON.stringify( getDescriptorValues() ) )
    }
    
    const nextStep = () => {
        activeStep.value.id++
    }

    const prevStep = () => {
        activeStep.value.id--
    }

</script>

<template>
    <!-- // Primo step -->
    <footer v-if="rs.stepid == 1" >
        <button id="next" v-if="!valid" class="outline secondary not-ready"> Continua </button>
        <button id="next" v-if="valid" class="primary" @click=nextStep > Continua </button>
    </footer>

    <!-- // Steps intermedi -->
    <footer v-if="rs.stepid > 1 && rs.stepid < form?.steps.length" >
        <button id="back" class="outline secondary" @click=prevStep > Indietro </button>
        <button id="next" v-if="!valid" class="outline secondary not-ready"> Continua </button>
        <button id="next" v-if="valid" class="primary" @click=nextStep > Continua </button>
    </footer>

    <!-- // Ultimo step -->
    <footer v-if="rs.stepid == form?.steps.length" >
        <button id="back" class="outline secondary" @click=prevStep > Indietro </button>
        <button id="submit" v-if="!valid" class="outline secondary not-ready"> Invia </button>
        <button id="submit" v-if="valid" class="primary" @click=logres > Invia </button>
    </footer>
</template>

<style scoped>
    article footer {
        display: flex;
        gap: 20px;
        flex-direction: row;
    }
    .not-ready {
        cursor: not-allowed!important;
    }
</style>