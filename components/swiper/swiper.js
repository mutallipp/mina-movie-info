// pages/components/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperDataList:Array
  },

  options:{
    addGlobalClass:true
  },

  /**
   * 组件的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    DotStyle:false,    //是否下面的浮选框长方形的？默认是圆形的
 
  },
  /**
   * 组件圣生命周期函数
   */
  lifetimes: {
    created: function() {
      // 在组件实例进入页面节点树时执行
      this.getData()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },

  },
  
  observers:{
    '**':()=>{
      console.log("swiperDataList------------")
      // this.data.swiperDataList.sort((a,b)=>{return b.sc-a.sc})
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cardSwiper(e) {
      // console.log(e.detail)
      this.setData({
        cardCur: e.detail.current
      })
    },
    getData(){
      let t=this
      console.log(t.data.swiperDataList)
      console.log(this.data)
        const data = t.data.swiperDataList.sort((a,b)=>{return b.sc-a.sc})
      //   this.data.swiperDataList.map(res=>{
      //   res.img=res.img.replace("/w.h",'')
      //   console.log(res.img);
      //   return res
      // })
      this.setData({
        swiperDataList:data
      })
      
    },
    clickItem(e){
      console.log(e.currentTarget.dataset.id);
      let id=e.currentTarget.dataset.id
      if(id){
        wx.navigateTo({
          url: '/pages/movie/movie-detail/movie-detail?id=' + id
        });
      }
    }
  }
})
