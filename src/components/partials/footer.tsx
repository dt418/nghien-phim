import React from "react";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mt-8">
        <Link href={"/"}>
          <h2 className="text-lg font-bold">Company Name</h2>
          <p className="text-sm">&copy; {currentYear} All rights reserved.</p>
        </Link>
        <nav className="flex flex-col md:flex-row gap-4">
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
