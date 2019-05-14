<template>
    <div>
        <i-button @click="drawerStatus = true">show</i-button>
        <i-drawer v-model="drawerStatus" width="500px"  title="text">
            <div>
                <i-button @click.stop="dialogStatus = true">open dialog</i-button>
                <i-dialog v-model="dialogStatus" title="ffff"></i-dialog>
            </div>
            <span slot="footer">
                <i-button type="primary">提交</i-button>
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

