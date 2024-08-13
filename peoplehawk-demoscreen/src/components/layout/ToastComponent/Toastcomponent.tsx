import React from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import default styles
import './customToastStyles.css'; 

// Define a custom Toast content component
interface ToastContentProps {
    title: string;
    description: string;
}

const ToastContent: React.FC<ToastContentProps> = ({ title, description }) => (
  <div>
    <h4>{title}</h4>
    <p style={{ margin: 0 , fontSize : '12px'}}>{description}</p>
  </div>
);

// Utility function to show a toast with custom content
const showToast = (title: string, description: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', options: ToastOptions = {}) => {
  const toastOptions: ToastOptions = {
    className: 'custom-toast', // Custom class for styling
    ...options,
  };

  const content = <ToastContent title={title} description={description} />;

  switch (type) {
    case 'success':
      toast.success(content, toastOptions);
      break;
    case 'error':
      toast.error(content, toastOptions);
      break;
    case 'warning':
      toast.warn(content, toastOptions);
      break;
    case 'info':
    default:
      toast.info(content, toastOptions);
      break;
  }
};

// Toast component to include ToastContainer
const ToastComponent: React.FC = () => (
  <ToastContainer
    position="bottom-center"
    closeButton = {false}
    autoClose={2000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export { ToastComponent, showToast };