module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // MongoDB Server
    // Configured to be restarted with the system startup
    //  sudo systemctl enable mongod

    // NodePop application
    {
      name      : "NodePop",
      cwd       : "./nodepop",
      watch	: false,
      script	: "./nodepop/bin/cluster.js",
      exec_interpreter: "/home/node/.nvm/versions/node/v9.4.0/bin/node",
      out_file	: "./nodepop/app.log",
      error_file: "./nodepop/error.log"
    }
  ]
};
