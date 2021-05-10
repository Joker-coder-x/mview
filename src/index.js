import BookMark from "./components/bookmark/index.js";
import Button from "./components/button/index.js";
import Checkbox from "./components/checkbox/index.js";
import Dropdown from "./components/dropdown/index.js";
import DropdownItem from "./components/dropdown-item/index.js";
import DropdownMenu from "./components/dropdown-menu/index.js";
import Icon from "./components/icon/index.js";
import ScratchCard from "./components/scratch-card/index.js";
import Slots from "./components/slots/index.js";
import SlotsItem from "./components/slots-item/index.js";
import SlotsItemContent from "./components/slots-item-content/index.js";
import TabPane from "./components/tab-pane/index.js";
import Tabs from "./components/tabs/index.js";
import Triangle from "./components/triangle/index.js";
import VerificationExp from "./components/verification-exp/index.js";
import VerificationSlider from "./components/verification-slider/index.js";
import { Row, Col } from "./components/layout/index.js";
import Container from "./components/container/index.js";
import Header from "./components/header/index.js";
import Main from "./components/main/index.js";
import Aside from "./components/aside/index.js";
import Footer from "./components/footer/index.js";
import Switch from "./components/switch/index.js";
import Popper from "./components/popper/index.js";
import Render from "./components/render/index.js";
import Rate from "./components/rate/index.js";
import Collapse from "./components/collapse/index.js";
import CollapsePanel from "./components/collapse-panel/index.js";

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
  VerificationSlider,
  Row,
  Col,
  Container,
  Header,
  Main,
  Aside,
  Footer,
  Switch,
  Popper,
  Render,
  Rate,
  Collapse,
  CollapsePanel
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

// auto install
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "1.0.0",
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
  VerificationSlider,
  Row,
  Col,
  Container,
  Header,
  Main,
  Aside,
  Footer,
  Switch,
  Popper,
  Render,
  Rate,
  Collapse,
  CollapsePanel
};