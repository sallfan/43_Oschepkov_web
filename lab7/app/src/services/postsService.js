export class postService
{
    constructor(setPosts) {
        this.setPosts = setPosts;
        this._baseUrl = "https://jsonplaceholder.typicode.com/posts";
    }

    async createPost(posts, id, title, body, userId = 1) {
        try {
            const response = await fetch(this._baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id, title, body, userId })
            });
            const newPost = await response.json();
            newPost.id = id;
            this.setPosts([...posts, newPost]);
        } catch (error) {
            console.error("Ошибка при создании поста:", error);
        }
    }

    async updatePost(posts, postId, updatedData) {
        try {
            const response = await fetch(`${this._baseUrl}/${postId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            });
            const updatedPost = await response.json();
            updatedPost.id = postId;

            this.setPosts([posts.map(post =>
                post.id === postId ? { ...post, ...updatedPost } : post
            )]);
        } catch (error) {
            console.error("Ошибка при обновлении поста:", error);
        }
    }

    async deletePost(posts, postId) {
        try {
            await fetch(`${this._baseUrl}/${postId}`, { method: "DELETE" });
            this.setPosts([posts.filter(post => post.id !== postId)]);
        } catch (error) {
            console.error("Ошибка при удалении поста:", error);
        }
    }
}

