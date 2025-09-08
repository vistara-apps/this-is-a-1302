import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Music, Shield, Search } from 'lucide-react';

const AppShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-surface">
        <div className="w-full max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-text">SampleSecure</h1>
                <p className="text-xs text-muted-foreground">Legally clear samples</p>
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="w-full max-w-xl mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="w-full max-w-xl mx-auto px-4 py-8 border-t border-surface">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Powered by blockchain verification</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Clear samples legally. Create confidently.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppShell;