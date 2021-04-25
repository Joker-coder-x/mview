import BookMark from './bookmark/index.js';
import Button from './button/index.js';
import Checkbox from './checkbox/index.js';
import Dropdown from './dropdown/index.js';
import DropdownItem from './dropdown-item/index.js';
import DropdownMenu from './dropdown-menu/index.js';
import Icon from './icon/index.js';
import ScratchCard from './scratch-card/index.js';
import Slots from './slots/index.js';
import SlotsItem from './slots-item/index.js';
import SlotsItemContent from './slots-item-content/index.js';
import TabPane from './tab-pane/index.js';
import Tabs from './tabs/index.js';
import Triangle from './triangle/index.js';
import VerificationExp from './verification-exp/index.js';
import VerificationSlider from './verification-slider/index.js';

const components = [
    BookMark,
    Button,
    Checkbox,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Icon,
    ScratchCard,
    Slots,
    SlotsItem,
    SlotsItemContent,
    TabPane,
    Tabs,
    Triangle,
    VerificationExp,
    VerificationSlider
];

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

export default {
    version: '1.0.0',
    install,
    BookMark,
    Button,
    Checkbox,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Icon,
    ScratchCard,
    Slots,
    SlotsItem,
    SlotsItemContent,
    TabPane,
    Tabs,
    Triangle,
    VerificationExp,
    VerificationSlider
}