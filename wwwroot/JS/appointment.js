//code for disable the dates
/*var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var mmmax = mm + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
if (mmmax < 10) {
    mmmax = '0' + mmmax
}
if (mmmax > 12) {
    mmmax = 0
}

today = yyyy + '-' + mm + '-' + dd;
if (dd > 23) {
    dd = 23 
} 
today1 = yyyy + '-' + mmmax + '-' + dd;
document.getElementById("app-date").setAttribute("min", today);
document.getElementById("app-date").setAttribute("max", today1);*/







let doctors = [];
let patients = [];

/*var Pid = [];
var Did = [];*/



const getpatienturi = '/api/Patients';

function getPatients() {
  
    fetch(getpatienturi, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => assignpatientValue(data))
        .catch(error => console.error('Unable to get patients.', error));
}


async function assignpatientValue(data) {
    /*await data.forEach(patient => {
        if (patient.email === email) {
            Pid.push(patient.id);
            console.log("Pid ", Pid);
        }
        patients.push(patient);
    });*/
    patients = data;
    console.log("At method patient : ", patients);
    getDoctors();
}


const getdoctoruri = '/api/Doctors';
function getDoctors() {
    console.log("Get doctor executed");
    fetch(getdoctoruri, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => assigndoctorValue(data))
        .catch(error => console.error('Unable to get doctors.', error));
}

async function assigndoctorValue(data) {
    /*await data.forEach(doctor => {
        doctors.push(doctor);
    });*/
    doctors = data;
    console.log("At method doctor : ", doctors);
    addAppointment();
}


const uri = '/api/Appointments';

function addAppointment() {

    const email1 = document.getElementById('patientmail');
    const date = document.getElementById('app-date');
    const department = document.querySelector('#department');
    const timeslot = document.querySelector('#time-slot');

    /*console.log(email1.value.trim());*/

   /* getPatients(email1.value.trim());*/

   /* console.log("here");*/
 /*   console.log("Pid ", Pid);*/
    console.log(patients);

    /*for (i = 0; i < patients.length; i++) {
        for (var x in patients[i]) {
            console.log(x + " => " + patients[i][x]);
        }
    }*/

    patients.forEach(patient => console.log(patient));
   /* getDoctors(); */

    /*const patient = patients.find(patient => patient.email === email.value.trim());*/

    var patient1 = null; 
    console.log("before"); 

    patients.forEach(patient => {
        console.log("middle");
            
        if (patient.email === email1.value.trim()) {
            patient1 = patient;
        }
    });
    console.log("after");

    var doctor1 = null;
    /*console.log("before");*/

    doctors.forEach(doctor => {
        /*console.log("middle");*/

        if (doctor.department === department.value.trim()) {
            doctor1 = doctor;
        }
    });
    /*console.log("after");*/
 

    /*const doctor = doctors.find(doctor => doctor.department === department.value.trim());*/

    const appointment = {
        Email: email1.value.trim(),
        DateTime: date.value,
        Slot: timeslot.value.trim(),
        PatientId: patient1.id,
        DoctorId: doctor1.id
    };


    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
    })
        .then(response => response.json())
        .then(() => {
            console.log("Added successfully");
            let id = patient1.id;
            let role = 0;
            var url = "https://localhost:44391/View/patient.html?id=" + encodeURIComponent(id) + "&role=" + encodeURIComponent(role);
            window.location.href = url;
        })
        .catch(error => console.error("Unable to Apply appointment. ", error));
}






let appointments = [];

const getappointmenturi = '/api/Appointments';

function getAppointments() {
    fetch(getappointmenturi, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => _displayAppointments(data))
        .catch(error => console.error('Unable to get appointment.', error));
}


