import Services from 'services';

const Login = {
    authLogin(params){
        return Services.$post('/isz_base/LoginController/auth.action',params);
    },
    logout () {
        return Services.$get('/isz_base/LoginController/logout.action')
    }
}

export default Login;
