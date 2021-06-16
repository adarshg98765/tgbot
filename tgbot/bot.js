require('dotenv').config();
const fetch = require("node-fetch");
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.tgbot_js);

function state(ctx){
	const today = new Date()
	const tomorrow = new Date(today)
	tomorrow.setDate(tomorrow.getDate() + 1)
	var d = tomorrow.getDate();
	var d1 = today.getDate();
	const sturl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=300&date=${d}-06-2021`;
	const sturl1 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=300&date=${d1}-06-2021`;
	fetch(sturl , {
      credentials: 'include',
      method: 'GET',
      headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}})
  	.then(response=>response.json())
  	.then(data=>{
  		var len = Object.keys(data['sessions']).length;
  		for(i=0;i<len-1;i++){
  			if(data['sessions'][i]['available_capacity_dose1']>0 && data['sessions'][i]['min_age_limit']<40){
  				bot.telegram.sendMessage(ctx.chat.id,'available tomorrow');
				  break;
  			}
  		}
  	})
	.catch(err=>{});

	fetch(sturl1 , {
      credentials: 'include',
      method: 'GET',
      headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}})
  	.then(response=>response.json())
  	.then(data=>{
  		var len = Object.keys(data['sessions']).length;
  		for(i=0;i<len-1;i++){
  			if(data['sessions'][i]['available_capacity_dose1']>0 && data['sessions'][i]['min_age_limit']<40){
  				bot.telegram.sendMessage(ctx.chat.id,'available today');
				  break;
  			}
  		}
  	})
	.catch(err=>{});

	setTimeout(function(){ state(ctx) }, 100000);
};
bot.start((ctx) => {
	ctx.reply("started");
	state(ctx);
	//console.log(ctx.chat.id);
	
})

bot.launch();