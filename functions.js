const userId = document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');

const database = firebase.database();
const rootRef = database.ref('users');

addBtn.addEventListener('click', function(e){
    e.preventDefault();
    const audoId = rootRef.push().key
    rootRef.child(userId.value).set({
        first_name: firstName.value,
        last_name: lastName.value,
        age: age.value
    });
});

updateBtn.addEventListener('click', function(e){
    e.preventDefault();
    const newData = {
        age: age.value,
        first_name: firstName.value,
        last_name: lastName.value
    };

    const updates = {};
    updates['/users/' + userId.value] = newData;
    rootRef.child(userId.value).update(newData);
});

removeBtn.addEventListener('click', e => {
    e.preventDefault();
    rootRef.child(userId.value).remove()
    .then(() => {
        window.alert("User removed from datbase !");
    })
    .catch(error => {
        console.error(error);
    });
});

/** 
 * This callback funtciion
 * child_added
 * child_changed
 * child_removed
 * value : any value change, but run before the click event of the above function
**/
// rootRef.on('child_added', snapshot => {
//     console.log('Child(s) added');
// });

// rootRef.once('child_changed', snapshot => {
//     console.log('Child(s) added');
// });

// add callback action for a sepecial value 
// rootRef.child(0).once('child_changed', snapshot => {
//     console.log('an event occured on the database');
// });

// add callback action for a sepecial value 
// rootRef.child(0).once('child_changed', snapshot => {
//     console.log(snapshot.val());
// });

// rootRef.orderByKey().on('value', snapshot => {
//     console.log(snapshot.val());
// });

// rootRef.orderByKey().limitToFirst(2).on('value', snapshot => {
//     console.log(snapshot.val());
// });

// rootRef.orderByKey().limitToLast(2).on('value', snapshot => {
//     console.log(snapshot.val());
// });

// rootRef.orderByChild('age').limitToFirst(2).on('value', snapshot => {
//     console.log(snapshot.val());
// });

rootRef.orderByChild("first_name").equalTo("Nhat").on('value', snapshot => {
    console.log(snapshot.val());
});
 // endat deprecated use limitToFirst 
