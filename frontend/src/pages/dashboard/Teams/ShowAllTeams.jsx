import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../../../features/teamSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ShowAllTeams = () => {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.id}</TableCell>
              <TableCell>{team.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowAllTeams;
