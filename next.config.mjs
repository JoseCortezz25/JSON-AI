import { fileURLToPath } from "url";
import { dirname, join } from "path";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, "src/styles")],
    prependData: `@import "main.scss";`
  }
};

export default withNextIntl(nextConfig);
