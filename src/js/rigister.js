require(["require.config"],function() {
    require(["header","footer","jquery"],function(header,footer,$){
        class Index{
            constructor(){
                this.init();
            }
            init(){
                $(".btn-login").on("click",function(){
                    var name= $("#username").val(),
                        password=$("#Password").val();
                    var past = /^[\u4E00-\u9FA5]{3,10}$/;
                    var pist = /^[a-zA-Z0-9]{6,}$/;
                    if(past.test(name) && pist.test(password)){
                        var user={
                            "name" : name,
                            "password" :password
                        }
                        
                        var mysql = localStorage.getItem("user");
                        if(mysql){
                            mysql=JSON.parse(mysql);
                            if(mysql.some(function(item){
                                return item.name==user.name;
                            })){
                                alert("此账号已被人注册");
                            }else{
                                mysql.push(user);
                                localStorage.setItem("user",JSON.stringify(mysql));
                                if(confirm("注册成功，即将跳转到登录页面")){
                                    location.href="/html/login.html";
                                }
                            }
                            
                        }else{
                            mysql=[user];
                            localStorage.setItem("user",JSON.stringify(mysql));
                            if(confirm("注册成功，即将跳转到登录页面")){
                                location.href="/html/login.html";
                            }
                        }
                        
                    }else{
                        alert("您输入的账号或密码不符合规范")
                    }
                        return false;
                })
            }
        }
        new Index();
    })
})