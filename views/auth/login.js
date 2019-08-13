 import register from './register.js';
 import view from '../view.js';
 import newAuthController from "../../controllers/authController.js";

 const loginScreen=`<div class="container">
<div class="row">
  <div class="col-sm">
  <form id="js-formLogin">
    <h2> Đăng nhập </h2>
  <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
      <label for="password">Mật khẩu</label>
      <input type="password" class="form-control" id="password" placeholder="Nhập mật khẩu ...  ">
   </div>
   <div class="form-group">
<button type="submit" class="btn btn-primary">Đăng nhập</button>
<button type="button" id="js-btnMoveToRegisterPage" class="btn btn-secondary">Đăng ký</button>
</div>
    </form>
  </div>
 </div>
</div>
`;

function onload(){
    const btnMoveToRegisterPage = document.getElementById('js-btnMoveToRegisterPage')
    const formLogin = document.getElementById('js-formLogin');
    btnMoveToRegisterPage.addEventListener('click',function(){

        view.setScreen(register);
    });
    formLogin.addEventListener("submit", async function(event){
      event.preventDefault();
      const loginPayLoad = {
        email: formLogin.email.value,
        password: formLogin.password.value
      };
      const authController = newAuthController();
      const res=await authController.login(loginPayLoad);
      if(res.type==='success'){
        view.setScreen(chat);
      }
    });
}

const login={
    content: loginScreen,
    onload:onload   
}
export default login;