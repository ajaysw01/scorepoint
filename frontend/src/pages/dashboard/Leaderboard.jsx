import { useState } from "react";
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
} from "@mui/material";

const dummyLeaderboard = [
  { teamName: "Team A", totalScore: 225 },
  { teamName: "Team B", totalScore: 230 },
];

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState(dummyLeaderboard);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team Name</TableCell>
              <TableCell>Total Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((team, index) => (
              <TableRow key={index}>
                <TableCell>{team.teamName}</TableCell>
                <TableCell>{team.totalScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard;
