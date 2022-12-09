# **CarCar**

A web application that utilizes a Django back-end and React front-end to provide a solution for automobile dealership management.

Team:

Ryan Lu - Service

Isaiah Lin - Sales

## **How to Run this Application:**

---

1. Download Docker desktop and follow the installation instructions.
   - https://www.docker.com/products/docker-desktop/
2. Run the Docker application.
3. Fork [this](https://gitlab.com/ryanlu294/project-beta/) repository and then **clone** into a local directory.
4. Run the following commands to create a PostgreSQL volume and start the application.
   - Make sure these commands are typed in the local directory

```
docker volume create beta-data
docker compose build
docker compose up
```

5. The CarCar application can now be accessed at http://localhost:3000/

## **Application Diagram**

---

![diagram](ghi\app\public\CarCar-microservice-diagram.png)

## **Services**

---

### Service API

The `service-api` allows a user to create a service appointment. The automobile value object is polled from the `inventory-api` and is used to check if a vehicle entered by a user was purchased from the dealership. Vehicles that were purchased from the dealership are eligible for VIP treatment and denoted in the appointment model with the `discount` field.

The models are currently set up so that if a technician is removed from the database, all appointments associated with that technician will also be removed (`on_delete=models.CASCADE`). An appointment is reliant on the availability of a technician and if one were to be removed from the dealership, it is important to also remove all appointments associated with that technician.

The models are described below.

**Appointment**
| Attribute | Type | Options |
| --- | --- | --- |
| customer_name | string | max 150 chars |
| time | datetime | |
| reason | string | max 200 chars |
| vehicle_vin | string | max 17 chars |
| discount | boolean | default: false |
| completed | boolean | default: false |
| canceled | boolean | default: false |
| technician | ForeignKey object | on_delete cascade |

**Technician**
| Attribute | Type | Options |
| --- | --- | --- |
| name | string | max 100 chars |
| employee_number | integer | unique=True |

**AutomobileVO**
| Attribute | Type | Options |
| --- | --- | --- |
| vin | string | max 17 chars, unique=True

### **Restful API endpoints for service-api**

---

Base URL: http://localhost:8080

| Method | URL                                   | What it does                       |
| ------ | ------------------------------------- | ---------------------------------- |
| GET    | /api/technicians/                     | Gets a list of all technicians     |
| POST   | /api/technicians/                     | Creates a technician               |
| GET    | /api/appointments/                    | Gets a list of all appointments    |
| POST   | /api/appointments/                    | Creates an appointment             |
| GET    | /api/appointments/\<str:vin>          | Gets a list of appointments by VIN |
| PUT    | /api/appointments/\<int:pk>/cancel/   | Cancels an appointment by ID       |
| PUT    | /api/appointments/\<int:pk>/complete/ | Completes an appointment by ID     |

#### Sample request bodies for post endpoints:

`POST http://localhost:8080/api/technicians/`

Request body:

```
{
	"name": "John Jones",
	"employee_number": 251
}
```

Response:

```
{
	"name": "John Jones",
	"employee_number": 251,
	"id": 3
}
```

`POST http://localhost:8080/api/appointments/`

Request body:

```
{
	"customer_name": "Paul Evans",
	"time": "2022-12-18T14:00:00+00:00",
	"reason": "Oil change",
	"vehicle_vin": "A1290JH52",
	"technician": 2
}
```

Response:

```
{
	"customer_name": "Paul Evans",
	"time": "2022-12-18T14:00:00+00:00",
	"reason": "Oil change",
	"vehicle_vin": "A1290JH52",
	"discount": false,
	"technician": {
		"name": "John Jones",
		"employee_number": 251,
		"id": 2
	},
	"completed": false,
	"canceled": false,
	"id": 5
}
```
