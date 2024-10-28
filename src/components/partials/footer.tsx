import React from "react";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href={"/"} className="md: col-span-1">
          <h2 className="text-lg font-bold">Company Name</h2>
          <p className="text-sm">&copy; {currentYear} All rights reserved.</p>
        </Link>
        <nav className="col-span-full md:col-span-2 flex gap-2 md:justify-end flex-wrap">
          <Link className="text-sm hover:underline" href="#">
            About Us
          </Link>
          <Link className="text-sm hover:underline" href="#">
            Services
          </Link>
          <Link className="text-sm hover:underline" href="#">
            Contact
          </Link>
          <Link className="text-sm hover:underline" href="#">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
