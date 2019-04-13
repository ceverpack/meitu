require(["require.config"], () => {
    require(["jquery", "url", "template", "header", "footer", "zoom"], ($, url, template) => {
        class Detail {
            constructor() {
                this.init();
                this.zoom();
            }

            init() {
                // 获取id，然后请求数据
                let id = location.search.slice(4);
                // 带着id请求详情页数据
                $.ajax({
                    url: url.baseUrl + "detail?id=" + id,
                    method: "GET",
                    dataType: "json",
                    success: res => {
                        if (res.res_code === 1) {
                            // 保存当前商品数据
                            this.shopcar = res.res_body.data.shopcar;
                            // 由于rap2返回的id都一样，所以要手动的修改当前数据的id，真实开发中不用写这行代码
                            this.shopcar.id = id;
                            // 渲染详情页
                            this.render(res.res_body.data);
                        }
                    }
                })
            }

            render(data) {
                var html = template("detail", {data});
                $("#d-box").html(html);
                // 绑定事件
                this.addToCart();
                this.choose();
                this.num();
            }

            zoom() {
                // 放大镜插件
                $(".zoom-img").elevateZoom({
                    gallery: 'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize: '1',
                    borderColor: '#888'
                });
            }

            choose() {
                var _this=this;
                //选择商品规格
                console.log($("#property-phone"))
                $("#property-phone").on("click", ".mt-col-6,.property-option-change", function () {
                    
                    if ($(this).is(".mt-col-6")) {
                        $("#property-phone").addClass("property-option-show");
                        // $(".property-option-value").html()
                        $("#property-phone .property-option-value").html($(this).text());
                        _this.total();
                    };
                    if ($(this).is(".property-option-change")) {
                        $("#property-phone").removeClass("property-option-show");
                    };
                })
                //选择商品颜色
                $("#property-option").on("click",".mt-col-6,.property-option-change", function (){
                    if ($(this).is(".mt-col-6")) {
                        $("#property-option").addClass("property-option-show");
                        // $(".property-option-value").html()
                        $("#property-option .property-option-value").html($(this).text());

                    };
                    if ($(this).is(".property-option-change")) {
                        $("#property-option").removeClass("property-option-show");

                    };
                })
            }

            num(){
                var _this=this;
                //操作商品数量
                $("#c-num").on("click",".mt-btn-dec,.mt-btn-add", function(){
                    if ($(this).is(".mt-btn-dec")) {
                        let val=Number($("#c-num .mt-number-value").text());
                        if(val>1){
                            $("#c-num .mt-number-value").html(val-1);
                        };
                        _this.total();
                    }
                    if ($(this).is(".mt-btn-add")) {
                        let val=Number($("#c-num .mt-number-value").text());
                        if(val<8){
                            $("#c-num .mt-number-value").html(val+1);
                            _this.total();
                        }else{
                            $("#add-car-succse").html("购物车已达上限").css({"display":"block","z-index":"50"});
                            clearInterval(this.timer);
                            this.timer = setInterval(function(){
                                $("#add-car-succse").html("添加购物车成功").css({"display":"none","z-index":"50"});
                            },1500)
                        }
                
                    }
                })
            }

            total() {
                //计算渲染总价
                let property = $("#property-phone .property-option-value").text().trim();//商品规格
                let num = Number($("#c-num .mt-number-value").text());//商品数量
                let price;
                if(property=="256G"){
                    price = 4799;
                }
                if(property=="512G"){
                    price = 5889;
                }
                $("#total").html(num*price);
                
            }

            addToCart() {
                var _this=this;
                // 加入购物车
                $("#buy_btn").on("click", function(){
                    // 存数据之前先取
                    let cart = localStorage.getItem("cart");
                    if (cart) {
                        cart = JSON.parse(cart);
                        // 购物车已经有数据
                        // 判断购物车里是否已经存在当前数据
                        let index;
                        if (cart.some((item, i) => {
                                index = i;
                                return item.id == _this.shopcar.id;
                            })) {
                            // 索引为index的这条数据就是当前数据
                            cart[index].num++;
                        } else {
                            // 购物车里还没有加过当前数据
                            // console.log(this.shopcar);
                            cart.push({
                                ..._this.shopcar,
                                num: 1
                            });
                        }
                        localStorage.setItem("cart", JSON.stringify(cart));
                    } else {
                        localStorage.setItem("cart", JSON.stringify([{
                            ..._this.shopcar,
                            num: 1
                        }]));
                    }
                    // 添加成功提示
                    clearInterval(this.timer);
                    $("#add-car-succse").css("display","block");
                       this.timer = setInterval(()=>{
                        $("#add-car-succse").css("display","none");
                    },1500);
                })
            }
        }
        new Detail();
    })
})