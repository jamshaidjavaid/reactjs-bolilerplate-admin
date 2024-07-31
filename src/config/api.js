import { NODE_ENV } from "./app";

// URLs
const local = "http://localhost:3000/v1";
const development = "http://localhost:3000/v1";
const production = "http://localhost:3000/v1";

const env = NODE_ENV || "development";

export const BASE_URL =
  env === "production"
    ? production
    : env === "development"
    ? development
    : local;

// UPLOADING FILES TO Backend
export const UPLOAD = `${BASE_URL}/utilities/upload`;
export const UPLOAD_CRYSTAL_IMAGE = `${UPLOAD}?path=crystals`;
export const UPLOAD_FABRIC_IMAGE = `${UPLOAD}?path=fabrics`;
export const UPLOAD_MODEL = `${UPLOAD}?path=models`;
export const UPLOAD_TEXTURE_SVG = `${UPLOAD}?path=textures`;
