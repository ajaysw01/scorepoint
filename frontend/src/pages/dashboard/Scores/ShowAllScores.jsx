import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const ShowAllScores = () => {
  const scores = [
    { player_id: 1, sport: "Badminton", points: 20 },
    { player_id: 2, sport: "Carrom", points: 15 },
    { player_id: 3, sport: "Table Tennis", points: 25 },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Player Scores
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Player ID</TableCell>
            <TableCell>Sport</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((score) => (
            <TableRow key={score.player_id}>
              <TableCell>{score.player_id}</TableCell>
              <TableCell>{score.sport}</TableCell>
              <TableCell>{score.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ShowAllScores;
