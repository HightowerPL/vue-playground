<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="grid grid-cols-12 gap-10 items-center">
          <div class="col-span-6 text-left">
            <h1 class="mb-7 text-xxl ">
              Hello World
            </h1>
            <div class="text-m max-w-[560px]">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam officia nam nisi numquam unde, explicabo omnis sapiente facere nemo quod ut sit impedit error, earum nostrum suscipit ipsa perferendis delectus?
              </p>
            </div>
          </div>
          <div class="col-span-5">
            <picture class="block rounded-l-xxl rounded-b-xxl overflow-hidden w-full relative pb-[100%]">
              <img class="absolute top-0 left-0 w-full h-full object-fit-cover" src="https://picsum.photos/800/800" width="800" height="800" alt="">
            </picture>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container-sm text-white text-center">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aspernatur, labore recusandae eum nulla ducimus quisquam dolorum. Voluptas, ut quo amet error quae sed neque cum nemo cumque officiis provident?
        </p>
      </div>
    </div>

    <section class="section">
      <div class="container-lg grid grid-cols-3 gap-10">

        <QuoteCard
          v-for="(quote, index) in quotes"
          :key="index"
          :quote="quote"
          class="col-span-1"
        />


      </div>
    </section>
  </div>

</template>

<script setup lang="ts">
import QuoteCard from '../../components/cards/QuoteCard.vue'


const quotes = [
  {
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aspernatur, labore recusandae eum nulla ducimus quisquam dolorum. Voluptas, ut quo amet error quae sed neque cum nemo cumque officiis provident?',
    author: 'John Doe',
    image: 'https://picsum.photos/800/800',
    job: 'Web Developer',
  },
  {
    message: ' Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.',
    author: 'Merry Slips',
    image: 'https://picsum.photos/800/800',
    job: 'Writer',
  },
  {
    message: 'Believe you can and you’re halfway there.',
    author: 'Someone',
    image: 'https://picsum.photos/800/800',
    job: 'Motivational Speaker',
  },
]
</script>

<style scoped lang="scss">

</style>