function _displayAppointments(data) {
    const tBody = document.getElementById('appointments');
    tBody.innerHTML = '';
    _displayCount(data.length);


    const button = document.createElement('button');

    data.forEach(appointment => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${appointment.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteAppointment(${appointment.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode2 = document.createTextNode(appointment.email);
        td1.appendChild(textNode2);


        let td2 = tr.insertCell(1);
        td2.appendChild(editButton);

        let td3 = tr.insertCell(2);
        td3.appendChild(deleteButton);
    });
    appointments = data;
}


function deleteAppointment(id) {
    fetch(`/api/Appointments/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            var url_str = window.location.href
            var url = new URL(url_str);
            var search_params = url.searchParams;
            var id = search_params.get('id');

            if (id == undefined) {
                getAppointments();
            }
            else {
                getAppointsment1();
            }
        })
        .catch(error => console.error('Unable to delete appointment. ', error));
}  


let docts = [];
let appoints = [];

function getDoctos() {
        fetch(getdoctoruri, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => doctorValue(data))
            .catch(error => console.error('Unable to get doctors.', error));
    }
async function doctorValue(data) {
    docts = data;
    getAppoints();
}

function getAppoints() {
    fetch(getappointmenturi, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => appointValue(data))
        .catch(error => console.error('Unable to get appointment.', error));
}
async function appointValue(data) {
    appoints = data;
    updateAppointment();
}

function updateAppointment() {  
    const appointmentId = document.getElementById('edit-id').value;

    const appointment1 = appoints.find(appointment => appointment.id == appointmentId);

    const patientId = appointment1.patientId;
    const date = document.getElementById('app-date');
    const department = document.querySelector('#department');
    const timeslot = document.querySelector('#time-slot');
    const email = document.getElementById('patientmail');
    console.log("Here");
    console.log(timeslot.value);
    console.log(department.value);
    console.log(docts);

    const doctor = docts.find(doctor => doctor.department === department.value.trim());

    /*let doctor;*/
/*
    for (i = 0; i < docts.length; i++) {
        console.log("inside loop");
        if (docts[i].department == department.value) {
            doctor = docts[i];
            break;
        }
    }*/

    const appointment = {
        Id: parseInt(appointmentId, 10),
        DateTime: date.value.trim(),
        Email: email.value.trim(),
        Slot: timeslot.value.trim(),
        PatientId: patientId,
        DoctorId: doctor.id
    };

    fetch(`/api/Appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)

    })
        .then(() => {
            var url_str = window.location.href
            var url = new URL(url_str);
            var search_params = url.searchParams;
            var id = search_params.get('id');

            if (id == undefined) {
                getAppointments();
            }
            else {
                getAppointsment1();
            }

        })
        .catch((error) => console.error('Unanle to update appointment.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('table-appointments').style.display = 'table';
    document.getElementById('container').style.display = 'none';
}

function displayEditForm(id) {
    const appointment = appointments.find(appointment => appointment.id === id);
    console.log(appointment);
/*    console.log("appointment date ", appointment.date);*/
    document.getElementById('edit-id').value = appointment.id;
    document.getElementById('patientmail').value = appointment.email;
    document.getElementById('container').style.display = 'flex';
    document.getElementById('table-appointments').style.display = 'none';
}

function _displayCount(appointmentCount) {
    const name = (appointmentCount === 1) ? 'appointment' : 'appointments';
    document.getElementById('counter').innerText = `${appointmentCount} ${name}`;
}


function getAppointmentById() {
    const appointment = appointments.find(appointment => appointment.id === id);
}


let appointsments = [];

function getAppointsment1() {
    fetch(getappointmenturi, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => assignappoint1Value(data))
        .catch(error => console.error('Unable to get appointment.', error));
}

function assignappoint1Value(data) {
    appointsments = data;
    getPatientsById();
}


function getPatientsById() {
    var url_str = window.location.href
/*    console.log("url  : ", url_str);*/
    var url = new URL(url_str);
    var search_params = url.searchParams;
    var id = search_params.get('id');
    var role = search_params.get('role');
    let appointment = [];
    console.log("id ", id);
    console.log("role ", role);
    
    if (role == 0) {
        console.log("in this 1");
        appointsments.forEach(appointment1 => {
            if (appointment1.patientId == id) {
                console.log("in this 2");
                appointment.push(appointment1);
            }
        });
    }
    else {
        appointsments.forEach(appointment1 => {
            if (appointment1.doctorId == id) {
                appointment.push(appointment1);
            }
        });
    }
    console.log("boss");
    console.log(appointment);
    _displayAppointments(appointment);
}