import React, { useState } from "react";

function LaboratoryClone() {
  const [tests, setTests] = useState([
    {
      id: 1,
      patientName: "John Dele",
      testType: "Blood Test",
      requestedDate: "2024-01-15",
      status: "completed",
      file: null,
    },
    {
      id: 2,
      patientName: "Jane Smith",
      testType: "X-Ray Chest",
      requestedDate: "2024-01-16",
      status: "pending",
      file: null,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    patientName: "",
    testType: "",
    requestedDate: "",
    status: "pending",
    file: null,
  });

  const handleAddPatient = () => {
    if (!newPatient.patientName || !newPatient.testType || !newPatient.requestedDate) {
      alert("Please fill all fields!");
      return;
    }

    setTests([
      ...tests,
      {
        id: tests.length + 1,
        ...newPatient,
      },
    ]);

    setNewPatient({
      patientName: "",
      testType: "",
      requestedDate: "",
      status: "pending",
      file: null,
    });

    setShowForm(false);
  };

  // Input handler
  const handleInputChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  // Handle file upload change
  const handleFileChange = (event, testId) => {
    const file = event.target.files[0];
    setTests((prevTests) =>
      prevTests.map((test) =>
        test.id === testId ? { ...test, file } : test
      )
    );
  };

  // Send file button
  const handleFileSend = (testId) => {
    alert("File sent for patient ID: " + testId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Laboratory & Radiology</h2>

        {/* ADD PATIENT BUTTON */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Patient
        </button>
      </div>

      {/* MANUAL PATIENT FORM */}
      {showForm && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            className="border p-2 rounded"
            value={newPatient.patientName}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="testType"
            placeholder="Test Type"
            className="border p-2 rounded"
            value={newPatient.testType}
            onChange={handleInputChange}
          />

          <input
            type="date"
            name="requestedDate"
            className="border p-2 rounded"
            value={newPatient.requestedDate}
            onChange={handleInputChange}
          />

          <select
            name="status"
            className="border p-2 rounded"
            value={newPatient.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          {/* Manual Input File Upload */}
          <div className="col-span-full">
            <input
              type="file"
              onChange={(e) => setNewPatient({ ...newPatient, file: e.target.files[0] })}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={handleAddPatient}
            className="col-span-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Save Patient
          </button>
        </div>
      )}

      {/* TABLE DISPLAY */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="pxpx-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider-6 ">Test Type</th>
              <th className="px-6 ppx-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider-3">Requested Date</th>
              <th className="px-6 pypx-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider-3">Status</th>
              <th className="px-6 py-3px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload</th>
              <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider6 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {tests.map((test) => (
              <tr key={test.id}>
                <td className="px-6 py-4">{test.patientName}</td>
                <td className="px-6 py-4">{test.testType}</td>
                <td className="px-6 py-4">{test.requestedDate}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      test.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {test.status}
                  </span>
                </td>

                {/* FILE UPLOAD + SEND */}
                <td className="px-6 py-4 space-y-2">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, test.id)}
                    className="text-sm"
                  />

                  {test.file && (
                    <p className="text-xs text-gray-600">{test.file.name}</p>
                  )}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleFileSend(test.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Send
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LaboratoryClone;
