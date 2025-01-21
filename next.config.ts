import type { NextConfig } from "next";
import dotenv from "dotenv";

// Load environment variables from .env.local (or .env)
dotenv.config();

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
