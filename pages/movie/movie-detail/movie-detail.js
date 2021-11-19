// pages/movie/movie-detail/movie-detail.js
var app = getApp();
const util=require("../../../utils/util")
Page({
  data: {
    showAllDesc: false,
    movie: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var id = options.id;
    var url = app.globalData.doubanBase + app.globalData.subject+'?movieId=' + id;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var data = res.data.detailMovie;
        console.log(data)
        var readyData = {};
        // console.log(data)
        var directorsAndCasts = [];
        // for (let i in data.directors) {
        //   directorsAndCasts.push(data.directors[i]);
        // }
        // for (let j in data.casts) {
        //   directorsAndCasts.push(data.casts[j]);
        // }
        var genres = "";
        var separate = " / ";
        // for (let k in data.genres) {
        //   genres += data.genres[k] + separate;
        // }
        // genres = genres.substring(0, genres.length - separate.length);
        // var countries = "国家：";
        // var pubdates='上映时间：';
        // for (let i in data.pubdates){
        //   pubdates +=data.pubdates[i]+separate;     
        // }
        // pubdates = pubdates.substring(0, pubdates.length-separate.length);
        // for (let g in data.countries) {
        //   countries += data.countries[g] + separate;
        // }
        // // console.log(pubdates)
        // countries = countries.substring(0, countries.length - separate.length);
        readyData["movie"] = {
          id: data.id,
          title: data.nm,
          titleEn:"英文名："+ data.enm,
          images: data.img.replace("/w.h",''),
          directorsAndCasts: directorsAndCasts,
          collectCount: data.collect_count,
          commentsCount: data.comments_count,
          wishCount: data.wish_count,
          reviewsCount: data.reviews_count,
          cat: data.cat.split(",").join("/"),
          doCount: data.do_count,
          genres: data.src,
          artises: "主演：" + data.star.split(",").join("/"),
          rating: data.sc,
          ratingsCount: util.bigNumberTransform(data.snum) + "人评",
          subtype: data.subtype,
          summary: data.shareInfo.content,
          shareUrl: data.share_url,
          year: data.rt,
          // rating: data.sc,
        };
        that.setData(readyData);
      },
      fail: function () {
        console.log("fail");
      },
      complete: function () {
        console.log("complete");
        wx.hideToast();
      }
    })
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
  /** 查看海报 */
  bindPoster: function (event) {
    var posterUrl = event.currentTarget.dataset.posterUrl;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-poster/movie-poster?posterUrl=' + posterUrl
    });
  },
  /** 展开简介   */
  handleExtensiontap: function (event) {
    var readyData = {
      "showAllDesc": true
    };
    this.setData(readyData);
  },
  /** 用户点击想看 */
  handleWishtap: function (event) {
    wx.showModal({
      title: '提示',
      content: '一起去看吧',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      },
      showCancel: false
    });
  },
  /** 用户点击看过 */
  handleDotap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/rating/rating?id=' + id
    });
  },
  /** 查看影人信息 */
  handleCelebrity: function (event) {
    var id = event.currentTarget.dataset.id;
    var avatar = event.currentTarget.dataset.avatar;
    wx.redirectTo({
      url: '/pages/movie/movie-detail/celebrity/celebrity?id=' + id + "&&avatar=" + avatar
    });
  }
})