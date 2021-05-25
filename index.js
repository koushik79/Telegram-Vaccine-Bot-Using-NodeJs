
//var token = '1835519395:AAGmdUJpIOMopLCyigF_N0kkVoSm_fH6BBk'
var today = new Date();
var vdate = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();

var TelegramBot = require('node-telegram-bot-api');
const { type } = require('os');
const token = '1823486960:AAFQT4E11r9RKnz-4UmnA-NxrY01uk4xyuc'
const bot = new TelegramBot(token, {polling:true});

bot.on('message', (msg) => {
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) == 0) {
        bot.sendMessage(msg.chat.id, "Hey " + msg.from.first_name + "!" + "\nTo find available slots in your locality just type \n/find your_pin_code \n I'll handle the rest");
    }

    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Ba Bye " + msg.from.first_name + "." + "\nStay Safe !");
    }

});

var request = require('request');
bot.onText(/\/find (.+)/,function(msg,match) {
    var pincode = match[1];
    var chatId = msg.chat.id;
    request('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' + pincode + '&date=' +  vdate ,function(error,response,body){
        if(!error && response.statusCode == 200) {
            bot.sendMessage(chatId, 'Here is what I found : \n', {parse_mode:'Markdown'});
            var res = JSON.parse(body);
            for (i=0;i<res.sessions.length;i++) {
                var name = res.sessions[i].name;
                var address = res.sessions[i].address;
                var date = res.sessions[i].date;
                var vaccine_name = res.sessions[i].vaccine;
                var cap = res.sessions[i].available_capacity;
                var dose1 = res.sessions[i].available_capacity_dose1;
                var dose2 = res.sessions[i].available_capacity_dose2;
                var fee = res.sessions[i].fee_type;
                var age = res.sessions[i].min_age_limit;
                var from = res.sessions[i].from;
                var to = res.sessions[i].to;
            bot.sendMessage(chatId, 'Centre Name: ' + name + '\nAddress: ' + address + '\nDate: ' + date + '\nVaccine name: '+ vaccine_name + '\nAge Limit: ' + age + '\nAvailable Slots: ' + cap + '\nDose 1 slots: ' + dose1 + '\nDose 2 slots: ' + dose2 + '\nFee: ' + fee +
            '\nTimings: '+ from + ' to ' + to , {parse_mode:'Markdown'});

        }     
    };
});
});
