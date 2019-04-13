require(["require.config"],function() {
    require(["header","footer","jquery","template","zoom"],function(header,footer,$,template,zoom){
        class Index{
            constructor(){
                this.cardata=JSON.parse(localStorage.getItem("cart"));
                this.init();
                this.click();
              
            }
           
            init (){ 
                // 购物车渲染
                if(this.cardata){
                    $(".none-data-description").css("display","none");
                    var html = "";
                    if(this.cardata){
                        this.cardata.forEach(function (item,index) {
                            html += `<div data-id="${item.id}" class="goodsItem clearfix">
                            <div class="goodsItem-main clearfix">
                                <div class="goodsItem-check"></div>
                                <a href="javascript:;" class="goodsItem-image lazy-box no-link">
                                    <img src="//mtshop1.meitudata.com/5c19ea188e53e87383.jpg"
                                        lazy-src="//mtshop1.meitudata.com/5c19ea188e53e87383.jpg"
                                        class="lazy-img lazy-loading">
                                </a>
                                <div class="goodsItem-info">
                                    <div class="goodsItem-desc">
                                        <div class="goodsItem-name">
                                            <div class="goodsItem-name-inner">
                                                <div class="goodsItem-name-link">
                                                    <a href="javascript:;" class="no-link">${item.name}</a>
                                                    <span class="goodsItem-instalment">12期免息</span>
                                                </div>
                                                <span class="goodsItem-spec">
                                                    ${item.property}<span>;</span>
                                                </span>
                                                <span class="goodsItem-spec">
                                                    ${item.color}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="goodsItem-price">
                                            ￥<span>${item.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="goodsItem-account clearfix">
                                    <div class="goodsItem-number">
                                        <div data-v-1a82b236 class="mt-number">
                                            <button data-v-1a82b236 class="mt-icon mt-btn-dec">-</button>
                                            <div data-v-1a82b236 class="mt-number-value">1</div>
                                            <button data-v-1a82b236 class="mt-icon mt-btn-add">+</button>
                                        </div>
                                    </div>
                                </div>
                                <a href="javascript:;" class="goodsItem-remove">x</a>
                            </div>
                        </div>
                        <div data-v-0ac3485a class="cart-footer clearfix">
                        <p data-v-0ac3485a class="cart-footer-total">
                            总计：<span data-v-0ac3485a>￥<i>62387.00</i></span>
                        </p>
                        <div data-v-0ac3485a class="cart-footer-handler">
                            <button data-v-0ac3485a class="mt-button mt-button--primary mt-button--large">
                                <span>结账(2)</span>
                            </button>
                        </div>
                    </div>`;
                    })
                        $("#car-body").html(html);
                    }else{
                        $(".none-data-description").css("display","block");
                    }
                }
        
            }
            
           click(){
            // 绑定点击事件
            $("#car-body").on("click",".mt-btn-dec,.mt-btn-add,.goodsItem-remove",function(){
                // 当前商品减一
                if($(this).is(".mt-btn-dec")) {
                    let data = Number($(this).next().text());
                    if(data>1){
                        $(this).next().html(data-1);
                    }
                }
                // 当前商品加一
                if($(this).is(".mt-btn-add")) {
                    let data = Number($(this).prev().text());
                    if(data<8){
                        $(this).prev().html(data+1);
                    }else{
                        clearInterval(this.timer);
                        $("#max-num").css("display","block");
                        this.timer = setInterval(()=>{
                            $("#max-num").css("display","none");
                        },1500)
                    }
                }
                //删除当前商品
                if($(this).is(".goodsItem-remove")){
                    $(".m-b-box").css("display","block");
                    $(".m-b-box .mt-button--cancel").on("click",()=>{
                        $(this).parent().parent().remove();
                        let id=$(this).parent().parent().attr("data-id");
                        let data=JSON.parse(localStorage.getItem("cart"));
                        data.forEach(function(item,index){
                            if(item.id == id){
                                data.splice(index,1);
                            }
                        })
                        localStorage.setItem("cart",JSON.stringify(data));
                        if(data.length == 0){
                            $(".none-data-description").css("display","block");
                        }
                        $(".m-b-box").css("display","none");
                    })
                    
                    $(".m-b-box .mt-button--default").on("click",function(){
                        $(".m-b-box").css("display","none");
                    })
                    
                }
                   
                
               
            })
        }
    }
        new Index();
    })
})