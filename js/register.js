let $inputName = document.querySelector('.name')
let $inputEmail = document.querySelector('.email')
let $inputPassword = document.querySelector('.pasword')
let $btn = document.getElementById("btn")
let $form = document.querySelector(".registerForm")



function nextPage(data){
  console.log(data);  
if(data.name !==""&& data.email !== ""&&data.password  !== ""){
    alert("Waiting you nextPage!")
}else{
alert("Something went wrong")
}
}
const getInputsValue = function(){
    const name = $inputName.value;
    const email = $inputEmail.value;
    const password = $inputPassword.value;
    console.log(name,email,password)
    $form.reset()
   fetch("https://6729a8966d5fa4901b6dd71c.mockapi.io/api/register/register",{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body: JSON.stringify({
        username: $inputName.value.trim(),
        email:$inputEmail.value.trim(),
        password:$inputPassword.value.trim()
    })
   })
.then(res=>res.json())
.then(data=>nextPage(data))
    }
$form.addEventListener("submit",getInputsValue)
