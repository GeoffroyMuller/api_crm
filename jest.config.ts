import type { Config } from "jest";
import { defaults } from "jest-config";
import "./src/config/database";

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  bail: 1,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  detectOpenHandles: true,
};

export default config;
