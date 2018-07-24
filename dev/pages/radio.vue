<template>
    <div id="checkbox">
        <!-- <i-form> -->
            <!-- <i-form-item> -->
                <i-radio-group v-model="list.audit_option_ids">
                        <div v-for="opt in list.option_list" class="row-item" :key="opt.option_id">
                            <i-radio :label="opt.option_id.toString()">{{opt.option_name}}</i-radio>
                            <div v-if="opt.supplement_subject_id > 0 && list.audit_option_ids == opt.option_id.toString()" class="row-child-item">
                                <i-radio-group v-if="opt.supplement_subject.subject_type == 'RADIO'" v-model="opt.supplement_subject.audit_option_ids">
                                    <div v-for="list in opt.supplement_subject.option_list" :key="list.option_id" class="row-item">
                                        <i-radio :label="list.option_id.toString()">{{list.option_name}}</i-radio>
                                        <template v-if="opt.supplement_subject.option_ids == list.option_id && list.option_type == 'INPUT'">
                                            <i-input v-model="list.answer_value"></i-input>
                                        </template>
                                    </div>
                                </i-radio-group>
                                <i-checkbox-group v-if="opt.supplement_subject.subject_type == 'CHECKBOX'" v-model="opt.supplement_subject.audit_option_array">
                                    <div v-for="list in opt.supplement_subject.option_list" :key="list.option_id" class="row-item">
                                        <i-checkbox :label="list.option_id.toString()">{{list.option_name}}</i-checkbox>
                                        <template v-if="opt.supplement_subject.audit_option_array.indexOf(list.option_id.toString()) > -1 && list.option_type == 'INPUT'">
                                            <i-input v-model="list.answer_value"></i-input>
                                        </template>
                                    </div>
                                </i-checkbox-group>
                                <i-input v-if="opt.supplement_subject.subject_type == 'INPUT'" v-model="opt.supplement_subject.audit_answer_value"></i-input>
                            </div>
                        </div>
                    </i-radio-group>
            <!-- </i-form-item> -->
        <!-- </i-form> -->
        <div>{{JSON.stringify(list)}}</div>
    </div>
</template>
<script>
    import data from '../data/radio.json';
    export default {
        data(){
            return {
                list:data
            }
        },
        methods:{
           
        }
    }
</script>
<style lang="scss" scoped>
    .row-child-item{
         margin-left: 30px;

    }
</style>
