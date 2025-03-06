import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function Teams() {
    const [teams, setTeams] = useState([
        { id: 1, name: "Order of the Phoenix", logo: "static/images/order.png", members: [] },
        { id: 2, name: "Hogwarts Heros", logo: "static/images/hufflepuff.png", members: [] },
        { id: 3, name: "The Goblins", logo: "static/images/goblins.png", members: [] },
        { id: 4, name: "Gryffindors", logo: "static/images/gry.png", members: [] },
        { id: 5, name: "Ravenclaws", logo: "static/images/ravenclaw.png", members: [] },
        { id: 6, name: "Dark Wizards", logo: "static/images/Death.png", members: [] },
        { id: 7, name: "The Gaints", logo: "static/images/maru.png", members: [] },
        { id: 8, name: "The Dragons", logo: "static/images/dragon.png", members: [] },
    ]);

    useEffect(() => {
        axios.get("https://scorepoint.onrender.com/api/teams")
            .then(response => {
                setTeams(prevTeams =>
                    prevTeams.map(team => {
                        const fetchedTeam = response.data.find(t =>
                            t.name && team.name && t.name.toLowerCase() === team.name.toLowerCase()
                        );
                        return fetchedTeam
                            ? { ...team, members: fetchedTeam.players.map(player => player.name) || [] }
                            : team;
                    })
                );
            })
            .catch(error => console.error("Error fetching teams:", error));
    }, []);

    const [selectedTeam, setSelectedTeam] = useState(null);

    return (
 
        <div className="min-h-screen p-8">
            {selectedTeam ? (
                <TeamDetails team={selectedTeam} onBack={() => setSelectedTeam(null)} />
            ) : (
                <TeamsList teams={teams} onSelectTeam={setSelectedTeam} />
            )}
        </div>
    );
}

// ✅ Pass `teams` as a prop to `TeamsList`
function TeamsList({ teams, onSelectTeam }) {
    return (
        <>
            <h1 className="text-4xl font-bold text-center mb-8">Teams</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 justify-items-center">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        onClick={() => onSelectTeam(team)}
                        className="flex flex-col items-center cursor-pointer text-lg font-semibold hover:text-red-600"
                    >
                        <img
                            src={team.logo}
                            alt={team.name}
                            className="w-40 h-40 object-contain transition-transform duration-200 ease-in-out hover:scale-110"
                        />
                        <p className="mt-2 text-xl font-bold">{team.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
}


function TeamDetails({ team, onBack }) {
    return (
        <div className="relative flex flex-col items-center text-gray-900 bg-white max-w-2xl mx-auto p-6 rounded-lg shadow-lg border border-gray-200"
            style={{
                backgroundImage: `url(${team.logo})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "brightness(1)" // Lightens the image
            }}
        >
            <h2 className="text-3xl font-bold mb-6 z-10">{team.name}</h2>
            <div className="grid grid-cols-2 gap-4 p-4 z-10">
                {team.members.map((member, index) => (
                    <div key={index}
                        className="bg-gray-200 text-gray-800 px-6 py-4 rounded-md shadow-md text-center font-medium hover:bg-blue-100 transition duration-200">
                        {member}
                    </div>
                ))}
            </div>
            <button
                onClick={onBack}
                className="mt-6 px-6 py-2 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition duration-200 z-10"
            >
                ← Back to Teams
            </button>
        </div>
    );
}

TeamsList.propTypes = {
    teams: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        members: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired,
    onSelectTeam: PropTypes.func.isRequired,
};

TeamDetails.propTypes = {
    team: PropTypes.shape({
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        members: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    onBack: PropTypes.func.isRequired,
};
