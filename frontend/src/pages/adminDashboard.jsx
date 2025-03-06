import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Trophy, Calendar } from 'lucide-react';

const Card = ({ title, icon, onClick }) => {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <div
                className="p-6 flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl cursor-pointer hover:bg-gray-200"
                onClick={onClick}
            >
                {icon}
                <div className="text-xl font-semibold mt-4">{title}</div>
            </div>
        </motion.div>
    );
};

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const cards = [
        { title: 'Team Management', icon: <Users size={40} />, path: '/teamsmangement' },
        { title: 'Scores', icon: <Trophy size={40} />, path: '/editscores' },
        { title: 'Scheduling', icon: <Calendar size={40} />, path: '/schedule' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {cards.map((card, index) => (
                    <Card key={index} title={card.title} icon={card.icon} onClick={() => navigate(card.path)} />
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
