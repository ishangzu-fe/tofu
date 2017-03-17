import 'isomorphic-fetch';

const util = {
    getParam(params){
        let result = '';
        for(let item in params){
            if(params[item]){
                result += item + '=' + params[item] + '&';
            }
        }

        result = result.substring(0, result.lastIndexOf('&'));
        if(result){
            result = '?' + result;
        }
        return result;
    },
    getFormData(params){
        let formData = new FormData();
        for(let item in params){
            formData.append(item,params[item]);
        }

        return formData
    },
    send(url,config){
        return fetch(url,config).then(res => {
            return res.json();
        }).then(data => {
            window['sessionFlg'] = window['sessionFlg'] || 'Y';
            if((data.code == 201 || data.code == 200) && sessionFlg == 'Y'){
                sessionFlg = 'N';
                alert('用户已失效，请重新登录！');
                window.location.href = 'http://sys.ishangzu.com';
                return;
            }else if(data.code == 0){
                sessionFlg = 'Y';
            }
            return data;
        }).catch((err)=>{
            return err;
        });
    },
    restful(url,params,method) {
        const config = {
            method:method,
            credentials:'include',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}

        }
        if(method == 'get' && params){
            url  = url  + util.getParam(params)
        }else{
            config['body'] = JSON.stringify(params)
        }
        return util.send(url,config);
    }
}

export default {
    $get(url,params){
        return util.restful(url,params,'get');
    },
    $post(url,params){
        return util.restful(url,params,'post');
    },
    $put(url,params){
        return util.restful(url,params,'put');
    },
    $delete(url,params){
        return util.restful(url,params,'delete');
    }
}
