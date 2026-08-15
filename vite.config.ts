import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const portalRuntime = `\n    <link rel="stylesheet" href="/portal-aix.css">\n    <script defer src="/portal-aix.js"></script>`;

const injectPortalRuntime = (html: string) => {
  const withSpanishLanguage = html.replace(/<html\b([^>]*)>/i, (_, attributes: string) => {
    const normalizedAttributes = /\blang\s*=/i.test(attributes)
      ? attributes.replace(/\blang\s*=\s*(["'])[^"']*\1/i, 'lang="es"')
      : `${attributes} lang="es"`;
    return `<html${normalizedAttributes}>`;
  });
  const withRunnableRuntime = withSpanishLanguage.replace(/(?:\.\.\/)+public\/(portal-aix\.(?:css|js))/gi, "/$1");
  return withRunnableRuntime.includes('src="/portal-aix.js"')
    ? withRunnableRuntime
    : withRunnableRuntime.replace(/<\/head>/i, `${portalRuntime}\n  </head>`);
};

// Discover all HTML input files dynamically so Vite builds every subpage for production
const getHtmlInputs = () => {
  const inputs: Record<string, string> = {
    main: path.resolve(__dirname, "index.html")
  };
  
  const scanDir = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (
        entry.name === "node_modules" || 
        entry.name === "dist" || 
        entry.name === "public" || 
        entry.name === "fonts" || 
        entry.name.startsWith(".")
      ) continue;

      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        const relativePath = path.relative(__dirname, fullPath);
        const name = relativePath.replace(/\\/g, "/").replace(/\.html$/, "").replace(/\//g, "_");
        inputs[name] = fullPath;
      }
    }
  };

  scanDir(__dirname);
  return inputs;
};

// Custom dev server middleware to serve static sub-site HTML pages directly
// This bypasses Vite's SPA fallback routing which causes 404 errors on subdirectory HTML files
const multipageDevServerPlugin = () => ({
  name: "multipage-dev-server",
  transformIndexHtml: {
    order: "pre" as const,
    handler: injectPortalRuntime,
  },
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.url ? req.url.split("?")[0] : "";
      let targetUrl = url;
      
      // If it's a directory link, map it to index.html
      if (targetUrl.endsWith("/")) {
        targetUrl += "index.html";
      } else if (!targetUrl.includes(".") && !targetUrl.endsWith("/")) {
        // e.g. /restaurante -> /restaurante/index.html
        // check if directory exists and has index.html
        const dirPath = path.join(__dirname, targetUrl);
        if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
          targetUrl += "/index.html";
        }
      }

      if (targetUrl.endsWith(".html") && targetUrl !== "/index.html") {
        const filePath = path.join(__dirname, targetUrl);
        if (fs.existsSync(filePath)) {
          const content = injectPortalRuntime(fs.readFileSync(filePath, "utf-8"));
          res.setHeader("Content-Type", "text/html");
          res.end(content);
          return;
        }
      }
      next();
    });
  },
  closeBundle() {
    const outputDirectory = path.join(__dirname, "dist");
    const sectors = ["restaurante", "belleza", "ropa", "tecnologia", "medico"];
    
    // Copy all sector subfolders recursively into dist/ so Render has every single HTML page and asset
    sectors.forEach((sector) => {
      const srcDir = path.join(__dirname, sector);
      const destDir = path.join(outputDirectory, sector);
      if (fs.existsSync(srcDir)) {
        fs.cpSync(srcDir, destDir, { recursive: true, force: true });
      }
    });

    const injectIntoOutput = (directory: string) => {
      if (!fs.existsSync(directory)) return;
      fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) injectIntoOutput(entryPath);
        if (entry.isFile() && entry.name.endsWith(".html")) {
          fs.writeFileSync(entryPath, injectPortalRuntime(fs.readFileSync(entryPath, "utf-8")));
        }
      });
    };
    if (fs.existsSync(outputDirectory)) injectIntoOutput(outputDirectory);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    multipageDevServerPlugin(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        restaurante: path.resolve(__dirname, "restaurante/index.html"),
        belleza: path.resolve(__dirname, "belleza/index.html"),
        ropa: path.resolve(__dirname, "ropa/index.html"),
        tecnologia: path.resolve(__dirname, "tecnologia/index.html"),
        medico: path.resolve(__dirname, "medico/index.html"),
      }
    }
  }
}));
