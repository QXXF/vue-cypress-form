<script setup lang="ts">
    // #Components
    import FormAssembler from '@/components/FormAssembler.vue'
    import FormAssemblerFooter from '@/components/FormAssemblerFooter.vue'

    // #Framework
    import { computed, type ComputedRef } from 'vue';
    import { activeStep } from '@/store'
    import type { FormStep } from '@/types';

    // #Lifecycle
    const { form } = defineProps({
        form: Object
    })

    // #Definizioni
    const af: ComputedRef<FormStep> = computed(() => {
        // Assegna alla vista corrente lo step associato a #activeStep
        const { id } = activeStep.value
        return form?.steps.find( 
            (step: FormStep) => step.stepid === id
        )
    })

</script>

<template>
    <div id="multistepper">

        <div id="step-marker">
           <div v-for="step of form?.steps" :class="{ active: af.stepid >= step.stepid }">
                <h3>{{ step.stepid }}</h3>
            </div>
        </div>

        <article>
            <h2>{{af?.title}}</h2>
            <FormAssembler :inputs=af?.inputs />
            <FormAssemblerFooter :form=form />
        </article>
    </div>
</template>

<style lang="scss" scoped>

    #multistepper {
        width: 60vw
    }

    #step-marker {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: -10px;
        gap: 50px;
        div {
            position: relative;

            display: flex;
            justify-content: center;
            align-items: center;

            height: 50px;
            width: 50px;

            border-radius: 100%;

            border: 2px solid var(--primary-hover);

            background: var(--card-background-color);
            box-shadow: var(--card-box-shadow);
            box-sizing: content-box;

            h3 {
                margin: 0;
                color: var(--primary);
                transform: translateY(-2.5px);
            }
            &:not(:last-of-type)::after {
                position: absolute;
                content: "";
                height: 2px;
                width: 50px;
                
                top: 50%;
                right: calc( -100% - 2px);
                background: var(--primary-hover);
            }
            &.active {
                background: var(--primary);
                h3 {
                    color: var(--contrast-inverse);
                }
            }
        }
    }
</style>