/**
   *  All right by NieYinlong
   */

Page({

  /**
   * 页面的初始数据
   */
  data: {
   bgBoxHeight: 400, // 背景的高度
   bgBoxWidth: 320, // 背景的宽度
   
   moveImgLeft: 40,
   moveImgTop: 80,
   moveImgH: 100,
   moveImgW: 100,

   scaleIconFixWidth: 30,
   scaleLeft: 0,              // 拉伸按钮默认x坐标 (拉伸按钮默认宽高30)
   scaleTop: 0,               // 拉伸按钮默认y坐标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const halfWidth = this.data.scaleIconFixWidth / 2
    this.setData({
      scaleLeft: this.data.moveImgLeft + this.data.moveImgW - halfWidth,
      scaleTop: this.data.moveImgTop + this.data.moveImgH - halfWidth
    })
  },

  // 图片移动
  moveImgTouchmove: function(e) {
    console.log(e)
    let pageX = e.changedTouches[0].pageX
    let pageY = e.changedTouches[0].pageY
   
   
    // (this.data.moveImgW / 2)是因为触摸放到中间位置
    let toLeft = pageX - this.data.moveImgW / 2; 
    let toTop = pageY - this.data.moveImgH / 2;

    const halfWidth = this.data.scaleIconFixWidth / 2

    // 限制x左边不能出边框
    if (pageX - (this.data.moveImgW / 2) <= 0) {
      return;
    }
  
    // 限制右边不能出超过边框
    if ((pageX + (this.data.moveImgW / 2)) >= (this.data.bgBoxWidth)) {
      return;
    }

    // 限制top
    if (pageY - (this.data.moveImgH / 2) <= 1) {
      return;
    }

    // 限制bottom
    if ((pageY + (this.data.moveImgH / 2)) >= this.data.bgBoxHeight) {
      return;
    }


    this.setData({
      moveImgLeft: toLeft,
      moveImgTop: toTop,
      scaleLeft: toLeft + this.data.moveImgW - halfWidth,
      scaleTop: toTop + this.data.moveImgH - halfWidth
    })
  },
  
  // 拉伸按钮移动
  scaleTouchmove: function (e) {
    console.log(e)
    let pageX = e.changedTouches[0].pageX
    let pageY = e.changedTouches[0].pageY
    const halfWidth = this.data.scaleIconFixWidth / 2
    let toLeft = pageX - halfWidth    // 减去halfWidth是拉伸按钮宽度的一半
    let toTop = pageY - halfWidth

    
    let changedW = pageX - this.data.moveImgLeft
    let changedH = pageY - this.data.moveImgTop

    // 限制最moveImg小尺寸
    if (toLeft <= (this.data.moveImgLeft + halfWidth)) {
      return;
    }
    if (toTop <= (this.data.moveImgTop + halfWidth)) {
      return;
    }

    // 限制moveImg最大尺寸
    if(pageX - this.data.moveImgLeft > 250) {
      // 宽度达到最大值
      return;
    }
    if (pageY - this.data.moveImgTop > 250) {
      // 高度达到最大值
      return;
    }

    // 限制拉伸按钮的right
    if(this.data.scaleLeft + this.data.scaleIconFixWidth >= this.data.bgBoxWidth) {
      return;
    }
    // 限制拉伸按钮的bottom
    if (this.data.scaleTop + this.data.scaleIconFixWidth  >= this.data.bgBoxHeight) {
      return;
    }

    this.setData({
      scaleLeft: toLeft,
      scaleTop: toTop,
      moveImgW: pageX - this.data.moveImgLeft,
      moveImgH: pageY - this.data.moveImgTop,
    })
  },

})