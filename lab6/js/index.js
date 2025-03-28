import { root } from "./root.js";
import { TextBlock, OrderedListBlock, PictureBlock} from "./blocks.js";

let editMode = false;

document.addEventListener("DOMContentLoaded", () => {

    root.render();

    let toggle = root.getEditModeToggle();
    toggle.addEventListener('change', () => {
        root.render();
        editMode = root.inEditMode();
    });
});

