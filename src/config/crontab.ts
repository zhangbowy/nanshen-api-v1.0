import {think} from "thinkjs";
module.exports = [
    // {
    //     interval: '10s',
    //     immediate: true,
    //     enable: true,
    //     // handle: 'wx/order/crontab'
    // },

  //   {
  //   cron: '0 */1 * * *',
  //   handle: 'crontab/test',
  //   type: 'all'
  // }
    {
      cron: "30 0 * * *",
      immediate: false,
      enable: true,
      handle: 'nanshen/ossUpload'
    }
  ];
