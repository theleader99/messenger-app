import login from './login.js'
import view from '../view.js'
import newAuthController from '../../controllers/authController.js'
import {responseCode} from '../../controllers/response.js';
import message from './messages.js'
const registerScreen =`
<div class="container">
  <div class="row">
    <div class="col-sm">
    </div>

    <div class="col-sm">
    <form id="js-formRegister">
    <h2>Đăng Ký</h2>
    <div id="js-alertSuccess">
    </div>
    <div class="form-group">
        <label for="firstName">Tên</label>
        <input type="text" class="form-control " id="firstName"  placeholder="Hãy nhập tên...">
    </div>
    <div class="form-group">
        <label for="lastName">Họ</label>
        <input type="text" class="form-control" id="lastName"  placeholder="Hãy nhập họ...">
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email"  placeholder="Hãy nhập email...">
    </div>
    <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input type="password" class="form-control" id="password" placeholder="Hãy nhập mật khẩu...">
    </div>
    <div class="form-group">
        <label for="retypePassword">Nhập lại mật khẩu</label>
        <input type="password" class="form-control" id="retypePassword" placeholder="Nhập lại mật khẩu...">
    </div>
    <button type="button" id="js-btnRegister" class="btn btn-primary">Đăng Ký</button>
    <button type="button" id="js-btnMoveToLoginPage"  class="btn btn-secondary">Quay lại đăng nhập</button>
</form>
    </div>

    <div class="col-sm">
    </div>
  </div>
</div>


`
function onload(){
    const btnMoveToLoginPage = document.getElementById('js-btnMoveToLoginPage')
    const btnRegister = document.getElementById('js-btnRegister');
    const formRegister= document.getElementById('js-formRegister');

    btnMoveToLoginPage.addEventListener('click',function(){
    view.setScreen(login)
    })
    btnRegister.addEventListener('click',async function(event){
        event.preventDefault();
// Lấy thông tin form
        const registerPayload ={
            firstName : formRegister.firstName.value,
            lastName : formRegister.lastName.value,
            email : formRegister.email.value,
            password : formRegister.password.value,
            retypePassword: formRegister.retypePassword.value
        }
        clearErrors();
        const authController = newAuthController();
        const response = await authController.register(registerPayload);
        if(response.type ==="failure"){
            switch(response.code){
                case responseCode.auth.register.invalid_input:
                    //invalid user input
                    showErrors(response.data)
                    break;
            }
        }
        else{
            switch(response.code){
                case responseCode.auth.register.success: showSuccessMessage()
            }
        }
    })
}

function showSuccessMessage(){
    const alertContent=`
    <div class="alert alert-success" role="alert">
      Tài khoản đăng ký thành công!
    </div>
`
   document.getElementById('js-alertSuccess').innerHTML=alertContent;
}

function showErrors(errors){
    const fields = Object.keys(errors)
    console.log(fields);
    for(let i=0; i<fields.length; i++){
        const field = fields[i];
        const input = document.getElementById(field)
        input.classList.add("is-invalid");

        const inputParent = input.parentElement;
        for(let j=0; j<errors[field].length;j++){
            const error = errors[field][j]
            const errorFeedback = document.createElement("div");
            errorFeedback.setAttribute("class", "invalid-feedback");
            errorFeedback.innerHTML= message.error[field][error.message];
    
            
            inputParent.insertBefore(errorFeedback, input.nextSibling)
        }

       
    }
}


function clearErrors(){
    const errorFeedbacks= document.getElementsByClassName("invalid-feedback")
    while(errorFeedbacks.length>0){
        errorFeedbacks[0].remove();
    }
    const inputs = document.getElementsByClassName('is-invalid')
    while(inputs.length>0){
        inputs[0].classList.remove("is-invalid")
    }
}


const register = {
    content: registerScreen,
    onload: onload
}

export default register;