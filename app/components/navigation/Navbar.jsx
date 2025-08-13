function Navbar() {
  return (
    <nav className="flex justify-between p-16 w-full items-center bg-transparent absolute ">
      <img src="/images/nav-logo.svg" alt="Logo" className="scale-80" />
      <img src="/images/menu.svg" alt="Menu" className="w-10" />
    </nav>
  );
}

export default Navbar;
