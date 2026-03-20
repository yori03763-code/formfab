export const metadata = {
  title: 'FormFab — Text to 3D Print',
  description: 'Describe it. Print it. Ship it.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f1f5f9; line-height: 1.6; }
          nav { position: fixed; top: 0; left: 0; right: 0; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; background: rgba(2, 6, 23, 0.9); border-bottom: 1px solid rgba(99, 102, 241, 0.2); backdrop-filter: blur(10px); z-index: 100; }
          .logo { font-weight: 800; font-size: 1.5rem; background: linear-gradient(135deg, #818cf8, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          main { min-height: 100vh; padding-top: 100px; }
          .hero { max-width: 800px; margin: 0 auto; text-align: center; padding: 4rem 2rem; }
          h1 { font-size: 3rem; font-weight: 900; margin-bottom: 1.5rem; }
          .gradient { background: linear-gradient(135deg, #818cf8, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          p { color: #94a3b8; font-size: 1.2rem; margin-bottom: 2rem; }
          .badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 50px; font-size: 0.9rem; color: #818cf8; margin-bottom: 1.5rem; }
          .generator { background: rgba(30, 41, 59, 0.5); border-radius: 20px; padding: 2rem; border: 1px solid rgba(99, 102, 241, 0.1); margin: 2rem auto; max-width: 600px; }
          textarea { width: 100%; height: 120px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 12px; padding: 1rem; color: #f1f5f9; font-size: 1rem; resize: none; margin-bottom: 1rem; }
          textarea:focus { outline: none; border-color: #818cf8; }
          button { padding: 1rem 2rem; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; border: none; transition: all 0.3s; }
          .btn-primary { background: linear-gradient(135deg, #6366f1, #818cf8); color: white; box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3); }
          .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4); }
          .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
          .section { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
          h2 { font-size: 2rem; text-align: center; margin-bottom: 3rem; }
          .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
          .step { text-align: center; padding: 2rem; background: rgba(30, 41, 59, 0.3); border-radius: 16px; }
          .step-icon { font-size: 3rem; margin-bottom: 1rem; }
          .step h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
          .materials { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; }
          .material { background: rgba(30, 41, 59, 0.3); border-radius: 12px; padding: 1.5rem; text-align: center; border: 1px solid rgba(99, 102, 241, 0.1); }
          .material-swatch { width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 1rem; }
          .material-name { font-weight: 600; margin-bottom: 0.25rem; }
          .material-price { color: #94a3b8; font-size: 0.9rem; }
          footer { text-align: center; padding: 2rem; border-top: 1px solid rgba(99, 102, 241, 0.1); color: #64748b; }
          footer span { color: #f472b6; }
          .success { color: #4ade80; margin-top: 1rem; }
          .warning { font-size: 0.85rem; color: #fbbf24; }
          .error { color: #f87171; }
          @media (max-width: 768px) { h1 { font-size: 2rem; } .hero { padding: 2rem 1rem; } nav { padding: 1rem; } }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}