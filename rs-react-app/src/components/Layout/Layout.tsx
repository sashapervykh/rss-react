import { Outlet } from 'react-router';
import { Header } from '../Header/Header';

export function Layout() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}
