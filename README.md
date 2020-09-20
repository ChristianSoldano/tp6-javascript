# Trabajo Práctico N° 6 – Promises, Async/Await

Realizar una aplicación web en base a los siguientes requisitos

* Se deberá consumir la siguiente API:
 * https://utn-avanzada2-tp6.herokuapp.com/
 * https://utn-avanzada2-tp6.herokuapp.com/index.html (Swagger)
 * De la cual se conocen los siguientes endpoints:
   * GET /api/Company
   * GET /api/Employee
   * POST /api/Employee
   * DELETE /api/Employee/employeeId


Respuestas de ejemplo:

![Imagen de guia](https://i.ibb.co/FzWVK2N/image.png)


* Realizar los siguientes ejercicios creando páginas (HTML y JavaScript) que obtengan los
resultados:

 * Listar todos los Employees con su respectiva Company. Se debe obtener los
resultados de los dos endpoints siguientes y realizar un proceso de
combinación en JavaScript para poder asignar a cada Employee la Company
que le corresponda. (Usando GET /api/Employee y GET /api/Company).

 * Agregar un nuevo Employee a la aplicación, para ello debemos investigar cómo
realizar un POST contra la API y proveer el siguiente objeto JSON. (Usando
POST /api/Employee).

![Imagen de guia](https://i.ibb.co/2c4D1Jr/image.png)


* Eliminar un Employee de la aplicación. (Usando DELETE /api/Employee/
employeeId).
* ***Nota***: La aplicación reinicia los datos cada 5 minutos.
