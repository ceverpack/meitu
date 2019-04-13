define(["jquery"], function ($) {
  class Header {
    constructor() {
      this.init().then(() => {
        this.get();
      });
      // this.aside();
    }
    init() {
      return new Promise((resolve, reject) => {
        $("#header-container").load("/html/module/header.html", () => {
          resolve();
        });

      })
    }

    get() {

      $(".global-header-nav-login").on("click", function (e) {
        $(".aside-list").css("display", "block");
        e.stopPropagation();
      });

      $(document).on("click", function () {
        $(".aside-list").css("display", "none");
        
      })

    }
  }


  return new Header();
});