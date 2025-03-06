import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SportsDashboard = () => {
    const [auth, setAuth] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("auth");
        const role = localStorage.getItem("role");
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            setAuth(true);
            setUserRole(role);
        }
    }, [navigate]);

    return auth ? (
        <div className="flex flex-col items-center h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Sports Dashboard</h2>
            <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
                <SportCategory name="Cricket" userRole={userRole} />
                <SportCategory name="Badminton" userRole={userRole} />
                <SportCategory name="Table Tennis" userRole={userRole} />
                <SportCategory name="Carrom" userRole={userRole} />
                <SportCategory name="Darts" userRole={userRole} />
                <SportCategory name="Fun Friday" userRole={userRole} />
            </div>
        </div>
    ) : null;
};

const SportCategory = ({ name, userRole }) => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedItem, setEditedItem] = useState("");

    const handleAddItem = () => {
        if (newItem.trim()) {
            setItems([...items, newItem]);
            setNewItem("");
        }
    };

    const handleEditItem = (index) => {
        setEditingIndex(index);
        setEditedItem(items[index]);
    };

    const handleSaveEdit = () => {
        if (editedItem.trim()) {
            const updatedItems = [...items];
            updatedItems[editingIndex] = editedItem;
            setItems(updatedItems);
            setEditingIndex(null);
            setEditedItem("");
        }
    };

    const handleDeleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">{name}</h3>
            {userRole === "admin" && (
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Add ${name} item`}
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        onClick={handleAddItem}
                    >
                        Add
                    </button>
                </div>
            )}
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center p-3 border border-gray-300 rounded-lg">
                        {editingIndex === index ? (
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={editedItem}
                                onChange={(e) => setEditedItem(e.target.value)}
                            />
                        ) : (
                            <span>{item}</span>
                        )}
                        {userRole === "admin" && (
                            <div className="flex gap-2">
                                {editingIndex === index ? (
                                    <button
                                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300"
                                        onClick={handleSaveEdit}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                        onClick={() => handleEditItem(index)}
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300"
                                    onClick={() => handleDeleteItem(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SportsDashboard;
