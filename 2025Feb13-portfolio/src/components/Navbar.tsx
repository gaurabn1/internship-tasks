import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <nav className="bg-[#252528] w-2xl text-white absolute left-1/2 -translate-x-1/2  flex gap-5 justify-center border-0 rounded-full mt-3 py-3">
        {['Home', 'About', 'Projects', 'Uses'].map((item) => (
          <Link key={item} to={item.toLowerCase()} className={`text-white ${location.pathname === `/${item.toLowerCase()}` ? 'font-bold' : ''} `}>{item}</Link>
        ))}
      </nav>
    </>
  )
};

export default Navbar;
