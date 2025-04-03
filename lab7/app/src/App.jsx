import React from "react";
import Header from "./components/Header";
import {Route, Routes} from "react-router";
import DataBase from "./components/DataBase";
import {postService} from "./services/postsService";
import BlocksList from "./components/BlocksList";
import {useOopsyChaos} from "./components/editingTools/OopsyChaosContext.";

const App = () => {

    const [blocks, setBlocks] = React.useState([]);
    const [posts, setPosts] = React.useState([]);

    const {oopsyChaos, setOopsyChaos} = useOopsyChaos();

    const db = new postService(setPosts);

    function deleteBlock(id) {
        setBlocks(blocks => blocks.filter(block => block.id !== id))
        db.deletePost(posts, id);
    }

    function updateBlock(id, updatedData) {
        setBlocks(blocks =>
            blocks.map(block => {
                if (block.id === id) {
                    return { ...block, ...updatedData };
                }
                return block;
            })
        );
        db.updatePost(posts, id, {title: updatedData.title, body: updatedData.text});
    }

    function changeImageUrl(id, newUrl) {
        setBlocks(blocks =>
            blocks.map(block => {
                if (block.id === id) {
                    if (block.type !== "PictureBlock") {
                        console.error(`Ошибка: блок с id=${id} не является PictureBlock`);
                        return block;
                    }
                    return { ...block, imageUrl: newUrl };
                }
                return block;
            })
        );
    }

    function createBlock(type) {
        const newBlock = {
            id: Date.now(),
            type,
            title: "Заголовок"
        };

        switch (type) {
            case "TextBlock":
                newBlock.text = "Текст";
                break;
            case "ListBlock":
                newBlock.items = ["Элемент 1", "Элемент 2", "Элемент 3"];
                break;
            case "PictureBlock":
                newBlock.text = "Текст";
                newBlock.imageUrl = "/img/default.jpeg";
                break;
            default:
                console.error(`Ошибка: Неизвестный тип блока: ${type}`);
                return;
        }

        setBlocks(blocks => [...blocks, newBlock]);
        db.createPost(posts, newBlock.id, newBlock.title, (type !== "ListBlock" ? newBlock.text : newBlock.items.join("\n")), 1);
    }

    const tools = {deleteBlock: deleteBlock, changeImageUrl: changeImageUrl, createBlock: createBlock, updateBlock: updateBlock};

    function createMeat() {
        let text = "";
        const id = Date.now();
        let newBlock = {
            id: id,
            type: "LoadingBlock",
        };
        setBlocks([...blocks, newBlock])
        fetch('https://baconipsum.com/api/?type=meat-and-filler')
            .then(response => {
                return response.json();
            })
            .then(data => {
                text = data.join(" ");
            })
            .then(() => {
                db.createPost(posts, id, "MEAT", text);
            })
            .then(() => {
                setBlocks(blocks =>
                    blocks.map(block => {
                        if (block.id === id) {
                            return { ...block, type:"TextBlock", title: "MEAT", text: text };
                        }
                        return block;
                    }));
            })
            .catch(error => {
                console.error('Ошибка:', error);
            })
    }

    function createChaos(){
            if (!oopsyChaos)
                setOopsyChaos(true);
            const imgUrl = "https://thispersondoesnotexist.com/?ref=public_apis&utm_medium=website";
            const id = Date.now();
            db.createPost(posts, id, "ПОСМОТРИТЕ", "Вы запустили бесконечный порочный круг хаоса. Теперь случайные люди будут заперты в вашем мониторе и сверлить вашу душу взглядом. Вам не стыдно?");
        let newBlock = {
            id: id,
            type: "PictureBlock",
            title: "ПОСМОТРИТЕ",
            text: "Вы запустили бесконечный порочный круг хаоса. Теперь случайные люди будут заперты в вашем мониторе и сверлить вашу душу взглядом. Вам не стыдно?",
            imageUrl: imgUrl
        };
        setBlocks([...blocks, newBlock]);
    }

    return (
        <div>
            <Header title="Конструктор" onCreateMeatAPI={createMeat} onCreateChaosAPI={createChaos}/>
            <Routes>
                <Route path="/" element={<BlocksList blocks={blocks} tools={tools} />} />
                <Route path="/db" element={<DataBase dataBasePosts={posts}/>} />
            </Routes>
        </div>
    );
};

export default App;
