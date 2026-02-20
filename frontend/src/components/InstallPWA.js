import React, { useState, useEffect } from 'react';
import { showInstallPrompt, isInstalled, isIOSInstalled } from '../serviceWorkerRegistration';

const InstallPWA = () => {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (isInstalled() || isIOSInstalled()) {
      return;
    }

    // Check if iOS Safari
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);

    // Listen for install prompt availability
    const handleInstallPrompt = () => {
      setShowInstallButton(true);
    };

    window.addEventListener('pwa-install-available', handleInstallPrompt);

    // For iOS, always show the button since there's no beforeinstallprompt
    if (iOS && !isIOSInstalled()) {
      setShowInstallButton(true);
    }

    return () => {
      window.removeEventListener('pwa-install-available', handleInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      const accepted = await showInstallPrompt();
      if (accepted) {
        setShowInstallButton(false);
      }
    }
  };

  if (!showInstallButton) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-4">
        {!showIOSInstructions ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Install App</h3>
              <p className="text-sm text-gray-600">
                Install this app for a better experience!
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstallButton(false)}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Later
              </button>
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
              >
                Install
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900">Install on iOS</h3>
              <button
                onClick={() => setShowIOSInstructions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <p>To install this app on your iPhone/iPad:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Tap the Share button <span className="inline-block">📤</span></li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Tap "Add" in the top right corner</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallPWA;
