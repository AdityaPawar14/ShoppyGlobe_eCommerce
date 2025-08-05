import React from 'react';
import ProductList from '../components/Product/ProductList';

const Home = ({ searchTerm }) => {
  return (
    <div>
      <ProductList searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
