export default function Footer() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-footer text-text-primary mt-8">
      {/* Footer Logo and App Name */}
      <div className="mb-4 sm:mb-0">
        <h3 className="text-xl font-bold">Awesome Blogging App</h3>
        <p className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>

      {/* Footer Navigation */}
      <ul className="flex gap-6 mb-4 sm:mb-0">
        <li>
          <a href="/about" className="text-text-primary hover:text-text-accent transition-colors">
            About Us
          </a>
        </li>
        <li>
          <a href="/privacy" className="text-text-primary hover:text-text-accent transition-colors">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="/terms" className="text-text-primary hover:text-text-accent transition-colors">
            Terms of Service
          </a>
        </li>
      </ul>

      {/* Social Media Links */}
      <div className="flex gap-4 text-xl">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-blue-600 transition-colors">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-blue-400 transition-colors">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-pink-500 transition-colors">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
}
