import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound
} from 'lucide-react';
import { RiseAndRescueLogo } from './RiseAndRescueLogo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToHome
}) => {
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanUser = emailOrUser.trim().toLowerCase();
      const cleanPass = password.trim();

      // Accepted single admin identifiers
      const isValidUser = 
        cleanUser === 'admin' || 
        cleanUser === 'admin@riseandrescue.org' || 
        cleanUser === 'sharoontariq05@gmail.com';

      // Accepted admin password
      const isValidPass = 
        cleanPass === 'admin' || 
        cleanPass === 'admin123' || 
        cleanPass === 'RiseRescue2026!';

      if (isValidUser && isValidPass) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg('Invalid administrator credentials. Please check your username and password.');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] flex flex-col justify-between p-4 sm:p-6 selection:bg-[#043E49] selection:text-white relative">
      {/* Top Header / Bar */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between py-2">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#043E49] bg-white hover:bg-gray-50 border border-gray-200/90 shadow-2xs py-2 px-3.5 rounded-xl transition-all cursor-pointer touch-manipulation"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#043E49]/10 text-[#043E49] text-[11px] font-bold border border-[#043E49]/20">
          <Shield className="w-3.5 h-3.5 text-[#043E49]" />
          <span>Restricted Portal</span>
        </div>
      </div>

      {/* Central Login Card */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto py-8">
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#043E49] text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-[#043E49]/20">
              <RiseAndRescueLogo className="w-8 h-8 text-white" />
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#043E49]/10 text-[#043E49] border border-[#043E49]/20 mb-2">
              <Lock className="w-3 h-3" />
              Private Administration
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              Please enter your administrator ID and password to access the sanctuary management dashboard.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs font-medium animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Admin Username or ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={emailOrUser}
                  onChange={(e) => setEmailOrUser(e.target.value)}
                  placeholder="Enter admin ID"
                  autoComplete="username"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#043E49]/30 focus:border-[#043E49] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#043E49]/30 focus:border-[#043E49] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-700 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-black bg-[#043E49] hover:bg-[#032f38] text-white shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 touch-manipulation disabled:opacity-50 active:scale-[0.99]"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 mt-4 text-center">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#043E49]" />
          <span>Authorized sanctuary personnel only • Session protected</span>
        </div>
      </div>

      {/* Footer minimal */}
      <div className="relative z-10 text-center text-[11px] text-gray-400 py-2">
        <span>Rise & Rescue Animal Welfare • Internal Administration</span>
      </div>
    </div>
  );
};
