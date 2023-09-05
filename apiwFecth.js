let modalReg = new bootstrap.Modal(document.getElementById("regUser"), {});
let modalUp = new bootstrap.Modal(document.getElementById("regUpdate"), {});


const getUsers = () => {
    fetch("https://reqres.in/api/users",{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          }})
    .then(res => res.json())
    .then(data => {
        
        let users = ""
        data.data.forEach(user => {
            users += `
                <tr>
                    <td>${user.id}</td>
                    <td><img src='${user.avatar}'/></td>
                    <td>${user.first_name + ' ' + user.last_name}</td>
                    <td>${user.email}</td>
                    <td><button type='button' class='btn btn-primary'  onclick='getUser(${user.id})'>Add</button></td>
                    <td><button type='button' class='btn btn-danger'  onclick='delUsers(${user.id})'>Del</button></td>
                </tr>
            `
        });

        document.getElementById('tbody').innerHTML = users
    })
}

const regUsers = () =>{
    let user = {
        first_name: document.getElementById('name').value,
        last_name: document.getElementById('lastn').value,
        email: document.getElementById('email').value,
        avatar:document.getElementById('avatar').value
    }

    
    fetch('https://reqres.in/api/users',{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
          }
        })
    .then(res => {
        modalReg.hide()
        if(res.status === 201){
            Swal.fire({
                title: 'Usuario registrado',
                icon: 'success',
                showDenyButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500
              })
              getUsers()
        }else{
            Swal.fire({
                title: 'Error al registrar',
                icon: 'error',
                showDenyButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500
              })   
        }
    })
}

const getUser = (idUser) =>{
    
    
    fetch('https://reqres.in/api/users/'+idUser)
    .then(res => res.json())
    .then(data =>{
        document.getElementById('idUser').value = data.data.id,
        document.getElementById('nameU').value = data.data.first_name,
        document.getElementById('lastnU').value = data.data.last_name,
        document.getElementById('emailU').value = data.data.email,
        document.getElementById('avatarU').value = data.data.avatar

        modalUp.show()
    })
}

const updateUsers = () =>{
    let user = {
        first_name: document.getElementById('nameU').value,
        last_name: document.getElementById('lastnU').value,
        email: document.getElementById('emailU').value,
        avatar:document.getElementById('avatarU').value
    }

    fetch('https://reqres.in/api/users/'+document.getElementById('idUser').value,{
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
          }
        })
    .then(res =>  {
        modalUp.hide()
        if(res.status === 200){
            Swal.fire({
                title: 'Usuario modificado',
                icon: 'success',
                showDenyButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500
              })
              getUsers()
        }else{
            Swal.fire({
                title: 'Error al actualizar',
                icon: 'error',
                showDenyButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500
              })   
        }
    }).then(res => console.log(res))
}

const delUsers = (idUser) =>{


    fetch('https://reqres.in/api/users/' + idUser,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
          }
        })
    .then(res =>     {
        if(res.status == 204){
            Swal.fire({
                title: 'Usuario eliminado',
                icon: 'success',
                showDenyButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500
              })
              getUsers()
        }else{
            Swal.fire({
                title: 'Error al eliminar',
                icon: 'error',
                showDenyButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500
              })   
        }
        
    }  )

    
}