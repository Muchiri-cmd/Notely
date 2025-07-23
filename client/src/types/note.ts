export default interface NoteType {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  isPinned:boolean;
  isBookMarked:boolean;
}
