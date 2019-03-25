<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div v-if="loginWay" :class="{on:loginWay}">
            <section class="login_message">
              <input v-model="phone" type="tel" maxlength="11" placeholder="手机号">
              <button @click.prevent="getCode" :disabled="!rightPhone" class="get_verification"
                      :class="{right_phone:rightPhone}">
                {{computeTime>0?`已发送(${computeTime}s)`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input v-model="code" type="text" maxlength="8" placeholder="验证码">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div v-else :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="showPassword?'text':'password'" v-model="pwd" maxlength="8" placeholder="密码">
                <div class="switch_button" :class="showPassword?'on':'off'" @click="showPassword=!showPassword">
                  <div class="switch_circle"></div>
                  <span class="switch_text">{{showPassword?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" ref="captchaImg" src="http://localhost:4000/captcha" alt="captcha"
                     @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a @click="$router.back(-1)" class="go_back">
        <i class="iconfont iconjiantou-zuo"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
  </section>
</template>

<script>
import {reqSendCode, reqLoginCode, reqLoginPwd} from '../../api/index'
import AlertTip from '../../components/AlertTip/AlertTip'

export default {
  name: 'Login',
  components: {
    AlertTip
  },
  data() {
    return {
      loginWay: true, //登录方式、true代表短信登录、false代表密码登录
      computeTime: 0,//60秒倒计时的计时时间
      showAlert: false,//是否显示提示框 默认是不显示
      alertText: '',//提示信息
      showPassword: false,//是否明文显示密码
      phone: '18721639928',//用户手机号
      code: '',//短信验证码
      pwd: '',//用户密码
      name: '',//用户手机或邮箱
      captcha: '',//图片验证码
      captchaImg: '' //一次性验证码img
    }
  },
  computed: {
    //验证手机号 11位数字即可
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  mounted() {
  },
  methods: {
    //获取验证码和启动倒计时
    async getCode() {
      //倒计时60秒
      if (this.computeTime === 0) {
        //初始化时间
        this.computeTime = 10;
        //启动循环定时器, 每隔 1s 减少 1
        this.intervalId = setInterval(() => {
          this.computeTime--
          //如果到时, 停止计时
          if (this.computeTime === 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
      }

      //获取短信验证码(发送 ajax 请求(请求后台向指定手机号发验证码短信))
      const result = await reqSendCode(this.phone);
      if (result.code === 0) {
        this.showAlertDialog('发送成功')
        // 停止倒计时
        if (this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
        }
      } else {
        this.computeTime = 0
        clearInterval(this.intervalId)
        this.showAlertDialog(result.msg)
      }
    },

    //用户登录
    async login() {
      const testPlate = /^\d{6}$/;
      let result
      if (this.loginWay) {
        //短信登录
        const {rightPhone, phone, code} = this
        if (!rightPhone) {
          //手机号不正确
          this.showAlertDialog('手机号不正确')
          return false
        } else if (!(testPlate.test(this.code))) {
          //验证码必须是6位数字
          this.showAlertDialog('验证码必须是6位数字1')
          return false
        }
        result = await reqLoginCode(phone, code)
      } else {
        //账号密码登录
        const {name, pwd, captcha} = this
        if (!name) {
          //手机号不正确
          this.showAlertDialog('手机号不正确')
          return false
        } else if (!(testPlate.test(pwd))) {
          //密码必须是6位数字
          this.showAlertDialog('密码必须是6位数字')
          return false
        } else if (!captcha) {
          //验证码必须是6位数字
          this.showAlertDialog('验证码必须是必填的')
          return false
        }
        result = await reqLoginPwd({name, pwd, captcha})
      }
      //停止定时器
      if (this.computeTime) {
        this.computeTime = 0
        clearInterval(this.intervalId)
      }
      //处理结果数据
      if (result.code === 0) {
        const userInfo = result.data
        //如果用户登录成功，1.跳转回个人中心页面2. 保存用户信息
        this.$router.replace('/profile')
        this.$store.dispatch('submitUserInfo', result.data)
      } else {
        //失败
        const msg = result.msg
        //显示警告提示信息
        this.showAlertDialog(msg)
        //刷新图片验证码
        this.getCaptcha()
      }
    },

    //显示信息提示框
    showAlertDialog(alertText) {
      this.showAlert = true;
      this.alertText = alertText
    },

    //获取一次性验证码
    getCaptcha() {
      //也可以使用refs设置
      this.$refs.captchaImg.src = 'http://localhost:4000/captcha?time=' + new Date();
    },

    //关闭弹出框
    closeTip() {
      this.showAlert = false
      this.alertText = ''
    }
  }
  ,
}
</script>

<style scoped lang='scss'>
  @import "../../common/scss/mixins";

  .loginContainer {
    width: 100%;
    height: 100%;
    background: #fff;

    .loginInner {
      padding-top: 60px;
      width: 80%;
      margin: 0 auto;

      .login_header {
        .login_logo {
          font-size: 40px;
          font-weight: bold;
          color: #02a774;
          text-align: center;
        }

        .login_header_title {
          padding-top: 40px;
          text-align: center;

          > a {
            color: #333;
            font-size: 14px;
            padding-bottom: 4px;

            &:first-child {
              margin-right: 40px;
            }

            &.on {
              color: #02a774;
              font-weight: 700;
              border-bottom: 2px solid #02a774;
            }
          }
        }
      }

      .login_content {
        > form {
          > div {
            display: none;

            &.on {
              display: block;
            }

            input {
              width: 100%;
              height: 100%;
              padding-left: 10px;
              box-sizing: border-box;
              border: 1px solid #ddd;
              border-radius: 4px;
              outline: 0;
              font: 400 14px Arial;

              &:focus {
                border: 1px solid #02a774;
              }
            }

            .login_message {
              position: relative;
              margin-top: 16px;
              height: 48px;
              font-size: 14px;
              background: #fff;

              .get_verification {
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                border: 0;
                color: #ccc;
                font-size: 14px;
                background: transparent;

                &.right_phone {
                  color: #1b1919;
                }
              }
            }

            .login_verification {
              position: relative;
              margin-top: 16px;
              height: 48px;
              font-size: 14px;
              background: #fff;

              .switch_button {
                font-size: 12px;
                border: 1px solid #ddd;
                border-radius: 8px;
                transition: background-color 0.3s, border-color 0.3s;
                padding: 0 6px;
                width: 30px;
                height: 16px;
                line-height: 16px;
                color: #fff;
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);

                &.off {
                  background: #fff;

                  .switch_circle {
                    left: -1px;
                  }
                }

                &.on {
                  background: #02a774;

                  .switch_circle {
                    left: 25px;
                  }
                }

                > .switch_circle {

                  position: absolute;
                  top: -1px;
                  left: -1px;
                  width: 16px;
                  height: 16px;
                  border: 1px solid #ddd;
                  border-radius: 50%;
                  background: #fff;
                  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                  transition: transform 0.3s;
                }
              }
            }

            .login_hint {
              margin-top: 12px;
              color: #999;
              font-size: 14px;
              line-height: 20px;

              > a {
                color: #02a774;
              }
            }
          }

          .login_submit {
            display: block;
            width: 100%;
            height: 42px;
            margin-top: 30px;
            border-radius: 4px;
            background: #4cd96f;
            color: #fff;
            text-align: center;
            font-size: 16px;
            line-height: 42px;
            border: 0;
          }
        }

        .about_us {
          display: block;
          font-size: 12px;
          margin-top: 20px;
          text-align: center;
          color: #999;
        }
      }

      .go_back {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 30px;
        height: 30px;

        > .iconfont {
          font-size: 20px;
          color: #999;
        }
      }
    }
  }
</style>
