const btnSubmit = document.querySelector('#submit');
btnSubmit.addEventListener('click',()=>{
    console.log(btnSubmit.innerHTML)
    if(btnSubmit.innerHTML === 'Result'){

        btnSubmit.innerHTML= 'Again';
    }else{
        btnSubmit.innerHTML='Result';
    }
})