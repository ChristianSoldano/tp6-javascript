"use strict"

const EMPLOYEE_URL = "https://utn-avanzada2-tp6.herokuapp.com/api/employee";
const COMPANY_URL = "https://utn-avanzada2-tp6.herokuapp.com/api/company";
const btnCreateEmployee = document.getElementById('btnCreateEmployee').addEventListener("click", () => {
    createEmployee()
});

class Company {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Employee {
    constructor(employeeId, firstName, lastName, email, company) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.company = company;
    }
}

function createRow(employee) {
    const trElement = document.createElement('tr');

    const employeeId = document.createElement('th');
    employeeId.scope = "row";
    employeeId.appendChild(document.createTextNode(employee.employeeId));

    const tdFirstName = document.createElement('td');
    tdFirstName.appendChild(document.createTextNode(employee.firstName));

    const tdLastName = document.createElement('td');
    tdLastName.appendChild(document.createTextNode(employee.lastName));

    const tdEmail = document.createElement('td');
    tdEmail.appendChild(document.createTextNode(employee.email));

    const tdCompany = document.createElement('td');
    tdCompany.appendChild(document.createTextNode(employee.company.name));

    trElement.appendChild(employeeId);
    trElement.appendChild(tdFirstName);
    trElement.appendChild(tdLastName);
    trElement.appendChild(tdEmail);
    trElement.appendChild(tdCompany);

    return trElement;
}

function insertRow(employee) {
    const tbody = document.getElementById("tbody");
    tbody.appendChild(createRow(employee));
}

function httpRequest(verb, url, data) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open(verb, url);
        request.responseType = 'json';

        if (data) {
            request.setRequestHeader('Content-Type', 'application/json');
        }

        request.onload = () => {
            if (request.status == 200 || request.status == 201) {
                resolve(request.response);
            } else {
                reject(Error("There was an error: " + request.status + " " + request.statusText));
            }
        };

        request.onerror = () => {
            reject(Error("There was an error: " + request.status + " " + request.statusText));
        }

        request.send(JSON.stringify(data));
    });
}

async function getEmployees() {
    try {
        var companies = await httpRequest('GET', COMPANY_URL);
        var employees = await httpRequest('GET', EMPLOYEE_URL);
        var employeesArray = [];

        employees.forEach(data => {
            var company = companies.find(company => company.companyId == data.companyId);
            var employee = new Employee(data.employeeId, data.firstName, data.lastName, data.email, company);
            employeesArray.push(employee);
        });
        document.getElementById("tbody").innerHTML = "";
        employeesArray.forEach(element => {
            insertRow(element);
        });

    } catch (e) {
        console.log("Upps! " + e.message);
    }
}

async function sendEmployee(newEmployee) {
    try {
        await httpRequest('POST', EMPLOYEE_URL, newEmployee);
    } catch (e) {
        console.log("Error: " + e.message);
    }
}

async function loadCompanySelector() {
    try {
        const selector = document.getElementById("inputState");
        var companies = await httpRequest('GET', COMPANY_URL);

        companies.forEach(company => {
            var text = document.createTextNode(company.name);
            var element = document.createElement('option');
            element.appendChild(text);
            element.value = company.companyId;
            selector.appendChild(element);
        });
    } catch (e) {
        console.log("Error: " + e);
    }
}

function createEmployee() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const select = document.getElementById('inputState');

    if (select.selectedIndex == 0 || firstName.length == 0 || lastName.length == 0 || email.length == 0)
        alert("Complete the fields");
    else {
        sendEmployee({
            "companyId": Number(select.value),
            "firstName": firstName.value,
            "lastName": lastName.value,
            "email": email.value
        });
        getEmployees();
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        select.selectedIndex = 0;
        executeSweetAlert();
    }
}

function executeSweetAlert() {
    Swal.fire({
        title: 'Completed!',
        html: 'The employee has been registered successfully',
        icon: 'success'
    })
}

window.onload = async () => {
    await loadCompanySelector();
    await getEmployees();
    console.log("ventana cargada");
};