import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import './styles/index.css';

import App from './pages/App';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact/:id" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </Provider>
);
