import React, { useState } from 'react';

function DischargeModule() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      admissionDate: '2024-01-10',
      services: [
        { name: 'Consultation', completed: true, paid: true },
        { name: 'Laboratory Tests', completed: true, paid: true },
        { name: 'Radiology', completed: true, paid: true },
        { name: 'Pharmacy', completed: false, paid: false }
      ],
      totalBill: 1250.00,
      amountPaid: 950.00,
      balance: 300.00
    },
    {
      id: 2,
      name: 'Alice Johnson',
      admissionDate: '2024-01-12',
      services: [
        { name: 'Consultation', completed: true, paid: true },
        { name: 'Laboratory Tests', completed: true, paid: true },
        { name: 'Radiology', completed: true, paid: true },
        { name: 'Pharmacy', completed: true, paid: true }
      ],
      totalBill: 890.00,
      amountPaid: 890.00,
      balance: 0.00
    }
  ]);

  const dischargePatient = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    const allServicesCompleted = patient.services.every(service => service.completed);
    const allServicesPaid = patient.services.every(service => service.paid);

    if (allServicesCompleted && allServicesPaid) {
      setPatients(patients.filter(p => p.id !== patientId));
      alert('Patient discharged successfully');
    } else {
      alert('Cannot discharge patient. Some services are not completed or paid.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Discharge Module</h2>
      
      <div className="space-y-6">
        {patients.map((patient) => {
          const allServicesCompleted = patient.services.every(service => service.completed);
          const allServicesPaid = patient.services.every(service => service.paid);
          const canDischarge = allServicesCompleted && allServicesPaid;

          return (
            <div key={patient.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{patient.name}</h3>
                  <p className="text-gray-600">Admitted: {patient.admissionDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Total Bill: &#8358;{patient.totalBill}</p>
                  <p className="text-sm text-gray-600">Paid: &#8358;{patient.amountPaid} | Balance: &#8358;{patient.balance}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Service Completion Status:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {patient.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${
                        service.completed ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <span className="text-sm">{service.name}</span>
                      <span className={`text-xs ${
                        service.paid ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ({service.paid ? 'Paid' : 'Unpaid'})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  {!canDischarge && (
                    <p className="text-red-600 text-sm">
                      Cannot discharge: {!allServicesCompleted ? 'Services pending' : 'Payment pending'}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => dischargePatient(patient.id)}
                  disabled={!canDischarge}
                  className={`px-4 py-2 rounded font-medium ${
                    canDischarge 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Discharge Patient
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DischargeModule;