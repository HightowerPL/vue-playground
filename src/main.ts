import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import DefaultLayout from './layout/DefaultLayout.vue'
import { router } from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiDoubleQuotesL, MdSkipnextRound, BiChatLeftQuoteFill, BiArrowRepeat, BiPeopleFill, IoBasketballSharp, FaPeopleArrows, IoPencil, IoPencilSharp, FaChevronDown, FaCat, FaFlag, RiZhihuFill, IoCartSharp, RiHome5Fill, CoTodoist, SiFormstack, FaWpforms, MdAddbox, FaTrash, IoCloseOutline, BiPauseFill, BiPlayFill, BiArrowRightCircleFill } from "oh-vue-icons/icons";
import SlideUpDown from 'vue-slide-up-down'
import FilledButton from './components/Buttons/FilledButton.vue'
import OutlinedButton from './components/Buttons/OutlinedButton.vue'
import EditTeamModal from './components/modals/EditTeamModal.vue'
import Checkbox from './components/fields/Checkbox.vue';
import Textfield from './components/fields/Textfield.vue';
import CardTemplate from './components/cards/CardTemplate.vue'

addIcons(
    RiDoubleQuotesL,
    MdSkipnextRound,
    BiChatLeftQuoteFill,
    BiArrowRepeat,
    BiPeopleFill,
    FaPeopleArrows, 
    IoPencilSharp, 
    IoBasketballSharp, 
    IoPencil, 
    FaChevronDown, 
    FaCat, 
    FaFlag, 
    RiZhihuFill, 
    IoCartSharp, 
    RiHome5Fill, 
    CoTodoist, 
    SiFormstack, 
    FaWpforms, 
    MdAddbox, 
    FaTrash,
    IoCloseOutline,
    BiPauseFill,
    BiPlayFill,
    BiArrowRightCircleFill
);

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component('default-layout', DefaultLayout);
app.component("OutlinedButton", OutlinedButton);
app.component("FilledButton", FilledButton);
app.component("EditTeamModal", EditTeamModal);
app.component("Checkbox", Checkbox)
app.component("Card", CardTemplate)
app.component("Textfield", Textfield);
app.component("v-icon", OhVueIcon);
app.component('SlideUpDown', SlideUpDown)
app.use(router)
app.mount('#app')
