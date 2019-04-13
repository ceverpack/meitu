require(["require.config"],function() {
    require(["header","footer","jquery","swiper"],function(header,footer,$,swiper){
        class Index{
            constructor(){
                this.init();
            }
            init(){
                var data=JSON.parse(localStorage.getItem("user"));
                var name=data[0].name,
                    password=data[0].password;
                    console.log(name,password);
                $("#username").val(name);
                $("#Password").val(password);
                $(".btn-login").on("click",function(){
                    name=$("#username").val();
                    password=$("#Password").val();
                    if(data){
                        if(data.some(function(item,i){
                            return item.name==name && item.password==password
                        })){
                            if(confirm("登录成功，即将跳转到首页")){
                                location.href="/index.html";
                            }
                        }
                    }
                    return false;
                })
            }
        }
        new Index;
    })
})