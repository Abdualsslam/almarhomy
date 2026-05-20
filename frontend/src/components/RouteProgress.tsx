import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

// Configure nprogress
nprogress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
});

const RouteProgress = () => {
  const location = useLocation();

  useEffect(() => {
    nprogress.start();
    
    // Finish progress after a small delay to ensure rendering is "smooth"
    const timer = setTimeout(() => {
      nprogress.done();
    }, 100);

    return () => {
      clearTimeout(timer);
      nprogress.start();
    };
  }, [location]);

  return null;
};

export default RouteProgress;
