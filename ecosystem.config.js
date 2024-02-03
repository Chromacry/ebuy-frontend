module.exports = {
  apps: [
    {
      name: 'projectx-frontend',
      script: 'npm',
      args: "run start",
      instances: 1,
      exec_mode: "fork",  // if there is only one instance, use cluster otherwise
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        VITE_BACKEND_BASE_URL:  process.env.VITE_BACKEND_BASE_URL,
      },
    },
  ],
};