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
            '/',
            userAuth,
            this.NoteValidater.validate_note,
            this.NoteController.createNote
        );
        
        //Get all notes
        this.router.get(
            '/',
            userAuth,
            this.NoteController.getAll
        )

        //Get the note by id not require useAuth
        this.router.get(
            '/:id',
            this.NoteValidater.validateIdMiddleware,
            this.NoteController.getNoteById
        );
        
        //Update note by Id
        this.router.put(
            '/:id',
            userAuth,
            this.NoteValidater.validateIdMiddleware,
            this.NoteValidater.validate_note,
            this.NoteController.updateById
        );
        
        //Delete by id
        this.router.delete(
            '/:id',
            userAuth,
            //Id validator
            this.NoteValidater.validateIdMiddleware,
            this.NoteController.deleteById
        )

        this.router.put(
           '/isArchive/:id', //isTrash should not be true
           userAuth,
           this.NoteValidater.validateIdMiddleware,
           this.NoteController.isArchive
        )

        this.router.put(
            '/isTrash/:id',
            userAuth,
            this.NoteValidater.validateIdMiddleware,
            this.NoteController.isTrash
        )
    }
    
    public getRoutes = (): Router => {
        return this.router;
    };
}

export default NoteRoutes;
