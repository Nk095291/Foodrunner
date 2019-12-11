$('.login-form').on('submit',async function(e){
    e.preventDefault();
    let email = $('#lo-email')[0].value;
    let password = $('#lo-pass')[0].value;
    console.log(email);
    console.log(password);

    const result = await axios.post('/api/user/login',{
        email,password
    });
    // console.log(resul0t);
    alert(result.data.status);
    if(result.data.statusCode == "200")
    {
        location.assign("/")
    }
})
$('.register-form').on('submit',async function(e){
    e.preventDefault();
    let firstName = $('#firstName')[0].value;
    let lastName = $('#lastName')[0].value;
    let email = $("#re-email")[0].value;
    let password = $("#re-pass")[0].value;
    let confirmPassword = $("#re-conpass")[0].value;

    const result = await axios.post("/api/user/signUp", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    });

    alert(result.data.status);
    if(result.data.statusCode == "200")
    {
        location.assign("/");
    }
   
});

