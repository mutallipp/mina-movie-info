// pages/movie/search/search.js
var app = getApp();
Page({
  data: {
    searchValue: "",
    showDelete: false,
    result: {},
    value:''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  /** 搜索影视 */
  bindSearchInput: function (event) {
    var value = event.detail.value,t=this;
    // var readyData = { showDelete: false };
    // if (value.length > 0) {
    //   readyData = { showDelete: true };
    //   this.handleSearchData(value);
    // }
    // this.setData(readyData);
    t.setData({value:value})
  },
  /**清空输入框 */
  bindSearchDelete: function (event) {
    var readyData = { searchValue: "", showDelete: false, result: {} };
    this.setData(readyData);
  },
  /**点击取消 */
  bindSearchCancel: function (event) {
    wx.navigateBack();
  },
  /** 提交搜索请求 */
  handleSearchData: function (e) {
    var that = this;
    var serchURL = app.globalData.doubanBase + app.globalData.search + that.data.value + "&&start=0&&count=10";
    wx.showLoading({
      title: '搜索中。。。',
    })
    wx.request({
      url: serchURL,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data;
        that.processSearchData(data);

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideLoading({
          success: (res) => {},
        })
      }
    });
  },
  /**组装搜索数据 */
  processSearchData: function (data) {
    var movies = [];
    
    const  movieData = data.movies.list

    for (let idx in movieData) {
      var subject = movieData[idx];
      var directors = "";
      var separate = " / ";
      for (let i in subject.directors) {
        directors += subject.directors[i].name + separate;
      }
      // directors = directors.substring(0, directors.length - separate.length);
      // var summary = subject.rating.average + "分" + separate + subject.year + separate + directors;
      // console.log(subject);
      var temp = {
        id: subject.id,
        casts: subject.casts,
        collect_count: subject.collect_count,
        directors: subject.dir,
        title: subject.nm,
        images: [subject.img.replace("/w.h",'')],
        rating: subject.rating,
        year: subject.year,
        // summary: summary
      };
      movies.push(temp);
    }
    // console.log(movies);
    var readyData = {};
    readyData["result"] = {
      subjects: movies
    }

    this.setData(readyData);
  },
  /** 点击进入搜索条目 */
  handletap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + id
    })
  }
})