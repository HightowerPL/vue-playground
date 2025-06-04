<template>
    <nav class="sidebar"
        :class="[ isSidebarOpen ? 'opened' : '' ]"
    >
        <div class="sidebar__header">
            <h1 class="text-xxl font-bold text-green">PORTAL</h1>
        </div>
        <div class="sidebar__body">
            <ul class="sidebar__nav">
                <li v-for="item in items" :key="item.id" class="sidebar__nav-item">
                    <router-link
                        data-n="PRODUCTS"
                        class="sidebar__nav-link"
                        :to="item.path"
                    >
                        <OhVueIcon
                            class="sidebar__icon"
                            :name="item.icon"
                        />
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import { ref } from 'vue';
import { useGlobalStore } from '../../store/global.ts';
import { storeToRefs } from 'pinia';

const { isSidebarOpen } = storeToRefs(useGlobalStore());

const items = ref([
    { id: 1, name: 'Home', path: '/', icon: 'ri-home-5-fill' },
    { id: 2, name: 'Products', path: '/products', icon: 'io-cart-sharp' },
    { id: 3, name: 'To do', path: '/todolist', icon: 'co-todoist' },
    { id: 4, name: 'Snackbar', path: '/snack', icon: 'fa-flag' },
    { id: 5, name: 'Cats', path: '/cats', icon: 'fa-cat' },
    { id: 6, name: 'Form', path: '/form', icon: 'si-formstack' },
]);

</script>

<style scoped lang="scss">
.sidebar {
    position: relative;
    z-index: 20;
    background: var(--sidebar-bg-color, #f8f9fa);
    box-shadow: var(--box-shadow, 0 4px 8px var(--color-green));
    text-align: left;

    @media screen and (max-width: 1023px) {
        position: fixed;
        z-index: var(--z-sidebar, 1000);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        transition: transform .3s ease-in-out;

        &.opened {
            transform: translateX(0);
        }
    }

    @media screen and (min-width: 1024px) {
        min-width: 250px;
    }

    &__header {
        padding: 24px 20px;
    }

    &__icon {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        fill: var(--sidebar-font-color, #fff);
        transition: fill .3s;

    }

    &__nav {
        display: grid;
        gap: 8px;

        &-link {
            transition: background-color .3s, color .3s;
            color: var(--sidebar-font-color, #fff);
            font-weight: var(--sidebar-font-weight, 300);
            padding: 12px 20px;
            display: block;
            font-size: 18px;
            text-align: left;
            position: relative;
            text-transform: uppercase;
            overflow: hidden;

            @media screen and (min-width: 1024px) {
                padding: 6px 16px;
                font-size: 16px;
            }

            &:before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 100%;
                z-index: -1;
                opacity: 0;
                transform: translateY(calc(100% + 1px));
                background-color: var(--sidebar-active-link-bg-color, #007bff);
                transition: transform .3s cubic-bezier(0.23, 1, 0.320, 1), opacity .3s;

            }

            &:hover {
                color: var(--sidebar-hover-link-color, #007bff);

                .sidebar__icon {
                    fill: var(--sidebar-hover-link-color, #007bff);
                }
            }

            &.router-link-active {
                color: var(--sidebar-active-link-color, #007bff);
                font-weight: 700;

                .sidebar__icon {
                    fill: var(--sidebar-active-link-color, #007bff);
                }
                
                &:before {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }
    }

}

</style>