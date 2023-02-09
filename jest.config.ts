import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  bail: 1,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  detectOpenHandles: true,
};

export default config;
