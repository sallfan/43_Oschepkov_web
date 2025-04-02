import React from 'react';
import "lab7/css/blocks.css"

const PictureBlock = ({block, editMode}) => {

    const [headerText, setHeaderText] = React.useState('Заголовок');
    const [text, setText] = React.useState('Текст');
    const [imageUrl, setImageUrl] = React.useState('lab7/img/default.jpeg');

    return (
        <div className="twopart-block" id={`${block.id}`}>
            <img src={`${imageUrl}`} alt={`${headerText}`}/>
            <div className="block">
                <h2>${headerText}</h2>
                <p>${text}</p>
            </div>
        </div>
    );
};

export default PictureBlock;