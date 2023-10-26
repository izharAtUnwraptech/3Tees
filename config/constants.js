import { swatch, fileIcon, ai, logoShirt, stylishShirt, backShirt, cancel } from "../public/assets/";
import aip from "@public/assets/ai.png";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: "/assets/swatch.png",
  },
  {
    name: "filepicker",
    icon: "/assets/file.png",
  },
  {
    name: "aipicker",
    icon: "/assets/ai.png",
  },
  {
    name: "close",
    icon: "/assets/cancel.png",
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: "/assets/logo-tshirt.png",
  },
  {
    name: "stylishShirt",
    icon: "/assets/stylish-tshirt.png",
  },
  {
    name: "backShirt",
    icon: "/assets/backtshirt.png",
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
  back: {
    stateProperty: "backDecal",
    filterTab: "backShirt",
  },
};
