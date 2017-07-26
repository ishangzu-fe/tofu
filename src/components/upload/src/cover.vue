<template>
    <div class="i-dragger-cover" @click.stop v-if="image">
        <transition name="fade-in">
            <i-progress class="i-dragger-cover-progress"
                    v-if="image.status === 'uploading'"
                    :percentage="image.percentage"
                    :show-text="false"
                    :status="image.status === 'finished' ? 'success' : ''">
            </i-progress>
        </transition>
        <div class="i-dragger-cover-content"
                v-if="image.status === 'finished'"
                @mouseenter="mouseover = true"
                @mouseleave="mouseover = false"
        >
            <img :src="image.url">
            <transition name="fade-in">
                <div v-show="mouseover" class="i-dragger-cover-interact">
                    <div class="i-draggeer-cover-btns">
                        <span class="btn" @click="$parent.handleClick()"><i class="i-icon-upload2"></i><span>{{ $t('el.upload.continue') }}</span></span>
                        <span class="btn" @click="onPreview(image)" v-if="previewStatus"><i class="i-icon-view"></i><span>{{ $t('el.upload.preview') }}</span></span>
                        <span class="btn" @click="onRemove(image)"><i class="i-icon-delete2"></i><span>{{ $t('el.upload.delete') }}</span></span>
                    </div>
                </div>
            </transition>
            <transition name="md-fade-top">
                <h4 v-show="mouseover" class="i-dragger-cover-title">{{image.name}}</h4>
            </transition>
        </div>
    </div>
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
            image: {},
            onPreview: {
                type: Function,
                default: function() {}
            },
            onRemove: {
                type: Function,
                default: function() {}
            },
            previewStatus:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                mouseover: false
            };
        }
    };
</script>
