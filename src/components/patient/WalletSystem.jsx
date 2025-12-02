import React, { useState } from 'react';

function WalletSystem() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-01-15', amount: 5000, type: 'deposit', status: 'approved', method: 'online' },
    { id: 2, date: '2024-01-10', amount: 3000, type: 'deposit', status: 'pending', method: 'paypoint' },
    { id: 3, date: '2024-01-05', amount: 1500, type: 'payment', status: 'completed', method: 'service' },
  ]);

  const [balance, setBalance] = useState(6500);
  const [fundAmount, setFundAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleFundWallet = (e) => {
    e.preventDefault();

    if (!fundAmount || !paymentMethod) return;

    // Increase balance
    setBalance(prev => prev + parseFloat(fundAmount));

    // Add new transaction
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(fundAmount),
      type: 'deposit',
      status: 'approved',
      method: paymentMethod
    };

    setTransactions([newTransaction, ...transactions]);

    // Clear fields
    setFundAmount('');
    setPaymentMethod('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Patient Wallet System</h2>
      
      {/* Current Balance */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-green-800">Current Balance</h3>
        <p className="text-3xl font-bold text-green-600">
          ₦{balance.toLocaleString()}
        </p>
      </div>

      {/* Fund Wallet */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Fund Your Wallet</h3>
        <form onSubmit={handleFundWallet} className="grid gap-4">
          
          {/* Amount */}
          <input
            type="number"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value)}
            placeholder="Enter amount"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            min="1"
            required
          />

          {/* Payment Method */}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="card">Debit / Credit Card</option>
            <option value="transfer">Bank Transfer</option>
            <option value="ussd">USSD</option>
            <option value="paypoint">Pay Point</option>
            <option value="online">Online Payment</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium"
          >
            Add Funds
          </button>
        </form>
      </div>

      {/* Transaction Table */}
      <div>
        <h3 className="text-lg font-medium mb-3">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">₦{transaction.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{transaction.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.status === 'approved' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-green-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default WalletSystem;
