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
            '',
            userAuth,
            this.NoteValidater.validate_note,
            this.NoteController.createNote
        );
        
        //get the note by id not required useAuth
        this.router.get(
            '/:id',
            this.NoteValidater.validate_note,
            this.NoteController.fetchNoteById
        );
        
        //get all notes
        this.router.get(
            '/getAll',
            userAuth,
            this.NoteValidater.validate_note,
            this.NoteController.getAll
        )

        //update note
        this.router.put(
            '/update',
            userAuth,
            this.NoteValidater.validate_note,
            this.NoteController.update
        );
        
        //Update note by Id
        this.router.put(
            '/update/:id',
            userAuth,
            this.NoteValidater.validate_note,
            this.NoteController.updateById
        );
        
        //delete by id
        this.router.delete(
            '/:id',
            userAuth,
            this.NoteValidater.validate_note,
            this.NoteController.deleteById
        )
    }

    public getRoutes = (): Router => {
        return this.router;
    };
}

export default NoteRoutes;
