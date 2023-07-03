import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { selectNoteById } from "./notesApiSlice";
// import { selectAllUsers } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetNotesQuery } from "./notesApiSlice";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";

const EditNote = () => {
  const { id } = useParams();

  // const note = useSelector((state) => selectNoteById(state, id));
  // const users = useSelector(selectAllUsers);

  const { username, isManager, isAdmin } = useAuth();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  // const content =
  // note && users ? <EditNoteForm users={users} note={note} /> : "";

  if (!note || !users?.length) return <PulseLoader color={"#FFF"} />;

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }
  const content = <EditNoteForm note={note} users={users} />;
  return content;
};

export default EditNote;
