import { useState } from "react";
import { Modal } from "../Modal/Modal";
import css from "./ImageGalleryItem.module.css"

export const ImageGalleryItem = ({image, tags, largeImage}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
        
    return (
        <>
            <li className={css.ImageGalleryItem} onClick={openModal}>
                <img className={css.ImageGalleryItemImage} src={image} alt={tags} />
            </li>
            <Modal isOpen={isModalOpen} onClose={closeModal} largeImage={largeImage} tags={tags} />
        </>
    )
}