import React from 'react';
import "../../styles/tools.css";

const EditPanel = ({type, onDelete, changeImageUrl}) => {


    function uploadImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = (event) => {
            const file = event.target.files[0];

            if (file) {
                const imageUrl = URL.createObjectURL(file);
                changeImageUrl(imageUrl);
            }
        };

        input.click();
    }

    return (
        <div className="block-tools">
            <button name="deleteBlock" className="tool-button" onClick={onDelete}>
                <img src="/img/delete-icon.svg" alt="Удалить" className="icon"/>
            </button>
            {
                type === "PictureBlock"
                ? <button name="changeImg" className="tool-button" onClick={uploadImage}>
                        <img src="/img/pic-icon.png" alt="Изменить картинку" className="icon"/>
                    </button>
                : ""
            }
        </div>
    );
};

export default EditPanel;