// 首页的业务逻辑代码
require(["require.config"],function() {
    require(["header","footer","jquery","swiper","url","zoom"],function(header,footer,$,Swiper,url,zoom){
        class Index{
            constructor(){
                this.lunbo();
            }
            // 主页面轮播图
            lunbo (){   
                new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项
                    
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable :true,
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                    
                    // 如果需要滚动条
                    // scrollbar: {
                    //   el: '.swiper-scrollbar',
                    // },
                  })   
            }
            
      }
        new Index(); 
  })
  
})
