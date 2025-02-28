import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSports } from "../../../features/sportSlice";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const ShowAllSports = () => {
  const dispatch = useDispatch();
  const { sports, loading, error } = useSelector((state) => state.sports);

  useEffect(() => {
    dispatch(fetchSports());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Sports
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sports.map((sport) => (
              <TableRow key={sport.id}>
                <TableCell>{sport.id}</TableCell>
                <TableCell>{sport.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ShowAllSports;
