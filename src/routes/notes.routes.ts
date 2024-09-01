import express, {Router} from 'express';
import noteController from '../controllers/note.controller';
import noteValidator from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

class NoteRoutes {
    private NoteController = new noteController();
    private router = express.Router();
    private NoteValidater = new noteValidator();

    constructor(){
        this.routes();
    }

    private routes = () => {

        //Create the single note
        this.router.post(
            '/create',
            userAuth,
            this.NoteValidater.note_check,
            this.NoteController.create
        );
        
        //get the note by id not required useAuth
        this.router.get(
            '/getById/:id',
            this.NoteValidater.note_check,
            this.NoteController.fetchNoteById
        );
        
        //get all notes
        this.router.get(
            '/getAll',
            userAuth,
            this.NoteValidater.note_check,
            this.NoteController.getAll
        )

        //update note
        this.router.put(
            '/update',
            userAuth,
            this.NoteValidater.note_check,
            this.NoteController.update
        );
        
        //delete note
        this.router.delete(
            '/del',
            userAuth,
            this.NoteValidater.note_check,
            this.NoteController.delete
        );

        // this.router.delete(
        //     '/delById/:id',
        //     userAuth,
        //     this.NoteValidater.note_check,
        //     this.NoteController.deleteById
        // )
    }

    public getRoutes = (): Router => {
        return this.router;
    };
}

export default NoteRoutes;
