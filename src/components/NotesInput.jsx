import React, { useState } from "react";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const toastId1 = 'toast-1';
const toastId2 = 'toast-2';
const toastId3 = 'toast-3';

const NotesInput = ({ addNewNote, closeModal }) => {
    const [formData, setFormData] = useState({
        title: '',
        noteBody: '',
        noteBodyLength: 0
    });

    const onTitleChange = (event) => {
        event.preventDefault();
        if (event.target.value.length <= 50) {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
                noteBodyLength: event.target.value.length
            })
        } else {
            toast.error('Maksimal 50 Karakter', { toastId: toastId1 });
        }
    }

    const onBodyChange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }


    const onSubmitForm = (event) => {
        event.preventDefault();
        if (formData.title === '') {
            toast.error('Judul tidak bisa kosong!', { toastId: toastId2 });
        } else if (formData.noteBody === '') {
            toast.error('Note tidak bisa kosong!', { toastId: toastId3 });
        } else {
            const newData = {
                id: +new Date(),
                title: formData.title,
                body: formData.noteBody,
                archived: false,
                createdAt: new Date().toISOString(),
            }
            const result = addNewNote(newData);
            if (!result.error) {
                toast.success('Note baru tersimpan!');
                setFormData({
                    ...formData,
                    title: '',
                    noteBody: '',
                    noteBodyLength: 0
                })
                closeModal();
            } else {
                toast.error('Note baru gagal tersimpan!');
            }
        }
    }

    return (
        <div className="note-input">
            <i className="note-input__title__closebuton" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
            </i>
            <h2 className="note-input__title__note">Buat Note</h2>
            <form>
                <h3>Judul</h3>
                <input
                    className="note-input__title"
                    type="text"
                    name="title"
                    placeholder="Judul"
                    required
                    value={formData.title}
                    onChange={onTitleChange}
                />
                <p className="note-input__title__char-limit">Karakter tersisa: {50 - formData.noteBodyLength}</p>
                <h3>Note</h3>
                <textarea
                    className="note-input__body"
                    type="text"
                    name="noteBody"
                    placeholder="Tulis note disini..."
                    required
                    value={formData.noteBody}
                    onChange={onBodyChange}
                ></textarea>
                <button type="submit" onClick={onSubmitForm}>Tambahkan note</button>
            </form>
        </div>
    )
}

export default NotesInput;