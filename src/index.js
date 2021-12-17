document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => renderTable(dog)))
})

// function newFetch(){
//     fetch('http://localhost:3000/dogs')
//     .then(res => res.json())
//     .then(dogs => dogs.forEach(dog => renderTable(dog)))
// }


function renderTable(dog){
    const tableBody = document.querySelector('#table-body');
    const tr = document.createElement('tr');
    const btn = document.createElement('button');
    btn.innerText = 'Edit Dog'
    tr.className = dog.name;
    tr.id = dog.id;

    tableBody.appendChild(tr)
    tr.insertCell(0).innerText = dog.name
    tr.insertCell(1).innerText = dog.breed
    tr.insertCell(2).innerText = dog.sex
    tr.insertCell(3).appendChild(btn)

    btn.addEventListener('click', (e)=> {
        let selectedDog = e.target.parentElement.parentElement;
        const dogForm = document.querySelector('#dog-form');
        // console.log(selectedDog.id)

        dogForm.addEventListener('submit', (ev)=>{
            ev.preventDefault();
            let inputName = ev.target[0].value;
            let inputBreed = ev.target[1].value;
            let inputSex = ev.target[2].value;
            // console.log(selectedDog.id)
            
            fetch(`http://localhost:3000/dogs/${selectedDog.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: inputName,
                    breed: inputBreed,
                    sex: inputSex,
                })
            })
            .then(res => res.json())
            .then(dog => renderTable(dog))

        })
    })

}

