import {root} from "./root.js";
import {PictureBlock, PlaceholderBlock, TextBlock} from "./blocks.js";

export function HomeButton(){

}

export async function CreateMeat() {
    const db = root.db;
    if (db._isShown) {
        return;
    }
    const id = root.addBlock(new PlaceholderBlock());
    let text = "";
    root.render();
    fetch('https://baconipsum.com/api/?type=meat-and-filler')
        .then(response => {
            return response.json();
        })
        .then(data => {
            text = data.join(" ");
            root.putBlock(new TextBlock("MEAT", text), id);
            root.render();
        })
        .then(() => {
        db.createPost(id, "MEAT", text);
    })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

export async function showDB() {
    const db = root.db
    const tools = document.getElementById("root-tools");
    const toggle = root.getEditModeToggle();
    const buttonMeat = document.getElementById("create-meat-button");
    const buttonChaos = document.getElementById("help-me-pls-button");
    if (!db._isShown) {
        root.disableElement(buttonMeat);
        root.disableElement(buttonChaos);
        root.disableElement(toggle);
        root.disableElement(tools);
        db._isShown = true;
        db.Render("LOADING");
        db.Render(db._posts.length > 0 ? "NONE" : "EMPTY")
    } else {
        root.enableElement(buttonMeat);
        if (!root.oopsy){
            root.enableElement(buttonChaos);
        }
        root.enableElement(toggle);
        root.enableElement(tools);
        db._isShown = false;
        db.Render("NONE");
        root.render();
    }
}

export async function Chaos() {
    if (!root.oopsy){
        root.oopsy = true;
        const buttonChaos = document.getElementById("help-me-pls-button");
        root.disableElement(buttonChaos);
        const db = root.db;
        if (db._isShown) {
            return;
        }
        const id = root.addBlock(new PlaceholderBlock());
        root.render();
        const imgUrl = "https://thispersondoesnotexist.com/?ref=public_apis&utm_medium=website";
        root.db.createPost(id, "ПОСМОТРИТЕ", "Вы запустили бесконечный порочный круг хаоса. Теперь случайные люди будут заперты в вашем мониторе и сверлить вашу душу взглядом. Вам не стыдно?");
        root.putBlock(new PictureBlock("ПОСМОТРИТЕ", "Вы запустили бесконечный порочный круг хаоса. Теперь случайные люди будут заперты в вашем мониторе и сверлить вашу душу взглядом. Вам не стыдно?", imgUrl), id);
        root.render();
    }
}