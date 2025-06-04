<template>
    <article class="blockquote">
        <blockquote class="blockquote__quote">
            <p class="">
                {{ quote.message }}
            </p>
        </blockquote>
        <div class="blockquote__footer">
            <picture class="blockquote__image">
                <img
                    class="absolute top-0 left-0 w-full h-full object-contain"
                    :src="quote.image"
                    :alt="quote.author"
                >
            </picture>
            <div class="blockquote__signature">
                <p class="blockquote__author">{{ quote.author }}</p>
                <span class="blockquote__job">{{ quote.job }}</span>
            </div>
        </div>
        
    </article>
</template>

<script setup lang="ts">
    const props = defineProps({
        quote: {
            type: Object,
            default: () => {
                return {
                    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aspernatur, labore recusandae eum nulla ducimus quisquam dolorum. Voluptas, ut quo amet error quae sed neque cum nemo cumque officiis provident?',
                    author: 'John Doe',
                    image: 'https://picsum.photos/800/800',
                    category: 'inspiration'
                }
            }

        }
    })
</script>

<style scoped lang="scss">
.blockquote {
    @apply bg-lightBlack p-10 shadow-md flex flex-col items-start gap-8 text-white text-left;

    &__quote {
        @apply relative;

        &:before {
            content: '“';
            @apply inline-block absolute -top-7 -left-7 opacity-50;
            font-size: 3rem;
            line-height: 1;

        }
        &:after {
            content: '”';
            @apply inline-block absolute top-full left-full opacity-50;
            font-size: 3rem;
            line-height: 1;
        }
    }

    &__footer {
        @apply flex w-full flex-nowrap items-center gap-3 mt-auto;
    }

    &__image {
        @apply relative rounded-full overflow-hidden w-[48px] h-[48px] flex-shrink-0;
    }

    &__signature {
        @apply flex flex-col  items-start text-left;
    }

    &__author {
        @apply font-bold;
    }

    &__job {
        @apply text-xs opacity-80;
    }

    &__category {
        @apply inline-block text-xs py-1 px-3 capitalize border rounded-3xl;
    }
}
</style>