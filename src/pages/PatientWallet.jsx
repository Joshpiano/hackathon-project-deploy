import React from 'react';
import WalletSystem from '../components/patient/WalletSystem';
import WelcomePage from '../components/patient/WelcomePage';
import { useAuth } from '../context/AuthContext';

function PatientWallet() {
  const { user } = useAuth();
  const [showWallet, setShowWallet] = React.useState(false);

  return (
    <>
      {!showWallet ? (
        <WelcomePage user={user} onContinue={() => setShowWallet(true)} />
      ) : (
        <WalletSystem />
      )}
    </>
  );
}

export default PatientWallet;