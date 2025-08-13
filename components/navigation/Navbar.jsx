import Image from "next/image";

function Navbar() {
  return (
    <nav className="flex justify-between p-4 w-full items-center bg-transparent">
      <Image
        src="/images/nav-logo.svg"
        alt="Logo"
        width={40}
        height={40}
        className="scale-90"
      />
      <Image
        src="/images/menu.svg"
        alt="Menu"
        width={40}
        height={10}
        className="w-10"
      />
    </nav>
  );
}

export default Navbar;
