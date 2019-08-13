import register from './views/auth/register.js'     
import login from "./views/auth/login.js";
import view from './views/view.js';
window.onload = function(){
        // document.getElementById("app").innerHTML=login.view;
        // login.onload();
        view.setScreen(login);
}
