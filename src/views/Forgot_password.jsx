import React from 'react'


const Forgot_password = () => {
    return (
        <div>
             <section class="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
            <div class="container">
                <div class="row justify-content-center form-bg-image" data-background-lg="assets/img/illustrations/signin.svg">
                    <p class="text-center"><a href="./login" class="d-flex align-items-center justify-content-center">
                        <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                        Back to log in
                        </a>
                    </p>

                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <div class="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div class="text-center text-md-center mb-4 mt-md-0">
                                <h1 class="mb-0 h3">Reset Password</h1>
                            </div>
                            <form action="#" class="mt-4">
                                
                                <div class="form-group mb-4">
                                    <label for="email">Enter your Email</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1">
                                            <svg class="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                        </span>
                                        <input type="email" class="form-control" placeholder="example@company.com" id="email" autofocus required/>
                                    </div>  
                                </div>
                                <div class="d-grid">
                                <button type="submit" className="btn btn-primary">Reset Password</button>
                                    {/* <a type="submit" href="index.php" class="btn btn-gray-800">Reset Password</a> */}
                                </div>
                            </form>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>

    )
}
export default Forgot_password