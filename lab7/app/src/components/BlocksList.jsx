import React from 'react';
import TextBlock from "./TextBlock";
import ListBlock from "./ListBlock";
import PictureBlock from "./PictureBlock";

const BlocksList = ({blocks}) => {

    const [editMode, setEditMode] = React.useState(false);

    function renderBlock(block){
        switch(block.type){
            case 'TextBlock':
                return <TextBlock block=block editMode=editMode key={block.id}/>
            case 'OrderedListBlock':
                return <ListBlock block=block editMode=editMode key={block.id}/>
            case 'PictureBlock':
                return <PictureBlock block=block editMode=editMode key={block.id}/>
        }
    }

    return (
        <div>
            {blocks.map((block) =>
            renderBlock(block))}
        </div>
    );
};

export default BlocksList;