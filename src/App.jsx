import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { store } from './store';
import Header from './components/Layout/Header';
import Home from './pages/Home';

// Lazy load components for performance optimization
const ProductDetail = React.lazy(() => import('./components/Product/ProductDetail'));
const Cart = React.lazy(() => import('./components/Cart/Cart'));
const Checkout = React.lazy(() => import('./components/Checkout/Checkout'));
const NotFound = React.lazy(() => import('./components/Layout/NotFound'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-96">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          
          <main>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home searchTerm={searchTerm} />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
