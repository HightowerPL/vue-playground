<template>
    <div class="flex flex-col justify-start py-8 xl:pt-10">
        <h1 class="text-xl text-green font-bold mb-9">To Do List</h1>

        <div class="w-full max-w-[600px] mx-auto">
            <form @submit.prevent="addToDo" class="flex gap-2 relative border border-green">
                <input class="form__input  p-3outline-none w-full" v-model="newToDo" name="add-to-do" placeholder="Enter to do..." >
                <button
                    class="btn btn-square btn--filled"
                    type="submit">
                    <span class="btn__inner">
                        <OhVueIcon name="md-addbox"/>
                    </span>
                </button>
            </form>

            <div class="mt-6">
                <Transition name="slide-in" mode="out-in">
                    <TransitionGroup name="slide-in" tag="ol" v-if="todos.length > 0" class="grid gap-1">
                        <li v-for="(item, index) in todos" :key="item" 
                            class="flex items-center justify-between mb-0.5 py-3 pl-4 pr-1 bg-rose text-black relative">
                            <p class=" grow text-left flex items-center gap-4">
                                <span class="text-lg mr-1 font-bold">{{  index + 1}}</span>
                                <span class="text-md ">{{ item }}</span>
                            </p>
                            <button
                                class="btn-red btn btn-square btn--filled"
                                type="button"
                                @click="removeItem(index)"
                            >
                                <span class="btn__inner">
                                    <OhVueIcon name="fa-trash"/>
                                </span>
                            </button>
                        </li>
                    </TransitionGroup>
                    <p class="" v-else>
                        No todos for today!
                    </p>
                </Transition>


            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useSnackbar } from '../../store/snackbar';
    import { OhVueIcon } from 'oh-vue-icons';

    const todos = ref<string[]>([])
    const newToDo = ref('')
    const snackbar = useSnackbar()

    const addToDo = () => {
        if (newToDo.value == '') {
            const data = {
                content: 'Task cannot be empty',
                type: 'error',
                operationType: null,
                timeout: 5000,
            }
            snackbar.show(data)
        } else {
            todos.value.push(newToDo.value)
            newToDo.value = ''
        }
    }

    const removeItem = (index: number) => {
        todos.value.splice(index, 1)
    }

</script>

<style scoped lang="scss">
.w-custom {
    width: 640px
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.5s ease;
}

.slide-in-enter-from,
.slide-in-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>