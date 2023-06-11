import React, {useContext} from 'react'
import AuthContext from './AuthContext'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        // <div>
        //     <form onSubmit={loginUser}>
        //         <input type="text" name="username" placeholder="Enter Username" />
        //         <input type="password" name="password" placeholder="Enter Password" />
        //         <input type="submit"/>
        //     </form>
        // </div>
        <div className='loginPage'>
        <div class="wrapper">
        <h2 class="title">تسجيل الدخول</h2>
    
        <form onSubmit={loginUser} >
            <div class="row">
                <i class="fas fa-user"></i>
                <input autoFocus={true} class="form-control" type="text" name="username" placeholder="الاسم" />
            </div>
            <div class="row">
                <i class="fas fa-lock"></i>
                <input class="form-control" type="password" name="password" placeholder="الرقم السري" />
            </div >
            <div class="row button">
            <input class="btn btn-primary" type="submit" value="سجل الدخول" />
        </div>
        <div class="signup-link">ليس لديك حساب؟ <a href="/register">قم بإنشاء حساب</a></div>
        </form>
       
    </div>
    </div>
    )
}

export default LoginPage