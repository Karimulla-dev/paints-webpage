import Link from "next/link";
import Image from "next/image";

export default function Layout({ children, siteSettings }) {
  const siteName = siteSettings?.fields?.siteName ?? "ColorNest";
  const logoUrl = siteSettings?.fields?.logo?.fields?.file?.url
    ? "https:" + siteSettings.fields.logo.fields.file.url
    : null;
  const logoAlt = siteSettings?.fields?.logo?.fields?.title ?? siteName;
  const footerText = siteSettings?.fields?.footerText ?? "© 2025 Color Nest";

  return (
    <div className="layout">
      <header className="fixed-header">
        <div className="header-content">
          <div className="logo-container">
            <Link href="/" className="logo-wrapper">
              <div className="logo-flex">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={logoAlt}
                    width={100}
                    height={100}
                    priority
                  />
                ) : null}
                <span className="site-name-text">{siteName}</span>
              </div>
            </Link>
          </div>
          <nav className="main-nav">
            <ul>
              <li><Link href="/exterior-paints">Exterior Paints</Link></li>
              <li><Link href="/interior-paints">Interior Paints</Link></li>
              <li><Link href="/all-paints">All Paints</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="header-spacer" />
      <main className="page-content">{children}</main>
      <footer>
        <p>{footerText}</p>
      </footer>

      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9f9f9;
        }

        .fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(to right, #ffffff, #f0f0f0);
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #ddd;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          min-height: 120px;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo-flex {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .site-name-text {
          font-size: 1.8em;
          font-weight: bold;
          color: Green;
        }

        .main-nav ul {
          list-style: none;
          display: flex;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }

        .main-nav a {
          text-decoration: none;
          color: #333;
          font-weight: 600;
          font-size: 1em;
          position: relative;
        }

        .main-nav a::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #0056b3;
          transition: width 0.3s ease;
        }

        .main-nav a:hover::after {
          width: 100%;
        }

        .main-nav a:hover {
          color: #0056b3;
        }

        .header-spacer {
          height: 120px;
        }

        .page-content {
          flex-grow: 1;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        footer {
          background-color: #1a1a1a;
          color: #ffffff;
          text-align: center;
          padding: 1.5rem 2rem;
          font-size: 0.95em;
          border-top: 1px solid #333;
          margin-top: auto;
        }

        footer p {
          margin: 0;
          line-height: 1.6;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .main-nav ul {
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
          }

          .logo-container {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
