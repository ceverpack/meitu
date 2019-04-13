define(["jquery"],function($){
    
    function Footer() {
		this.foot();
    };

    Footer.prototype.foot = function(){
       $("#footer-container").load("/html/module/footer.html");
    };

    return new Footer();
});