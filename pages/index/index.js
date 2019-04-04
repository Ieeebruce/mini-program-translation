// pages/index/index.js
import {translate} from '../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputText: '',
    result: '',
    hideClearButton: true,
    selectedLanguage: {},
  },
  clearInputArea: function() {
    this.setData({
      'inputText': '',
      'result': '',
      hideClearButton: true
    })
  },
  onInput: function(e) {
    this.setData({
      'inputText': e.detail.value
    })
    //键盘激活，显示清除按钮
    if (this.data.inputText.length > 0) {
      this.setData({
        hideClearButton: false
      })
    } else {
      this.setData({
        hideClearButton: true
      })
    }
  },
  onConfirm: function() {
    //调用翻译
    if (this.data.inputText) {
      translate(this.data.inputText, {
        from: 'auto',
        to: app.globalData.selectedLanguage.lang
      }).then(res => {
        this.setData({
          'result': res.trans_result[0].dst
        });
        let history = wx.getStorageSync('history') || [];
        history.unshift({
          inputText: this.data.inputText,
          result: res.trans_result[0].dst
        });
        history.length = history.length > 10 ? 10 : history.length;
        wx.setStorageSync('history', history)
      });
      this.setData({
        hideClearButton: false
      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.inputText) {
      this.setData({ inputText: options.inputText })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.selectedLanguage !== app.globalData.selectedLanguage) {
      this.setData({
        'selectedLanguage': app.globalData.selectedLanguage.chs
      });
      this.onConfirm()
      }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})