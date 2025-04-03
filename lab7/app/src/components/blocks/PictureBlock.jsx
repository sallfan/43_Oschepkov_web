import React from 'react';
import "../../styles/blocks.css";
import EditPanel from "../editingTools/EditPanel";
import {useEditMode} from "../editingTools/EditModeContext";

const PictureBlock = ({block, onDelete, onEdit, onUpdate}) => {

    const [titleText, setTitleText] = React.useState(block.title);
    const [text, setText] = React.useState(block.text);
    const [imageUrl, setImageUrl] = React.useState(block.imageUrl);

    const { editMode, setEditMode } = useEditMode();

    return (
        <div className="env">
            {editMode ? <EditPanel type={"PictureBlock"} onDelete = {onDelete} changeImageUrl={(newUrl) => {onEdit(block.id, newUrl); setImageUrl(newUrl)}} /> : ""}
            <div className="twopart-block" id={`${block.id}`}>
                <img src={`${imageUrl}`} alt={`${titleText}`}/>
                <div className="block">
                    {editMode ? (
                        <>
                            <input
                                type="text"
                                value={titleText}
                                onChange={(e) => {setTitleText(e.target.value); onUpdate({title: e.target.value});}}
                            />
                            <textarea
                                value={text}
                                onChange={(e) => {setText(e.target.value); onUpdate({text: e.target.value});}}
                            />
                        </>
                    ) : (
                        <>
                            <h2>{titleText}</h2>
                            <p>{text}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PictureBlock;