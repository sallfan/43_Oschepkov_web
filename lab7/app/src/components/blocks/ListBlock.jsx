import React from 'react';
import "../../styles/blocks.css";
import {useEditMode} from "../editingTools/EditModeContext";
import EditPanel from "../editingTools/EditPanel";

const ListBlock = ({block, onDelete, onUpdate}) => {

    const { editMode, setEditMode } = useEditMode();

    const [titleText, setTitleText] = React.useState(block.title);
    const [items, setItems] = React.useState(block.items);

    function renderItems(items) {
        return items.map((item, index) => (
            <li key={index}>{item}</li>
        ));
    }

    return (
        <div className="env">
            {editMode ? <EditPanel type={"ListBlock"} onDelete = {onDelete}/> : ""}
            <div className="block" id={`${block.id}`}>
                {editMode ? (
                    <>
                        <input
                            type="text"
                            value={titleText}
                            onChange={(e) => {setTitleText(e.target.value); onUpdate({title: e.target.value});}}
                        />
                    </>
                ) : (
                    <>
                        <h2>{titleText}</h2>
                    </>
                )}
                <ol>{renderItems(items)}</ol>
            </div>
        </div>
    );
};

export default ListBlock;