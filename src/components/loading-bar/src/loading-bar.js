module.exports = {
    name: "LoadingBar",
    props: {
        id: String,
        customClass: String,
        progress: {
            type: Number,
            default: 0
        },
        direction: {
            type: String,
            default: "right"
        },
        error: Boolean, // Loading Bar error state
        onErrorDone: {
            type: Function,
            default: function () {

            }
        },
        onProgressDone: {
            type: Function,
            default: function () {

            }
        },
    },
    data() {
        return {
            show: true,
            full: '',
            width: 0,
            wait: false,
            myError: false
        }
    },
    render(h) {
        let {
            direction, customClass, id,
            width, show, full, myError,
            styling } = this

        return(
            <div>
                { show ?
                    <div
                        id={ id ? id : null }
                        class={
                            'el-loading-bar el-loading-bar-to-' + direction + ' ' +
                            ( customClass ? customClass : '' ) +
                            ( myError ? 'el-loading-bar-error' : '' ) +
                            ( full ? 'el-loading-bar-full' : '')
                        }
                        style={ styling() }>
                        <div class="el-loading-bar-glow"></div>
                    </div>
                    : null }
            </div>
        )
    },
    watch:{
        progress(val,old){
            if(old !== val){
                this.width = val
                setTimeout(() => {
                    this.isFull()
                })
            }
        },

        error(val,old){
            if(old !== val) {
                if(val) {
                    this.width = 100
                    this.myError = true
                    setTimeout(() => {
                        this.isFull()
                    })
                }
            }
        }

    },

    methods: {
        isFull() {
            let isFull = this.width === 100
            if(isFull){
                this.wait = true

                setTimeout(() => {

                    this.full = true
                    this.myError = false

                    this.onErrorDone()

                    setTimeout(() => {
                        this.show = false
                        this.width = 0
                        this.wait = false

                        setTimeout(() => {

                            this.full = ''
                            this.show = true

                            this.onProgressDone()

                        });

                    },250);

                },700);
            }
        },

        styling(){
            if(!this.wait){
                return { width: `${this.width}%` };
            }else{
                return{ width: `100%` };
            }
        }
    }

};
