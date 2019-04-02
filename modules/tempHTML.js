const thankYou = `<script type="text/javascript">   
    function Redirect() 
    {  
        window.location="/login"; 
    } 
    document.write("<br><br><br><h1 style='text-align:center;'><strong style='color:dodgerblue'>Thank you for registering.</strong>You will be redirected to the login page in 5 seconds</h1>"); 
    setTimeout('Redirect()', 5000);   
    </script>`

exports.thankYou = thankYou;