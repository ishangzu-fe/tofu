<template lang="html">
    <vvc-dropdown :config="config.dpConfig">
        <panel-user :config="config.panelConfig"></panel-user>
    </vvc-dropdown>
</template>

<script>
import Dropdown from './dropdown'
import PanelUser from './panel_user'

export default {
    props: {
        config: {
            require: true,
            validator () {
                return true
                // {
                //      dpConfig: {
                //          trigger
                //      },
                //
                //      panelConfig: {
                //          avatar,
                //          name,
                //          phone
                //      }
                // }
            }
        }
    },

    components: {
        'vvc-dropdown': Dropdown,
        'panel-user': PanelUser
    }
}
</script>

<style lang="scss">
</style>
