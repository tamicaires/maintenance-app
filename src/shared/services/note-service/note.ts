import { BaseService } from "@/core/api/base-service";
import { Note } from "@/shared/types/note";

class NoteService extends BaseService<Note> {
  constructor() {
    super("/notes")
  }

}

export const noteService = new NoteService()