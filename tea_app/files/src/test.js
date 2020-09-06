import React from 'react';

function Test(){

    return(
        <div>
            
            {/* <!doctype html> */}
            <html>
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

                <title>Hello World</title>

                {/* <!-- Fonts --> */}
                <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700,800|Roboto:400,500,700" rel="stylesheet"/> 

                {/* <!-- Boomerang CSS (including Bootstrap) --> */}
                <link type="text/css" href="./assets/css/theme.css" rel="stylesheet"/>

                {/* <!-- Demo CSS - No need to use these in your project --> */}
                <link type="text/css" href="./assets/css/demo.css" rel="stylesheet"/>
            </head>
            <body>
                <main class="main">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <select class="selectpicker">
                                <option>http://</option>
                                <option>https://</option>
                            </select>
                        </div>
                        <input type="text" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <input type="text" class="form-control"/>
                        <div class="input-group-append">
                            <select class="selectpicker">
                                <option>.com</option>
                                <option>.net</option>
                                <option>.ro</option>
                            </select>
                        </div>
                    </div>
                </div>
                </main>

                {/* <!-- Core --> */}
                <script src="./assets/vendor/jquery/jquery.min.js"></script>
                <script src="./assets/vendor/popper/popper.min.js"></script>
                <script src="./assets/js/bootstrap/bootstrap.min.js"></script>
                {/* <!-- FontAwesome 5 --> */}
                <script src="./assets/vendor/fontawesome/js/fontawesome-all.min.js" defer></script>
                {/* <!-- Page plugins --> */}
                <script src="./assets/vendor/bootstrap-select/js/bootstrap-select.min.js"></script>
                <script src="./assets/vendor/bootstrap-tagsinput/bootstrap-tagsinput.min.js"></script>
                <script src="./assets/vendor/input-mask/input-mask.min.js"></script>
                <script src="./assets/vendor/nouislider/js/nouislider.min.js"></script>
                <script src="./assets/vendor/textarea-autosize/textarea-autosize.min.js"></script>

                

                {/* <!-- Boomerang JS --> */}
                <script src="/assets/js/theme.js"></script>
            </body>
            </html>
        </div>
    );
}

export default Test;