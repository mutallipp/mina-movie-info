
!function(){
    var PageTmp = Page;
   
    Page =function (pageConfig) {
       
      // 设置全局默认分享
      pageConfig = Object.assign({
        onShareAppMessage:function () {
          return {
            title:'300Udak电影院',
            path:`/pages/movie/movie`,
            // imageUrl:'默认分享图片',
          };
        }
      },pageConfig);
   
      PageTmp(pageConfig);
    };
  }();
App({
    onLaunch: function () {
        var that = this;
        // 使用设备可视宽高
        wx.getSystemInfo({
            success: function (res) {
                that.globalData.windowWidth = res.windowWidth;
                that.globalData.windowHeight = res.windowHeight;
            }
        });
    },
    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo);
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo);
                        }
                    })
                }
            });
        }
    },
    globalData: {
        userInfo: null,
        windowWidth: 0,
        windowHeight: 0,
      // doubanBase: "https://douban.uieee.com",
        doubanBase: "https://m.maoyan.com",
        inTheaters: "/ajax/movieOnInfoList",        //热映
        comingSoon: "/ajax/comingList",             //即将上映
        top250: "/v2/movie/top250",
        weekly: "/v2/movie/weekly",
        usBox: "/v2/movie/us_box",
        newMovies: "/v2/movie/new_movies",
        subject: "/ajax/detailmovie",                   //电影详情
        celebrity: "/v2/movie/celebrity/",
        // search: "/v2/movie/search?q="
        search: "/apollo/ajax/search?cityId=1&kw="
    },

})