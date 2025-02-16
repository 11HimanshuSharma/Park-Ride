import './style.css';
import { initRouter } from './router';
import { checkAuth } from './auth';

// Initialize the application
function init() {
  checkAuth();
  initRouter();
}

init();