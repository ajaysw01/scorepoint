import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

const PlayerRankings = () => {
  const [rankings, setRankings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://scorepoint.onrender.com/api/points/player/rankings")
      .then((res) => res.json())
      .then((data) => {
        setRankings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rankings:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Player Rankings</h1>
      {rankings &&
        Object.entries(rankings).map(([sport, categories]) => (
          <div key={sport} className="mb-6">
            <h2 className="text-xl font-semibold capitalize mb-2">{sport}</h2>
            {categories &&
              Object.entries(categories).map(([category, { playerData }]) => (
                <Card key={category} className="mb-4">
                  <CardContent>
                    <h3 className="text-lg font-medium capitalize mb-2">{category.replace('_', ' ')}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead>Matches Played</TableHead>
                          <TableHead>Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {playerData
                          .sort((a, b) => b.points - a.points)
                          .map((player, index) => (
                            <TableRow key={player.name}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{player.name}</TableCell>
                              <TableCell>{player.team}</TableCell>
                              <TableCell>{player.matches_played}</TableCell>
                              <TableCell>{player.points}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
          </div>
        ))}
    </div>
  );
};

export default PlayerRankings;
