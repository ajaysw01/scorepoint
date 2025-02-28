import { useDispatch, useSelector } from "react-redux";
import { deleteTeam } from "../../../features/teamSlice";
import { Button } from "@mui/material";

const DeleteTeam = ({ teamId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user?.token); // 🔹 Get JWT token

  const handleDelete = () => {
    if (!token) return alert("Unauthorized! Please log in.");
    dispatch(deleteTeam({ teamId, token }));
  };

  return (
    <Button onClick={handleDelete} variant="contained" color="error">
      Delete
    </Button>
  );
};

export default DeleteTeam;
