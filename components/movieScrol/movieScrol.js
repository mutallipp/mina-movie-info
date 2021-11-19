// pages/components/movieScrol.js
Component({
  /**
   * 组件的属性列表
   */
options:{
  addGlobalClass:true
},

  properties: {
    moviesData:{
      type:Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    average:9.5
  },

  /**
   * 组件的方法列表
   */
  methods: {
      /** 跳转电影详情页 */
    bindMovieDetail: function (event) {
      let id = event.currentTarget.dataset.id;
      // console.log(event)
      wx.navigateTo({
        url: '/pages/movie/movie-detail/movie-detail?id=' + id
      });
    },
      /** 显示更多电影列表 */
    bindMore(event){
      var typeId = event.currentTarget.dataset.typeId;
      wx.navigateTo({
        url: '/pages/movie/movie-more/movie-more?typeId=' + typeId
      });
    }
  }
})
