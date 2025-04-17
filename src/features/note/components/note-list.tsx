import { INote } from "@/shared/types/note";
import { NoteItem } from "./note-item";
import { AnimatePresence, motion } from "framer-motion";
import EmptyState from "@/components/empty-state";

interface NoteListProps {
  notes: INote[];
}

export function NoteList({ notes }: NoteListProps) {
  const hasNotes = notes.length > 0;

  return (
    <AnimatePresence>
      {hasNotes ? (
        notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <NoteItem note={note} />
          </motion.div>
        ))
      ) : (
        <EmptyState message="Lista de notas vazia" />
      )}
    </AnimatePresence>
  );
}
