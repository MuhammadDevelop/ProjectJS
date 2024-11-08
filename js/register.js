let $inputName = document.querySelector('.name')
let $inputEmail = document.querySelector('.email')
let $inputPassword = document.querySelector('.pasword')
let $btn = document.getElementById("btn")
let $form = document.querySelector(".registerForm")



function nextPage(data){
  console.log(data);  
if(data.username !==""&& data.password  !== ""){

    alert("Waiting you nextPage!")
   location.replace(location.origin + "/body.html")
    
}else{
alert("Something went wrong")

}
localStorage.getItem("date")

}
const getInputsValue = function(e){
    e.preventDefault()
    const name = "mor_2314";
    
    const password = "83r5^_";
    
    
  try{
    fetch("https://fakestoreapi.com/auth/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            username:name.trim(),
            password:password.trim()
        })
       })
    .then(res=>res.json())
    .then(data=>{
        localStorage.setItem("date",JSON.stringify(data))
        nextPage(data)
    })
    
  }catch(error){
    alert(error)
  }
 $form.reset()

    }
$form.addEventListener("submit",getInputsValue)
