import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getInitialData } from '../utils/index';

import AppBody from './Body';
import Header from './Header';
import Footer from './Footer';
import 'react-toastify/dist/ReactToastify.min.css';
import autoBind from 'auto-bind';

class NotesApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getInitialData(),
            unfilteredNotes: getInitialData()
        }
        autoBind(this);
    }

    addNewNoteHandler(newNoteData) {
        try {
            this.setState((prevState) => {
                return {
                    notes: [ newNoteData, ...prevState.notes, ],
                    unfilteredNotes: [ newNoteData, ...prevState.unfilteredNotes, ]
                }
            })
            return {
                error: false,
                message: 'Berhasil!'
            }
        }
        catch (error) {
            return {
                error: true,
                message: 'Gagal!'
            }
        }
    }

    onDeleteHandler(id) {
        const result = window.confirm('Apakah yakin ingin hapus ini?');
        if (result) {
            this.setState((prevState) => {
                return {
                    notes: prevState.notes.filter(note => note.id !== id),
                    unfilteredNotes: prevState.unfilteredNotes.filter(note => note.id !== id),
                }
            })
            toast.success('Note Dihapus!');
        } else {
            toast.error('Batal Hapus!');
        }
    }

    onArchiveHandler(id) {
        const noteToModify = this.state.unfilteredNotes.filter(note => note.id === id)[0];
        const modifiedNote = { ...noteToModify, archived: !noteToModify.archived };
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes.filter(note => note.id !== id),
                    modifiedNote
                ],
                unfilteredNotes: [
                    ...prevState.unfilteredNotes.filter(note => note.id !== id),
                    modifiedNote
                ],
            }
        });
        if (noteToModify.archived) {
            toast.success('Note Pindah ke Aktif!');
        } else {
            toast.success('Note Diarsipkan!');
        }
    }

    onSearchHandler(text) {
        if (text.length !== 0 && text.trim() !== '') {
            this.setState({
                notes: this.state.unfilteredNotes.filter(note => note.title.toLowerCase().includes(text.toLowerCase())),
            })
        } else {
            this.setState({
                notes: this.state.unfilteredNotes,
            })
        }
    }
    
    render() {
        return (
            <div>
                <Header onSearch={this.onSearchHandler}/>
                <AppBody notes={this.state.notes} addNewNote={this.addNewNoteHandler} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
                <Footer />
                <ToastContainer 
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        )
    }
}

export default NotesApp;