<template>
    <transition-group tag="ul" class="i-upload-files" name="list">
        <li v-for="file in files"
            class="i-upload-file"
            :class="{'is-finished': file.status === 'finished'}"
            :key="file"
            @click="$emit('clickFile', file)">
            <a class="i-upload-file-name" @click="$emit('preview', file)">
                <i class="i-icon-document"></i>{{file.name}}
            </a>
            <span class="i-upload-btn-delete" @click="$emit('remove',file)" v-show="file.status === 'finished'">{{ $t('el.upload.delete') }}</span>
            <i-progress v-if="file.showProgress"
                         :stroke-width="2"
                         :percentage="parsePercentage(file.percentage)"
                         :status="file.status === 'finished' && file.showProgress ? 'success' : ''">
            </i-progress>
        </li>
    </transition-group>
</template>
<script>
    import Locale from '../../../mixins/locale';
    import Progress from '../../progress';

    export default {
        mixins: [Locale],
        components:{
            'i-progress':Progress
        },
        props: {
            files: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        methods: {
            parsePercentage(val) {
                return parseInt(val, 10);
            }
        }
    };
</script>
