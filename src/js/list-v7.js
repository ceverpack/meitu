require(["require.config"],function() {
    require(["header","footer","jquery","url","template"],function(header,footer,$,url,template){
        class Index{
            constructor(){
                this.meitu();
            }
             // 列表页请求数据
             meitu (){
                $.ajax({
                  url: url.baseUrl + "meitu",
                  method: "GET",
                  dataType: "json",
                  success : function(res){
                    console.log(res);
                    let data = res.res_body.data;
                    var html = template("list-v7",{data});
                    $(".phones-sections").html(html);

                  }
                })
          }

        }
        new Index();
    })
})