import React, { useState } from 'react';

function LaboratoryRadiology() {
  const [tests, setTests] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      testType: 'Blood Test',
      requestedDate: '2024-01-15',
      status: 'completed',
    
      
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      testType: 'X-Ray Chest',
      requestedDate: '2024-01-16',
      status: 'pending',
    
      
    }
  ]);

 

 

 

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6"> </h2>
      <h2 className="text-xl font-semibold mb-6 text-green-700">Incoming Laboratory & Radiology Result </h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
             
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tests.map((test) => (
              <tr key={test.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.testType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.requestedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    test.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {test.status}
                  </span>
                </td>


                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.result}  <button className="text-green-600 hover:text-green-900">
                      View Result
                    </button></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LaboratoryRadiology;