<template>
    <div id="form">
        <demo-block>
            <div style="width:400px">
                <i-form :model="form1" ref="form1" :label-width="labelWidth" :rules="formRules">
                    <i-form-item label="性别:" prop="sex">
                        <i-select v-model="form1.sex">
                            <i-option label="男" value="1"></i-option>
                            <i-option label="女" value="2"></i-option>
                        </i-select>
                    </i-form-item>
                    <i-form-item label="城市:" prop="city_code">
                        <i-checkbox-group v-model="form1.city_code">
                            <i-checkbox v-for="item in city" :label="item.keyEn" :key="item.keyEn">{{item.keyCn}}
                            </i-checkbox>
                        </i-checkbox-group>
                    </i-form-item>
                    <i-form-item label="电话:" prop="phone">
                        <i-input v-model="form1.phone"></i-input>
                    </i-form-item>
                    <i-form-item label="是否抵押:" prop="pledge">
                        <i-radio-group v-model="form1.pledge">
                            <i-radio label="1">有</i-radio>
                            <i-radio label="0">无</i-radio>
                        </i-radio-group>

                    </i-form-item> 
                </i-form>
                <i-button @click.stop="submit">提交</i-button>
            </div>
        </demo-block>
    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labelWidth: "95px",
                city:[{keyEn:'310000',keyCn:'杭州市'},{keyEn:'310001',keyCn:'湖州市'},{keyEn:'310002',keyCn:'温州市'},{keyEn:'310003',keyCn:'嘉兴市'}],
                form1: {
                    sex: '',
                    city_code:[],
                    phone:'',
                    pledge:''
                },
                formRules: {
                    sex: [{
                        required: true,
                        trigger: 'change',
                        message: '请选择性别'
                    }],
                    city_code:[
                        {required: true, type:'array', trigger: 'change', message: '请选择城市'}
                    ],
                    phone:[
                        {required:true,trigger:'blur',message:'请输入手机号码'}
                    ]
                }
            };
        },
        methods: {
            submit() {
                this.$refs.form1.validate(valid => {
                    if (valid) {
    
                    }
                });
            }
        }
    };
</script>
