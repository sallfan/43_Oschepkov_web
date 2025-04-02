import {Block} from "./blocks.js";

class DBBlock extends Block {
    constructor (header = "Заголовок", posts = []){
        super(header);
        this._posts = posts;
        this.type = "DBBlock";
        this._baseUrl = "https://jsonplaceholder.typicode.com/posts";
        this._isShown = false;
    }

    getHTML = (e) => {

        if (!this._isShown) {
            return "";
        }

        const tableRows = this._posts.map(post =>
            `<tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
            </tr>`).join('');

        return `<div class="block" id="db-block">
                    <h2>${this.header}</h2>
                    <table class="db-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Заголовок</th>
                            <th>Содержание</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
                ${this._setPlaceholder(e)}
                </div>`
    };

    _setPlaceholder(e = "NONE"){
        switch (e) {
            case "NONE": return ""

            case "EMPTY": return `<div id="db-placeholder">
                                        Пока что тут ничего нет!
                                  </div>`

            case "LOADING": return `<div id="db-placeholder">
                                        <img src="./img/loading.gif">
                                    </div>`

            default: return `<div id="db-placeholder">
                                        ОШИБКА! :C
                                  </div>`
        }

    }

    async createPost(id, title, body, userId = 1) {
        try {
            const response = await fetch(this._baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id, title, body, userId })
            });
            const newPost = await response.json();
            newPost.id = id;
            this._posts.push(newPost);
        } catch (error) {
            console.error("Ошибка при создании поста:", error);
        }
    }

    async updatePost(postId, updatedData) {
        try {
            const response = await fetch(`${this._baseUrl}/${postId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            });
            const updatedPost = await response.json();
            updatedPost.id = postId;

            this._posts = this._posts.map(post =>
                post.id === postId ? { ...post, ...updatedPost } : post
            );
        } catch (error) {
            console.error("Ошибка при обновлении поста:", error);
        }
    }

    async deletePost(postId) {
        try {
            await fetch(`${this._baseUrl}/${postId}`, { method: "DELETE" });
            this._posts = this._posts.filter(post => post.id !== postId);
        } catch (error) {
            console.error("Ошибка при удалении поста:", error);
        }
    }

    Render(e) {
        document.getElementById("content").innerHTML = this.getHTML(e);
    }

}

export const db = new DBBlock("База Данных");