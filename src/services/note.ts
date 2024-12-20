import { handleRequest, IApiResponse } from "@/services/api";
import { ICreateNote, INote } from "@/shared/types/note";

const create = async (
  workOrderId: string,
  data: ICreateNote,
): Promise<IApiResponse<INote>> => {
  const response = await handleRequest<INote>({
    method: "POST",
    url: `/notes/${workOrderId}`,
    data,
  });

  return response;
};

const update = async (
  noteId: string,
  data: ICreateNote,
): Promise<IApiResponse<INote>> => {
  const response = await handleRequest<INote>({
    method: "PUT",
    url: `/notes/${noteId}`,
    data,
  });

  return response;
}

const deleteNote = async (
  noteId: string,
): Promise<IApiResponse<INote>> => {
  const response = await handleRequest<INote>({
    method: "DELETE",
    url: `/notes/${noteId}`,
  });

  return response;
}

const getAll = async (): Promise<IApiResponse<INote[]>> => {
  const response = await handleRequest<INote[]>({
    method: "GET",
    url: "/notes",
  });

  return response;
};

export const NoteService = {
  create,
  update,
  deleteNote,
  getAll,
};
