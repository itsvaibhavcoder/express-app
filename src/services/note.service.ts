import Note from '../models/note.model';
import { INote } from '../interfaces/note.interface';


class NoteService {

  //create new Note
  public Add = async (body: INote): Promise<Object> => {
    const data = await Note.create(body);
    return data;
  };
  
  //Get single note
  public getSingleNote = async (id: String): Promise<INote | null> => {
    const note = (await Note.findById(id).exec());
    return note;
  };

  // Get all notes
  public getAll = async(): Promise<INote[]>=>{
      const notes = await Note.find().exec();
      return notes;
  }
  
  // Update the present Note
  public Update = async(body: Object): Promise<Object> => {
    const updated_Note = Note.updateOne(body);
    return updated_Note;
  }
  
  //Delete the given Note
  public delete = async(body: Object): Promise<boolean> => {
    const delete_Count = (await Note.deleteOne(body)).deletedCount;
    return delete_Count > 0;
  }

  //Delete by Id
  

};


export default NoteService;