// 配置参考，该文件使用pm2 init命令生成
module.exports = {
  // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  apps: [{
    name: 'SHOP_API',
    script: './development.js',
    // cwd: '/app-node/nideshop',
    // script: 'npm',
    // args: 'start',
    // instances: 1,
    // exec_mode: 'cluster',
    autorestart: true,
    // watch设置为true启动后无法访问？日志显示node频繁退出重启
    watch: [
      'src'
    ],
    // watch_options: {
    //   usePolling: true
    // },
    ignore_watch: [
      'node_modules'
    ],
    error_file: './logs/app-err.log',
    out_file: './logs/app-out.log',
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]

  /* deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  } */
};
