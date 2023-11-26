import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';

import Products from '../pages/Products/Products';
import {
  CreateProduct,
  ProductsMain,
  UpdateProduct,
} from '../pages/Products/Sections/';

import Movement from '../pages/Movement/Movement';
import { CreateMovement, MovementMain } from '../pages/Movement/Sections';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />}>
        <Route path="" element={<ProductsMain />} />
        <Route path="create" element={<CreateProduct />} />
        <Route path=":productId" element={<UpdateProduct />} />
      </Route>
      <Route path="/movement" element={<Movement />}>
        <Route path="" element={<MovementMain />} />
        <Route path="create" element={<CreateMovement />} />
        {/* <Route path=":productId" element={<UpdateProduct />} /> */}
      </Route>
    </Routes>
  );
};

export default UserRoutes;
