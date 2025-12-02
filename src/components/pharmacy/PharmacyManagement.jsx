import React, { useState } from 'react';

function PharmacyManagement() {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      medications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', quantity: 30 },
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', quantity: 30 }
      ],
      status: 'pending',
      totalCost: 4000.50
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctorName: 'Dr. Johnson',
      medications: [
        { name: 'Albuterol', dosage: '100mcg', frequency: 'As needed', quantity: 1 }
      ],
      status: 'dispensed',
      totalCost: 2500.00
    }
  ]);

  const dispenseMedication = (prescriptionId) => {
    setPrescriptions(prescriptions.map(prescription => 
      prescription.id === prescriptionId ? { ...prescription, status: 'dispensed' } : prescription
    ));
    alert('Medication dispensed and billing updated');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Pharmacy Management</h2>
      
      <div className="space-y-6">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{prescription.patientName}</h3>
                <p className="text-gray-600">Prescribed by: {prescription.doctorName}</p>
              </div>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                prescription.status === 'dispensed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {prescription.status}
              </span>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Medications:</h4>
              {prescription.medications.map((med, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded mb-2">
                  <p className="font-medium">{med.name} - {med.dosage}</p>
                  <p>Frequency: {med.frequency}</p>
                  <p>Quantity: {med.quantity}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <p className="font-semibold">Total Cost: &#8358;{prescription.totalCost}</p>
              {prescription.status === 'pending' && (
                <button
                  onClick={() => dispenseMedication(prescription.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Dispense Medication
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PharmacyManagement;