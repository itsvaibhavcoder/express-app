import Note from '../models/note.model';
import { INote } from '../interfaces/note.interface';


class NoteService {

  //create new Note
  public createNote = async (body: INote): Promise<Object> => {
    const data = await Note.create(body);
    return data;
  };
  
  //Get single note
  public getSingleNote = async (id: String): Promise<INote | null> => {
    const note = (await Note.findById(id).exec());
    return note;
  };

  // Get all notes
  public getAll = async(UserId: String): Promise<INote[]>=>{
    try{
     console.log("UserID --->", UserId);
      return await Note.find({ UserId }).exec();
    }
    catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
  }
}
  
  // Update the present Note
  public Update = async(body: Object): Promise<Object> => {
    const updated_Note = Note.updateOne(body);
    return updated_Note;
  }
  
  //Update note by Id
  public UpdateById = async (id: string, updateData: Object): Promise<Object | null> => {
    const updated_Note = await Note.findByIdAndUpdate(
        id,
        updateData,
        { new: true, useFindAndModify: false }
    );
    return updated_Note;
}
  
//delete by Id
  public deleteById = async (id: string): Promise<boolean> => {
    const delete_Count = (await Note.deleteOne({ _id: id })).deletedCount;
    return delete_Count > 0;
  }

};


export default NoteService;