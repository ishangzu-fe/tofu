<template>
    <div>
        <i-button @click="drawerStatus = true">show</i-button>
        <i-drawer v-model="drawerStatus"  title="text" :show-full="true">
            <div>
                <i-button @click.stop="dialogStatus = true">open dialog</i-button>
                <i-dialog v-model="dialogStatus" size="small" title="ffff">
                    <div>this is dialog</div>
                    <span slot="footer">
                        <i-button>确定</i-button>
                    </span>
                </i-dialog>
            </div>
            <span slot="footer">
                <i-button type="primary" >提交</i-button>
            </span>
        </i-drawer>
    </div>
</template>
<script>
export default {
    data(){
        return {
            drawerStatus:false,
            dialogStatus:false
        }
    }
}
</script>

