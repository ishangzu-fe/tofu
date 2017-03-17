<template lang="html">
    <div class="panel-user">
        <div class="panel-user-profile">
            <img class="avatar" :src="profile.avatar"></img>
            <!-- 需要过滤器 TODO -->
            <p class="info-name">{{profile.name}}</p>
            <p class="info-phone">{{profile.phone}}</p>
        </div>
        <ul class="panel-user-options">
            <!--<li class="change-password" @click="changePassword">-->
                <!--<img src="../../../../../assets/change_pw.svg"></img>-->
                <!--修改密码-->
            <!--</li>-->
            <li class="logout" @click="logout">
                <img src="../../../../../assets/logout.svg"></img>
                退出登录
            </li>
            <li class="close-windows" @click="closeAllTabs">
                <img src="../../../../../assets/close_windows.svg"></img>
                关闭所有窗口
            </li>
        </ul>
    </div>
</template>

<script>
import tabbar from '../../tabbar'
import CommonServices from '../../../../../services/common'

export default {
    data () {
        return {
            profile: {
                avatar: '/static/avatar.png',
                name: '',
                phone: 13978894856767
            }
        }
    },

    methods: {
        changePassword () {

        },

        /**
         * 退出登录
         */
        logout () {
            CommonServices.logout().then(res => {
                console.log('登出返回结果为：', res);
                if (res.code === 0) {
                    location.href = 'http://sys.ishangzu.com';
                } else {
                    this.$message.error('退出失败！');
                }
            })
        },

        /**
         * 关闭所有窗口
         */
        closeAllTabs () {
            tabbar.manager.closeAllTabs()
        },

        /**
         * 获取用户信息
         */
        getUserInfo () {
            // const token = sessionStorage.getItem('token')
            // if (!token) {
            //     this.$message.error('你尚未登录！')
            // }          
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if (userInfo) {
                this.profile.name = userInfo.user_name;
                this.profile.phone = userInfo.user_phone;
            } else {
                this.$message.error('获取用户信息失败！')
            }
        }
    },

    created () {
        this.getUserInfo()
    }
}
</script>

<style lang="scss" scoped>
.panel-user {
    position: relative;

    box-sizing: border-box;
    width: 240px;

    .panel-user-profile {
        position: relative;

        height: 72px;
        padding: 24px 0 22px 74px;

        border-bottom: 1px solid #C4C4C4;

        .avatar {
            position: absolute;
            left: 16px;
            top: 16px;

            width: 40px;
            height: 40px;
        }

        p {
            margin-bottom: 2px;

            line-height: 12px;

            font-family: HelveticaNeue;
            font-size: 12px;
            color: #A1A0A1;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .panel-user-options {
        padding: 8px 0;

        list-style: none;

        li {
            position: relative;

            height: 40px;
            line-height: 40px;
            padding: 0 54px;

            font-family: PingFang-SC-Regular;
            font-size: 12px;
            color: #1E2C3C;
            letter-spacing: 0.3px;

            cursor: pointer;

            &:hover {
                background-color: #F5F5F5;
            }

            img {
                position: absolute;
                top: 11px;
                left: 18px;

                height: 18px;

                border-radius: 0;
            }

            &.change-password img {
                width: 15px;
            }

            &.logout img {
                width: 20px;
            }

            &.close-windows img {
                width: 18px;
            }
        }
    }
}
</style>
