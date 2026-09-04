import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles"), path.join(__dirname, "src")],
  },
};

export default nextConfig;
