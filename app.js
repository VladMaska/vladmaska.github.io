let tg = window.Telegram.WebApp;

tg.expand();

// tg.expand();

// tg.MainButton.textColor = "#FFFFFF";
// tg.MainButton.color = "#FF00FF";

// let btn = document.getElementById("btn");

// btn.addEventListener( "click", function(){

//     tg.MainButton.setText( "Сообщение отправлено!" );
//     tg.MainButton.show();
//     tg.sendData( "sendTestMessage" );

// });

let data = document.getElementById( "data" );
let p = document.createElement( "p" );
p.innerText = tg.initDataUnsafe.first_name;

data.appendChild( p );