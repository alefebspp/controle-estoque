import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import {
  CreateProduct,
  Main,
  UpdateProduct,
} from '../pages/Products/Sections/';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />}>
        <Route path="" element={<Main />} />
        <Route path="create" element={<CreateProduct />} />
        <Route path=":productId" element={<UpdateProduct />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
