import React from 'react';
import "lab7/css/blocks.css"

const ListBlock = ({block, editMode}) => {

    const [headerText, setHeaderText] = React.useState('Заголовок');
    const [items, setItems] = React.useState(['Элемент №1', 'Элемент №2', 'Элемент №3']);

    function renderItems(items) {
        return items.map(item => `<li contenteditable="${editMode}">${item}</li>`).join('');
    }

    return (
        <div className="block" id={`${block.id}`}>
            <h2 contentEditable={editMode}>${headerText}</h2>
            {renderItems(items)}
        </div>
    );
};

export default ListBlock;