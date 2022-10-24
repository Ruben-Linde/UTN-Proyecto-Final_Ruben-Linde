// get elements
const streakTimeInterval = document.querySelector('.streakTimeInterval');
const customInterval = document.querySelector('.customInterval');
const rachasContainer = document.querySelector('.secret-rachas');

// Get all records of all users
const getAllData = async () => {
   return await fetch('/users/findall')
   .then((response) => response.json())
   .then((data) =>{

      data.forEach((value, _)=>{
         const wrapper = document.createElement('div');
         wrapper.classList.add("wrapper");

         const leftColumn = document.createElement('div');
         leftColumn.classList.add("leftColumn");
         // REFACTORY ----------------------------------------------
         // si se alcanza la meta se agrega una clase para iluminar leftColumn
         if(value.amount == value.partialHits){
            leftColumn.classList.add("taskSuccess");
         }
         // END REFACTORY ------------------------------------------


         const rightColumn = document.createElement('div');
         rightColumn.classList.add("rightColumn");

         wrapper.append(leftColumn);
         wrapper.append(rightColumn);
         rachasContainer.append(wrapper);


         // creo la lista
         let ulElm = document.createElement('ul');
         ulElm.classList.add('cards');

         // REFACTORY ----------------------------------------------
         // si se alcanza la meta se agrega una clase para iluminar la lista
         if(value.amount == value.partialHits){
            ulElm.classList.add("taskSuccess");
         }
         // END REFACTORY ------------------------------------------
         // ulElm.id = value._id;

         let elmName = document.createElement('li');
         elmName.innerHTML= '<span class="label"> Nombre: </span>' + value.name;
         ulElm.append(elmName);

         let elmCreatedAt = document.createElement('li');
         elmCreatedAt.innerHTML= '<span class="label">Fecha de inicio: </span>' + value.createdAt;
         ulElm.append(elmCreatedAt);

         // REFACTORY ----------------------------------------------
         // Agregamos frecuecia
         let elmUnitInterval = document.createElement('li');
         elmUnitInterval.innerHTML= '<span class="label">Frecuencia: </span><i>' + value.unitInterval + '</i>';
         ulElm.append(elmUnitInterval);
         // END REFACTORY ------------------------------------------

         let elmAmount = document.createElement('li');
         elmAmount.innerHTML= '<span class="label">Veces a repetir: </span>' + value.amount;
         ulElm.append(elmAmount);

         let elmCounter = document.createElement('li');

         // REFACTORY ----------------------------------------------
         // elmCounter.innerHTML= '<span class="label">Progreso: </span>' + value.partialHits  + " / " + value.goalHits; 
          // se cambio goalHits (que se utilizaria en el futuro para valuar los intentos fallidos), por amount el total de pruebas
         elmCounter.innerHTML= '<span class="label">Progreso: </span>' + value.partialHits  + " / " + value.amount; 
         // END REFACTORY ------------------------------------------

         ulElm.append(elmCounter);


         // agreo el checkbox y el label
         let elmLbl = document.createElement('label');
         elmLbl.innerHTML = 'Cumpli con el desafio: ';

         let elmCheck = document.createElement('li');
         let elmCheckButton = document.createElement('input');
         elmCheckButton.type = 'checkbox';
         elmCheckButton.id = value._id;

         // REFACTORY
         // si se alcanza la meta se desabilita y oculta el checkbox 
         // se cambia el texto del label a Racha Completa
         if(value.amount == value.partialHits){
            elmCheckButton.disabled = true;
            elmCheckButton.style.visibility = 'hidden';
            elmLbl.innerHTML = '<b>Racha Completa!</b>';
         }else{
            elmCheckButton.disabled = false; 
         } 
         // END REFACTORY
         
         elmCheck.append(elmCheckButton)
         elmLbl.innerHTML = elmLbl.innerHTML + " " + elmCheck.innerHTML;
         ulElm.append(elmLbl);
         // END REFACTORY

         // agrego la lista al contenedor
         leftColumn.append(ulElm)

         const ck = document.getElementById(value._id);

         ck.addEventListener('change', (event) => {
            if (event.target.checked) {
               const changeTo = value.partialHits + 1;
               //navego hacia update
               const update = {
                  partialHits: changeTo,
                  _id: value._id,
               };
               const options = {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(update),
               };

               fetch('/users/update', options)
               .then(data => {
                  if (!data.ok) {
                     throw Error(data.status);
                  }
                  return data.json();
               })
               .then(update => {
                  // console.log(update);
                  //refrescar
                  document.location.reload();
               });
            }
         })

         // Delete button
         let elmDeleteButton = document.createElement('input');
         elmDeleteButton.type = 'button';
         elmDeleteButton.id = '_'+value._id;
         elmDeleteButton.value = 'Eliminar';
         rightColumn.append(elmDeleteButton);

         // listener para delete
         const dl = document.getElementById('_'+ value._id);

         dl.addEventListener('click', (event) => {

            const deleteData = {
               _id: value._id,
            };

            const options = {
               method: 'DELETE',
               headers: {
               'Content-Type': 'application/json',
               },
               body: JSON.stringify(deleteData),
            };

            fetch('/users/delete', options)
            .then(data => {
               if (!data.ok) {
                  throw Error(data.status);
               }
               return data.json();
            })
            .then(deleteInfo => {
               // console.log(deleteInfo);
               //refrescar
               document.location.reload();
            });
         })

      })
   });  // todas las rachas
};
// const myResult = getAllData();


