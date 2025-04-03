import React from 'react';
import TextBlock from "./blocks/TextBlock";
import ListBlock from "./blocks/ListBlock";
import PictureBlock from "./blocks/PictureBlock";
import CreateBlockPanel from "./editingTools/CreateBlockPanel";
import {useEditMode} from "./editingTools/EditModeContext";
import LoadingBlock from "./blocks/LoadingBlock";

const BlocksList = ({blocks, tools}) => {

    const {editMode, setEditMode} = useEditMode();

    function renderBlock(block){
        switch (block.type) {
            case 'TextBlock':
                return <TextBlock block={block} key={block.id} onDelete = {() => tools.deleteBlock(block.id)} onUpdate={(updatedData) => tools.updateBlock(block.id, updatedData)}/>;
            case 'ListBlock':
                return <ListBlock block={block} key={block.id} onDelete = {() => tools.deleteBlock(block.id)} onUpdate={(updatedData) => tools.updateBlock(block.id, updatedData)}/>;
            case 'PictureBlock':
                return <PictureBlock block={block} key={block.id} onDelete = {() => tools.deleteBlock(block.id)} onEdit = {tools.changeImageUrl} onUpdate={(updatedData) => tools.updateBlock(block.id, updatedData)} />;
            case 'LoadingBlock':
                return <LoadingBlock key={block.id}/>;
            default:
                return null;
        }
    }


    return (
        <div>
            {blocks.map((block) =>
            renderBlock(block))}
            {editMode ? <CreateBlockPanel onCreate={tools.createBlock}/> : ""}
        </div>
    );
};

export default BlocksList;