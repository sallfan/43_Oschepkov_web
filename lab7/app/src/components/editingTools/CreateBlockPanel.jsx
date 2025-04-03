import React from 'react';
import "../../styles/tools.css";

const CreateBlockPanel = ({ onCreate }) => {
    const [type, setType] = React.useState("TextBlock");

    return (
        <div className="creation">
            <p>Создать</p>
            <select id="block-type-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="TextBlock">Параграф</option>
                <option value="ListBlock">Список</option>
                <option value="PictureBlock">Картинка</option>
            </select>
            <button id="add-block-button" onClick={() => onCreate(type)}>
                <img src="/img/add-icon.svg" alt="Добавить" className="big-icon" />
            </button>
        </div>
    );
};

export default CreateBlockPanel;