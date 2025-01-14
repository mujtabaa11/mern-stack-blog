export default function Footer() {
  return (
    <div className="footerClass flex flex-col sm:flex-row justify-between items-center p-6 bg-footer mt-8">
      {/* Footer Logo and App Name */}
      <div className="mb-4 sm:mb-0 flex flex-col items-center">
        <h3 className="text-xl font-bold">Awesome Blogging App</h3>
        <p className="text-sm self-start">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>

      {/* Footer Navigation */}
      <div>
      <ul className="flex gap-6 mb-4 sm:mb-0">
        <li>
          <a href="/about" className="hover:text-text-accent transition-colors">
            About Us
          </a>
        </li>
        <li>
          <a href="/privacy" className="hover:text-text-accent transition-colors">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="/terms" className="hover:text-text-accent transition-colors">
            Terms of Service
          </a>
        </li>
      </ul>

      {/* Social Media Links */}
      <div className="flex gap-4 text-xl">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
          <i className="fab fa-instagram"></i>
        </a>
        </div>
      </div>
    </div>
  );
}
