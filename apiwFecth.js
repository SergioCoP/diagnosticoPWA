const getUsers = () => {
    fetch("https://reqres.in/api/users")
    .then(res => res.json())
    .then(data => {
        
        let users = ""
        data.data.forEach(user => {
            users += `
                <tr>
                    <td>${user.id}</td>
                    <td><img src='${user.avatar}'/></td>
                    <td>${user.first_name + user.last_name}</td>
                    <td>${user.email}</td>
                    <td><button type='button' class='btn btn-primary' iduser='${user.id}' onclick='getUser()'
                </tr>
            `
        });

        document.getElementById('tbody').innerHTML = users
        console.log(data)
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
    .then(res => res.json())
    .then(data => console.log(data))
}

const getUser = (idUser) =>{
    var myModal = new bootstrap.Modal(document.getElementById("regUpdate"), {});
    
    fetch('https://reqres.in/api/users/'+idUser)
    .then(res => res.json())
    .then(data =>{
        document.getElementById('idUser').value = res.id,
        document.getElementById('nameU').value = res.first_name,
        document.getElementById('lastnU').value = res.last_name,
        document.getElementById('emailU').value = res.email,
        document.getElementById('avatarU').value = res.avatar

        myModal.show()
    })
}

const updateUsers = () =>{
    let user = {
        id: document.getElementById('idUser').value,
        first_name: document.getElementById('nameU').value,
        last_name: document.getElementById('lastnU').value,
        email: document.getElementById('emailU').value,
        avatar:document.getElementById('avatarU').value
    }


    fetch('https://reqres.in/api/users',{
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
          }
        })
    .then(res => res.json())
    .then(data => console.log(data))
}

const delUsers = (idUser) =>{


    fetch('https://reqres.in/api/users' + idUser,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
          }
        })
    .then(res => res.json())
    .then(data => console.log(data))
}