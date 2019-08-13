const view={}
view.setScreen=function(screen){
    console.log(screen)
    document.getElementById("app").innerHTML=screen.content;
            screen.onload();
    }

export default view;