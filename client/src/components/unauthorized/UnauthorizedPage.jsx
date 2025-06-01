import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden text-center p-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
          <Lock className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to view this page with your current account.
        </p>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
          >
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/web/login')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          >
            Switch Account
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          Need help? Contact support at support@yourschool.com
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;