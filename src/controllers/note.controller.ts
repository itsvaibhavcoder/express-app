import HttpStatus from 'http-status-codes';
import noteService from '../services/note.service';
import { Request, Response, NextFunction } from 'express';

class NoteController {
  public NoteService = new noteService();

  public createNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const create_note = await this.NoteService.createNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: create_note,
        message: 'Created the note'
      });
    } 
    catch (error) {
      // res.status(HttpStatus.BAD_REQUEST).json({
      //   code: HttpStatus.BAD_REQUEST,
      //   message:  error.message
      // });
      next(error)
    }
  };

  public getNoteById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const noteId = req.params.id.trim();
      const note = await this.NoteService.getSingleNote(noteId);

      if (note) {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: note,
          message: 'Note successfully recieved'
        });
      } 
      else {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'Note not found'
        });
      }
    } 
    catch (error) {
      next(error);
    }
  };


  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(req.body)
      const UserID = req.body.UserID;
      console.log("user Id--->", UserID)
      const notes = await this.NoteService.getAll(UserID);
      console.log("Notes --->", notes);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: notes,
        message: 'All Notes successfully recieved'
      });
    } 
    catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message
      })
      //next(error)
    }
  };

  
  //Update by Id
  public updateById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const noteId = req.params.id.trim();
      const update_note = await this.NoteService.UpdateById(noteId, req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: update_note,
        message: 'Updated the note'
      });
    } 
    catch (error) {
      next(error);
    }
  };

  public deleteById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const noteId = req.params.id.trim();
      const delete_note = await this.NoteService.deleteById(noteId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: delete_note,
        message: 'Deleted the note'
      });
    } 
    catch (error) {
      next(error);
    }
  };
}

export default NoteController;
