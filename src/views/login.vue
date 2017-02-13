<template>
    <div class="login-container">
        <div class="logo">
            <svg width="60px" height="60px" viewBox="158 124 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 41.2 (35397) - http://www.bohemiancoding.com/sketch -->
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Group-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(158.000000, 124.000000)">
                    <circle id="Oval-2" fill="#C31230" cx="30" cy="30" r="30"></circle>
                    <path d="M30.9603335,27.9575125 C30.9389551,24.5178993 31.0459797,21.075904 30.8700398,17.6380113 C30.8093571,16.4530057 30.5204173,16.1601291 29.3574875,15.8163001 C28.7804045,15.645709 28.1997363,15.5231588 27.6076486,15.4726035 C27.1245772,15.4314446 27.0986842,15.135127 27.1259051,14.7819016 C27.1523293,14.4367492 27.2738274,14.2248669 27.6994029,14.2523944 C29.66515,14.379312 31.6342167,14.4309261 33.6039473,14.3883114 C34.7316891,14.3638278 35.8588998,14.3074494 36.9858449,14.2574235 C37.2811584,14.2441891 37.5326529,14.2625849 37.4965355,14.6523371 C37.4666589,14.9745941 37.6400759,15.4021966 37.0791926,15.4606925 C36.550045,15.5158799 36.0517034,15.7069842 35.5392866,15.8259612 C34.8146796,15.99417 34.5507033,16.4557849 34.5310512,17.102284 C34.4868338,18.5568737 34.4705013,20.0125222 34.4565589,21.4679061 C34.4157939,25.7240799 34.4650571,29.9814449 34.2753075,34.2356336 C34.188599,36.1800274 34.0206262,38.1229655 33.1451756,39.892798 C31.921032,42.3676255 30.1648194,44.3641627 27.5259859,45.4139131 C26.1436955,45.9639336 24.7254204,46.0281203 23.3602592,45.3128025 C22.5557158,44.8912878 22.3675596,44.4628911 22.5820072,43.5748648 C22.7157215,43.0211387 22.9211397,42.4850143 23.0742407,41.9353909 C23.1710408,41.5875916 23.3080748,41.5493443 23.6255634,41.732905 C24.4461738,42.2076219 25.3100721,42.5871837 26.2262877,42.8579589 C28.461588,43.5187511 30.0673553,42.6173581 30.6307615,40.3665885 C30.8679152,39.4188752 30.9567483,38.4563393 30.9583417,37.4849365 C30.9636531,34.3090843 30.9603335,31.1333646 30.9603335,27.9575125" id="Fill-4" fill="#FEFEFE"></path>
                </g>
            </svg>
        </div>
        <div class="form">
            <div class="account">
                <input type="text" placeholder="Account" v-model="account">
            </div>
            <div class="password">
                <input type="password" placeholder="Password" v-model="password" autocomplete="new-password">
            </div>
            <div class="submit-btn">
                <button v-bind:class="{disabled:!formValid}" v-on:click="login()">Log in</button>
                <p>Forgot your password?</p>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
      name: 'login',
      computed: {
        formValid() {
            return this.account.trim() !== '' && this.password.trim() !== '';
        }
      },
      data() {
            return{
                account:'',
                password: ''
            }
        },
        created:function(){

        },
        methods: {
            login() {
                //if(this.formValid){
                    this.$store.commit('saveUser', 'test1234');
                    //this.$router.push('preference');
                    this.$router.push('index');
                //}
            }
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.login-container{
    .logo{
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
    }
    .form{
        padding: 0 0.38rem;
        .account,.password{
            width: 100%;
            height: 0.6rem;
            line-height: 0.6rem;
            input{
                height: 0.6rem;
                width: 100%;
                border-bottom: 0.01rem solid #ccc;
                font-size: 0.2rem;
                font-weight: 100;
            }
        }
        .submit-btn {
            text-align: center;
            padding: 0.4rem 0;
            button {
                border: 0;
                width: 2.2rem;
                height: 0.44rem;
                background-color: #222;
                border-radius: 0.2rem;
                text-align: center;
                color: #fff;
                font-size: 0.16rem;
                &.disabled{
                    background-color: #ccc;
                }
            }
            p{
                line-height: 0.4rem;
                color: #d8d8d8;
            }
        }
    }
}
</style>