// REFACTORY ----------------------------------
// Para recibir solo las rachas del usuario
const getUserRecords = async (uid) => {
   return await fetch('/users/records/' + uid)
   .then((response) => response.json())
   .then((data) =>{

      data.forEach((value, _)=>{
         const wrapper = document.createElement('div');
         wrapper.classList.add("wrapper");

         const leftColumn = document.createElement('div');
         leftColumn.classList.add("leftColumn");
         // REFACTORY ----------------------------------------------
         // si se alcanza la meta se agrega una clase para iluminar leftColumn
         if(value.amount == value.partialHits){
            leftColumn.classList.add("taskSuccess");
         }
         // END REFACTORY ------------------------------------------


         const rightColumn = document.createElement('div');
         rightColumn.classList.add("rightColumn");

         wrapper.append(leftColumn);
         wrapper.append(rightColumn);
         rachasContainer.append(wrapper);


         // creo la lista
         let ulElm = document.createElement('ul');
         ulElm.classList.add('cards');

         // REFACTORY ----------------------------------------------
         // si se alcanza la meta se agrega una clase para iluminar la lista
         if(value.amount == value.partialHits){
            ulElm.classList.add("taskSuccess");
         }
         // END REFACTORY ------------------------------------------
         // ulElm.id = value._id;

         let elmName = document.createElement('li');
         elmName.innerHTML= '<span class="label"> Nombre: </span>' + value.name;
         ulElm.append(elmName);

         let elmCreatedAt = document.createElement('li');
         elmCreatedAt.innerHTML= '<span class="label">Fecha de inicio: </span>' + value.createdAt;
         ulElm.append(elmCreatedAt);

         // REFACTORY ----------------------------------------------
         // Agregamos frecuecia
         let elmUnitInterval = document.createElement('li');
         elmUnitInterval.innerHTML= '<span class="label">Frecuencia: </span><i>' + value.unitInterval + '</i>';
         ulElm.append(elmUnitInterval);
         // END REFACTORY ------------------------------------------

         let elmAmount = document.createElement('li');
         elmAmount.innerHTML= '<span class="label">Veces a repetir: </span>' + value.amount;
         ulElm.append(elmAmount);

         let elmCounter = document.createElement('li');

         // REFACTORY ----------------------------------------------
         // elmCounter.innerHTML= '<span class="label">Progreso: </span>' + value.partialHits  + " / " + value.goalHits; 
          // se cambio goalHits (que se utilizaria en el futuro para valuar los intentos fallidos), por amount el total de pruebas
         elmCounter.innerHTML= '<span class="label">Progreso: </span>' + value.partialHits  + " / " + value.amount; 
         // END REFACTORY ------------------------------------------

         ulElm.append(elmCounter);


         // agreo el checkbox y el label
         let elmLbl = document.createElement('label');
         elmLbl.innerHTML = 'Cumpli con el desafio: ';

         let elmCheck = document.createElement('li');
         let elmCheckButton = document.createElement('input');
         elmCheckButton.type = 'checkbox';
         elmCheckButton.id = value._id;

         // REFACTORY
         // si se alcanza la meta se desabilita y oculta el checkbox 
         // se cambia el texto del label a Racha Completa
         if(value.amount == value.partialHits){
            elmCheckButton.disabled = true;
            elmCheckButton.style.visibility = 'hidden';
            elmLbl.innerHTML = '<b>Racha Completa!</b>';
         }else{
            elmCheckButton.disabled = false; 
         } 
         // END REFACTORY
         
         elmCheck.append(elmCheckButton)
         elmLbl.innerHTML = elmLbl.innerHTML + " " + elmCheck.innerHTML;
         ulElm.append(elmLbl);
         // END REFACTORY

         // agrego la lista al contenedor
         leftColumn.append(ulElm)

         const ck = document.getElementById(value._id);

         ck.addEventListener('change', (event) => {
            if (event.target.checked) {
               const changeTo = value.partialHits + 1;
               //navego hacia update
               const update = {
                  partialHits: changeTo,
                  _id: value._id,
               };
               const options = {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(update),
               };

               fetch('/users/update', options)
               .then(data => {
                  if (!data.ok) {
                     throw Error(data.status);
                  }
                  return data.json();
               })
               .then(update => {
                  // console.log(update);
                  //refrescar
                  document.location.reload();
               });
            }
         })

         // Delete button
         let elmDeleteButton = document.createElement('input');
         elmDeleteButton.type = 'button';
         elmDeleteButton.id = '_'+value._id;
         elmDeleteButton.value = 'Eliminar';
         rightColumn.append(elmDeleteButton);

         // listener for delete
         const dl = document.getElementById('_'+ value._id);

         dl.addEventListener('click', (event) => {

            const deleteData = {
               _id: value._id,
            };

            const options = {
               method: 'DELETE',
               headers: {
               'Content-Type': 'application/json',
               },
               body: JSON.stringify(deleteData),
            };

            fetch('/users/delete', options)
            .then(data => {
               if (!data.ok) {
                  throw Error(data.status);
               }
               return data.json();
            })
            .then(deleteInfo => {
               // console.log(deleteInfo);
               //refrescar
               document.location.reload();
            });
         })

      })
   });  // todas las rachas
};

let uid = document.querySelector('.userRef').value
getUserRecords(uid)
// END REFACTORY ----------------------------------

streakTimeInterval.addEventListener('change', (e)=>{
   if( e.target.value == 8){
      customInterval.classList.toggle('customBlock')
   } 
})