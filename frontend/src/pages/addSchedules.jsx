import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { toast } from "react-toastify";

const ScheduleUpload = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const token = localStorage.getItem("authToken"); // Retrieve JWT Token

  // Read and Parse Excel File
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Read data without formatting issues
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        raw: true,
        defval: "", // Ensures missing fields are empty strings instead of undefined
      });

      console.log(parsedData);

      // Ensure all fields exist even if they are missing in Excel
      const formattedData = parsedData.map((row) => ({
        player1: String(row.player1 || ""),
        player2: String(row.player2 || ""),
        team1: String(row.team1 || ""),
        team2: String(row.team2 || ""),
        sport: String(row.sport || ""),
        category: String(row.category || ""),
        venue: String(row.venue || ""),
        comments: String(row.comments || ""),
        status: String(row.status || ""),
        date:
          row.date && !isNaN(row.date)
            ? (() => {
                const dateObj = new Date(
                  Math.round((row.date - 25569) * 86400000)
                ); // Convert to JS Date
                if (isNaN(dateObj.getTime())) return ""; // Handle invalid dates
                const day = String(dateObj.getDate()).padStart(2, "0");
                const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
                const year = dateObj.getFullYear();
                return `${year}-${month}-${day}`;
              })()
            : "",

        time:
          row.time && typeof row.time === "number"
            ? (() => {
                const totalSeconds = Math.round(row.time * 86400);
                const hours = String(Math.floor(totalSeconds / 3600)).padStart(
                  2,
                  "0"
                );
                const minutes = String(
                  Math.floor((totalSeconds % 3600) / 60)
                ).padStart(2, "0");
                return `${hours}:${minutes}`;
              })()
            : "",
      }));

      setPreviewData(formattedData);
    };
  };

  // Update a Cell in Preview Data
  const handleEdit = (index, key, value) => {
    const updatedData = [...previewData];
    updatedData[index][key] = value;
    setPreviewData(updatedData);
  };

  // Submit Data to Backend
  const handleSubmit = async () => {
    console.log(previewData);

    if (!previewData.length) {
      toast.error("No data to upload!");
      return;
    }

    try {
      await axios.post(
        "https://sports-backend.apps-dev.creditsafe.com/api/match/batch/schedules",
        previewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Schedules uploaded successfully!");
      setFile(null);
      setPreviewData([]);
    } catch (error) {
      console.error("Error uploading data:", error);
      toast.error("Upload failed. Please check your data.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Upload Match Schedule
      </h2>

      {/* File Input */}
      <div className="mb-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Preview Table */}
      {previewData.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Preview & Edit Before Uploading
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow-lg">
              <thead>
                <tr className="bg-blue-500 text-white text-left">
                  {[
                    "Player 1",
                    "Player 2",
                    "Team 1",
                    "Team 2",
                    "Sport",
                    "Category",
                    "Venue",
                    "Comments",
                    "Status",
                    "Date",
                    "Time",
                  ].map((header) => (
                    <th key={header} className="p-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-200">
                    {Object.keys(row).map((key) => (
                      <td key={key} className="p-2">
                        <input
                          type="text"
                          value={row[key] || ""}
                          onChange={(e) =>
                            handleEdit(index, key, e.target.value)
                          }
                          className="w-full p-2 border rounded"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Upload to Database
          </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleUpload;
