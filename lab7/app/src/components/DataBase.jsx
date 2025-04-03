import React from 'react';
import "../styles/blocks.css";

const DataBase = ({dataBasePosts}) => {

    const [posts, setPosts] = React.useState(dataBasePosts);

    function renderPosts(posts) {
        return posts.map((post, index) => (
            <tr key={index}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
            </tr>
        ));
    }

    return (
        <div className="block" id="db-block">
            <h2>База Данных</h2>
            <table className="db-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Заголовок</th>
                    <th>Содержание</th>
                </tr>
                </thead>
                <tbody> {renderPosts(posts)} </tbody>
            </table>
            {posts.length === 0 ? <div className="db-placeholder">Пока что тут ничего нет!</div> : ""}
        </div>
    );
};

export default DataBase;