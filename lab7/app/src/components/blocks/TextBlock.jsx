import React from 'react';
import "../../styles/blocks.css";
import {useEditMode} from "../editingTools/EditModeContext";
import EditPanel from "../editingTools/EditPanel";

const TextBlock = ({block, onDelete, onUpdate}) => {

    const [titleText, setTitleText] = React.useState(block.title);
    const [text, setText] = React.useState(block.text);
    const { editMode, setEditMode } = useEditMode();

    return (
        <div className="env">
            {editMode ? <EditPanel type={"TextBlock"} onDelete = {onDelete}/> : ""}
            <div className="block" id={`${block.id}`}>
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

    );
};

export default TextBlock;