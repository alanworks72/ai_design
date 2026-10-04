import { defineConfig } from '@playwright/test';

export default defineConfig({testDir:'e2e',workers:1,timeout:30000,reporter:'list',
  use:{baseURL:'http://127.0.0.1:4410',trace:'retain-on-failure'},
  webServer:{command:'npm run dev',url:'http://127.0.0.1:4410',reuseExistingServer:false,
    env:{WORKBENCH_PORT:'4410',PREVIEW_PORT:'4411',DESIGN_WORKSPACE:'.design-workspace/e2e'}}});
