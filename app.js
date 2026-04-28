const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CI/CD Pipeline Dashboard</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #6366f1;
          --primary-dark: #4f46e5;
          --accent: #ec4899;
          --success: #10b981;
          --warning: #f59e0b;
          --bg: #0f172a;
          --bg-secondary: #1e293b;
          --text-primary: #f1f5f9;
          --text-secondary: #cbd5e1;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: linear-gradient(135deg, var(--bg) 0%, #1a2847 50%, #0f1729 100%);
          background-attachment: fixed;
          color: var(--text-primary);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* Animated background orbs */
        body::before,
        body::after {
          content: '';
          position: fixed;
          border-radius: 50%;
          animation: float 20s ease-in-out infinite;
          pointer-events: none;
          z-index: -1;
        }

        body::before {
          width: 500px;
          height: 500px;
          top: -250px;
          left: -250px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent 70%);
        }

        body::after {
          width: 600px;
          height: 600px;
          bottom: -300px;
          right: -300px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.15), transparent 70%);
          animation-delay: -10s;
        }

        /* Main container */
        main {
          width: 100%;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .container {
          max-width: 900px;
          width: 100%;
          text-align: center;
        }

        /* Glass morphism card */
        .glass-card {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 4rem 3rem;
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.37),
            inset 0 0 20px rgba(255, 255, 255, 0.05);
          animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        }

        .glass-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.05));
          opacity: 0;
          animation: shimmer 3s ease-in-out infinite;
          pointer-events: none;
        }

        /* Title with gradient */
        h1 {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 900;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInDown 0.8s ease-out;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        /* Subtitle */
        .subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          animation: fadeInUp 0.8s ease-out 0.1s both;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .subtitle span {
          color: var(--success);
          font-weight: 600;
        }

        /* Status badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin: 2rem 0;
          padding: 0.75rem 1.5rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 50px;
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
        }

        /* Description */
        .description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin: 2rem 0 3rem;
          animation: fadeInUp 0.8s ease-out 0.3s both;
          line-height: 1.8;
        }

        /* Buttons container */
        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1.2rem;
          justify-content: center;
          margin: 2rem 0;
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        /* Modern button */
        .btn {
          padding: 1rem 2.5rem;
          border: 2px solid var(--primary);
          background: var(--primary);
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
          background: var(--primary-dark);
          border-color: var(--primary-dark);
        }

        .btn:active {
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: transparent;
          color: var(--primary);
          border-color: var(--primary);
        }

        .btn-secondary:hover {
          background: var(--primary);
          color: white;
        }

        .btn-accent {
          background: var(--accent);
          border-color: var(--accent);
        }

        .btn-accent:hover {
          background: #db2777;
          border-color: #db2777;
          box-shadow: 0 15px 40px rgba(236, 72, 153, 0.4);
        }

        /* Pipeline stats */
        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
          animation: fadeInUp 0.8s ease-out 0.5s both;
        }

        .stat-card {
          background: rgba(99, 102, 241, 0.05);
          border: 1px solid rgba(99, 102, 241, 0.2);
          padding: 2rem 1.5rem;
          border-radius: 16px;
          backdrop-filter: blur(5px);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }

        .stat-card:hover {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-8px);
        }

        .stat-card:hover::before {
          left: 100%;
        }

        .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        /* Animations */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
        }

        @keyframes shimmer {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .glass-card {
            padding: 2.5rem 1.5rem;
            border-radius: 20px;
          }

          h1 {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .button-group {
            flex-direction: column;
            gap: 1rem;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          .stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .description {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .glass-card {
            padding: 1.5rem 1rem;
            border-radius: 16px;
          }

          h1 {
            font-size: 1.8rem;
          }

          .subtitle {
            font-size: 0.9rem;
          }

          .stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .button-group {
            gap: 0.8rem;
          }

          .btn {
            padding: 0.8rem 2rem;
            font-size: 1rem;
          }
        }
      </style>
    </head>

    <body>
      <main>
        <div class="container">
          <div class="glass-card">
            <h1>🚀 CI/CD Pipeline Live</h1>
            
            <div class="status-badge">
              <div class="status-dot"></div>
              <span>System Operational</span>
            </div>

            <p class="subtitle">Powered by <span>Jenkins</span> + <span>Docker</span> + <span>Kubernetes</span></p>

            <p class="description">
              Your deployment pipeline is running smoothly with automated builds, testing, and continuous delivery across containerized infrastructure.
            </p>

            <div class="button-group">
              <button class="btn" onclick="alert('✅ Pipeline Deployed Successfully!')">
                ✨ Check Status
              </button>
              <button class="btn btn-secondary" onclick="alert('📊 View real-time logs and metrics')">
                📊 View Logs
              </button>
              <button class="btn btn-accent" onclick="alert('🔄 Triggering new deployment...')">
                🔄 Deploy Now
              </button>
            </div>

            <div class="stats">
              <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-value">99.9%</div>
                <div class="stat-label">Uptime</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">⚡</div>
                <div class="stat-value">245ms</div>
                <div class="stat-label">Deployment Speed</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📦</div>
                <div class="stat-value">1.2M</div>
                <div class="stat-label">Requests/Day</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </body>
    </html>
  `);

  res.end();
}).listen(3000);

console.log("🚀 Server running on http://localhost:3000");