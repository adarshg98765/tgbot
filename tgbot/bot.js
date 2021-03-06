require('dotenv').config();
const fetch = require("node-fetch");
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.tgbot_js);
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
var flag,flag1;
function state(ctx,id){
	flag=0;
	flag1=0;
	for(t=0;t<5;t++){
		const day = new Date();
		day.setDate(day.getDate()+t);
		var dd = day.getDate();
		var mm = day.getMonth()+1;
		const sturl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${dd}-${mm}-2021`;
		fetch(sturl,{
			credentials: 'include',
				method: 'GET',
				headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}})
		.then(response=>response.json())
		.then(data=>{
			var length = Object.keys(data['centers']).length;
				for(i=0;i<length;i++){
					var len = Object.keys(data['centers'][i]['sessions']).length;
					for(j=0;j<len;j++){
						if(data['centers'][i]['sessions'][j]['available_capacity_dose1']>0 && data['centers'][i]['sessions'][j]['min_age_limit']==18){
							bot.telegram.sendMessage(ctx.chat.id,`${data['centers'][i]['name']}   ${data['centers'][i]['address']}`);
							bot.telegram.sendMessage(ctx.chat.id,`Vaccine available on ${data['centers'][i]['sessions'][j]['date']}`);
							bot.telegram.sendMessage(ctx.chat.id,`available dose - ${data['centers'][i]['sessions'][j]['available_capacity_dose1']}`);
							//bot.telegram.sendMessage(ctx.chat.id,'If you want to continue the search, type /start');
							flag =1;
						}
						}
					}
				})
		.catch(err=>{});
	}
	// const today = new Date();
	// const tomorrow = new Date(today);
	// tomorrow.setDate(tomorrow.getDate() + 1);
	// var d = tomorrow.getDate();
	// var d1 = today.getDate();
	// var m = tomorrow.getMonth()+1;
	// var m1 = today.getMonth()+1;
	// const sturl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${d}-${m}-2021`;
	// const sturl1 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${d1}-${m1}-2021`;
	// fetch(sturl,{
	// 	credentials: 'include',
	// 		method: 'GET',
	// 		headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}})
	// 		.then(response=>response.json())
	// 		.then(data=>{
	// 			var length = Object.keys(data['centers']).length;
	// 			for(i=0;i<length;i++){
	// 				var len = Object.keys(data['centers'][i]['sessions']).length;
	// 				for(j=0;j<len;j++){
	// 					if(data['centers'][i]['sessions'][j]['available_capacity_dose1']>0 && data['centers'][i]['sessions'][j]['min_age_limit']==18){
	// 					bot.telegram.sendMessage(ctx.chat.id,`${data['centers'][i]['name']}   ${data['centers'][i]['address']}`);
	// 					bot.telegram.sendMessage(ctx.chat.id,'Vaccine available tomorrow');
	// 					bot.telegram.sendMessage(ctx.chat.id,`available dose - ${data['centers'][i]['sessions'][j]['available_capacity_dose1']}`);
	// 					//bot.telegram.sendMessage(ctx.chat.id,'If you want to continue the search, type /start');
	// 					flag =1;
	// 				}
	// 				}
	// 			}
	// 		})
	// .catch(err=>{});
	// fetch(sturl1,{
	// 	credentials: 'include',
	// 		method: 'GET',
	// 		headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}})
	// 		.then(response=>response.json())
	// 		.then(data=>{
	// 			var length = Object.keys(data['centers']).length;
	// 			for(i=0;i<length;i++){
	// 				var len = Object.keys(data['centers'][i]['sessions']).length;
	// 				for(j=0;j<len;j++){
	// 					if(data['centers'][i]['sessions'][j]['available_capacity_dose1']>0 && data['centers'][i]['sessions'][j]['min_age_limit']==18){
	// 					bot.telegram.sendMessage(ctx.chat.id,`${data['centers'][i]['name']}   ${data['centers'][i]['address']}`);
	// 					bot.telegram.sendMessage(ctx.chat.id,'Vaccine available today');
	// 					bot.telegram.sendMessage(ctx.chat.id,`available dose - ${data['centers'][i]['sessions'][j]['available_capacity_dose1']}`);
	// 					//bot.telegram.sendMessage(ctx.chat.id,'If you want to continue the search, type /start');
	// 					flag1 =1;
	// 				}
	// 				}
	// 			}
	// 		})
	// .catch(err=>{});
	return flag;
};
async function strt(ctx,id){
	for (let i = 0; i < 3000; i++) {
		var x = state(ctx, id);
		await sleep(60000);
		if(x>0){
			break;
		}
	}
};

bot.start((ctx) => {
	
	ctx.telegram.sendMessage(ctx.chat.id,'select District',
	{
		reply_markup:{
			inline_keyboard: [
				[{text: 'Pathanamthitta', callback_data: 'pta'}],
				[{text: 'Thiruvananthapuram', callback_data: 'tvm'}],
				[{text: 'kollam', callback_data: 'klm'}],
				[{text: 'Ernakulam', callback_data: 'ekm'}],
				[{text: 'Palakkad', callback_data: 'pkd'}],
				[{text: 'Thrissur', callback_data: 'tsr'}],
				[{text: 'Kozhikode', callback_data: 'kkd'}],
				[{text: 'Kasargode', callback_data: 'kgd'}],
				[{text: 'Aleppuzha', callback_data: 'apy'}],
				[{text: 'Kottayam', callback_data: 'ktm'}],
				[{text: 'Idukki', callback_data: 'idk'}],
				[{text: 'Malappuram', callback_data: 'mlp'}],
				[{text: 'Wayanad', callback_data: 'wyd'}],
				[{text: 'Kannur', callback_data: 'knr'}]
			]
		}
	})
	//state(ctx);
	//console.log(ctx.chat.id);
	
})
bot.action('pta', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'Started finding vaccine availability');
	strt(ctx,300);
})
bot.action('tvm', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,296);
})
bot.action('klm', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,298);
})
bot.action('pkd', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,308);
})
bot.action('tsr', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,303);
})
bot.action('kkd', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,305);
})
bot.action('kgd', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,295);
})
bot.action('apy', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,301);
})
bot.action('ktm', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,304);
})
bot.action('idk', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,306);
})
bot.action('mlp', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,302);
})
bot.action('wyd', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,299);
})
bot.action('knr', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,297);
})
bot.action('ekm', (ctx)=>{
	ctx.telegram.sendMessage(ctx.chat.id, 'started finding vaccine availability');
	strt(ctx,307);
})

bot.launch();