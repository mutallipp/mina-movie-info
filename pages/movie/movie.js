// /pages/movie/movie.js
var app = getApp();
const util=require("../../utils/util")

Page({
  data: {
    showRating: false,
    showWish: false,
    acquiredSelected: false,  // 精选榜单只请求一次
    inTheaters: {},   // 影院热映
    comingSoon: {},    // 即将上映
    top250: {},        // 豆瓣Top250
    weekly: {},        // 口碑榜
    newMovie: {},       //  新片榜
    usBox: {} ,           // 票房榜
    swiperDataList:[]    //swiper数据
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var inTheatersURL = app.globalData.doubanBase + app.globalData.inTheaters + "?start=0&&count=10";
    var comingSoonURL = app.globalData.doubanBase + app.globalData.comingSoon + "?start=0&&count=10&token=";

    this.getMovieListData(inTheatersURL, "inTheaters", "影院热映");
    this.getMovieListData(comingSoonURL, "comingSoon", "即将上映");
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /** 获取电影列表 */
  getMovieListData: function (url, settedKey, categoryTitle) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    var that = this;
    // 请求电影数据
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-type": "application/json"
      }, // 设置请求的 header
      success: function (res) {
        // 组装电影数据
        var data = res.data;
        that.processMovieListData(data, settedKey, categoryTitle);
      },
      fail: function (e) {
        // fail
        wx.showToast({
          title:e
        })
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })
  },
  /** 组装电影数据 */
  processMovieListData: function (data, settedKey, categoryTitle) {
    var movies = [];
    // console.log(data);
    let movieArr=[]
    var showRating = false;
    var showWish = false;
    if("inTheaters" == settedKey){
      movieArr=data.movieList
      showRating = true;
      showWish = true;
      this.getSwiperDataList(movieArr)
      // this.setData({
      //   swiperDataList:movieArr
      // })
    }else if("comingSoon" == settedKey){
      movieArr=data.coming
      showRating = false;
      showWish = true;
    }

    for (let idx in movieArr) {
      var subject = movieArr[idx];
      var temp = {
        id: subject.id,
        title: subject.nm,
        rating: subject.sc,
        wish:util.bigNumberTransform(subject.wish) ,
        images: subject.img.replace("/w.h",''),
        subtype: subject.subtype,
        directors: subject.directors,
        casts: subject.casts,
        year: subject.rt,
        showRating: showRating,
        showWish: showWish
      };
      movies.push(temp);
    }
    var readyData = {};
    // console.log(settedKey);
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies,
      showRating:showRating
    };
    this.setData(readyData);
  },
  /** 滑动屏幕 */
  handleTouchMove: function (event) {
    var offsetTop = event.target.offsetTop;
    console.log("handleTouchMove offsetTop: " + offsetTop);
    if (offsetTop > 10 && !this.data.acquiredSelected) {
      this.getSelectedListData();
    }
  },
  /** 获取电影榜单数据 */
  getSelectedListData: function () {
    var that = this;
    // 豆瓣口碑榜，新片榜是高级接口，票房榜不可用，这里用豆瓣Top250数据 
    var top250URL = app.globalData.doubanBase + app.globalData.top250 + "?start=0&&count=12";
    console.log("handleTouchMove top250URL: " + top250URL);
    if (!this.data.acquiredSelected) {
      var readyData = {};
      readyData["acquiredSelected"] = {
        "acquiredSelected": true
      }
      this.setData(readyData);

      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      });

      // 请求电影数据
      wx.request({
        url: top250URL,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: { 'content-type': "json" }, // 设置请求的 header
        success: function (res) {
          // 组装电影数据
          var data = res.data;
          that.processSelectedListData(data);
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
          wx.hideToast();
        }
      });
    }
  },
  /** 组装榜单数据 */
  processSelectedListData: function (data) {
    var top250 = [];
    var weekly = [];
    var newMovie = [];
    var usBox = [];
    for (let idx in data.subjects) {
      var subject = data.subjects[idx];
      var temp = {
        id: subject.id,
        title: subject.title,
        rating: subject.sc,
        collectCount: subject.collect_count,
        images: subject.images,
        subtype: subject.subtype,
        directors: subject.directors,
        casts: subject.casts,
        year: subject.year
      };
      if (idx < 3) {
        top250.push(temp);
      } else if (idx < 6) {
        weekly.push(temp);
      } else if (idx < 9) {
        newMovie.push(temp);
      } else {
        usBox.push(temp);
      }
    }

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var dayOfDate = date.getDate();

    var date2 = new Date(year, month, dayOfDate + 7);
    var year2 = date2.getFullYear();
    var month2 = date2.getMonth();
    var dayOfDate2 = date2.getDate();

    var dateString = (month + 1) + "月" + dayOfDate + "日" + "-" + month2 + "月" + dayOfDate2 + "日";

    var readyData = {};
    readyData["top250"] = {
      categoryType: "top250",
      categoryTitle: "豆瓣Top250",
      desc: "8分以上好电影",
      movies: top250
    };
    readyData["weekly"] = {
      categoryType: "weekly",
      categoryTitle: "口碑榜",
      desc: dateString,
      movies: weekly
    };
    readyData["newMovie"] = {
      categoryType: "newMovie",
      categoryTitle: "新片榜",
      desc: dateString,
      movies: newMovie
    };
    readyData["usBox"] = {
      categoryType: "usBox",
      categoryTitle: "票房榜",
      desc: dateString,
      movies: usBox
    };

    this.setData(readyData);
  },
  /** 搜索电影 */
  bindSearchNavigate: function (event) {
    wx.navigateTo({
      url: '/pages/movie/search/search'
    })
  },
  /** 显示更多电影列表 */
  bindMore: function (event) {
    var typeId = event.currentTarget.dataset.typeId;
    wx.navigateTo({
      url: '/pages/movie/movie-more/movie-more?typeId=' + typeId
    });
  },
  /** 跳转到榜单列表 */
  bindSelected: function (event) {
    var typeId = event.currentTarget.dataset.typeId;
    var typeTitle = event.currentTarget.dataset.typeTitle;
    wx.navigateTo({
      url: '/pages/movie/selected/selected?typeId=' + typeId + "&&typeTitle=" + typeTitle
    });
  },
  /** 跳转电影详情页 */
  bindMovieDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + id
    });
  },
  /**给swiper组装数据 */
  getSwiperDataList(data){
    console.log(data);
    let newData=[...data].sort((a,b)=>{return b.sc-a.sc}).slice(0,5)
    newData.map(res=>{
      res.img= res.img.replace("/w.h",'')
      return res
    })
    // console.log(data)
    // newData.sort((a,b)=>{return b.sc-a.sc})
    this.setData({
      swiperDataList:newData
    })
  },

  onShareAppMessage: function () {
 
    
 
    return {
      title: "300Udak电影院",
      path:`/pages/movie/movie` 
    }
  }
 


})