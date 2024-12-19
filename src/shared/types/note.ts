export interface Attachment {
  name: string
  url: string
}

export interface Comment {
  id: string
  content: string
  author: string
  createdAt: string
}

export interface Note {
  id: string
  content: string
  author: string
  createdAt: string
  attachments: Attachment[]
  comments: Comment[]
}

export interface INote {
  id: string;
  content: string;
  user: {
    id: string;
    name: string;
  }
  createdAt: Date;
}

export interface ICreateNote {
  content: string;
}

export interface IEditNote {
  content: string;
}

