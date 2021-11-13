const {DateTime} = require('luxon')

const target = DateTime.now().plus({minutes: 10});

const interval = setInterval(() => {
   const now = DateTime.now()

   if(now >= target) {
      clearInterval(interval);
      console.log('Timer finished');
      return;
   }

   const humanReadableForm = target.diff(now).toFormat('hh:mm:ss');
   console.log(humanReadableForm);

}, 1000);
