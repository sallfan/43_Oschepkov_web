import React from 'react';
import "lab7/css/blocks.css"

const TextBlock = ({block, editMode}) => {

    const [headerText, setHeaderText] = React.useState('Заголовок');
    const [text, setText] = React.useState('Текст');

    return (
        <div className="block" id={`${block.id}`}>
            <h2 contentEditable={editMode}>${headerText}</h2>
            <p contentEditable={editMode}>${text}</p>
        </div>
    );
};

export default TextBlock;