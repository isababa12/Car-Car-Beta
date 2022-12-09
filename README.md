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

![diagram](./ghi\app\public\CarCar-microservice-diagram.png)

## **Services**

---

### Service API

The `service-api` allows a user to create a service appointment. The automobile value object is polled from the `inventory-api` and is used to check if a vehicle entered by a user was purchased from the dealership. Vehicles that were purchased from the dealership are eligible for VIP treatment and denoted in the appointment model with the `discount` field.

The front-end of the appointment microservice allows a user to create an appointment, get a list of all uncompleted and uncanceled appointments, and get a list of all appointments by VIN. It also allows a user to cancel or complete an appointment from the appointment list page.

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

## **Sales**

---

### Sales API

The sales microservice has 4 models:

The AutomobileVO model contains all the necessary details for an automobile's listing on the front-end. This includes the model, manufacturer, color, year, vin, import_href, as well as a sold/available status. Using the poller, we can sync up all of the details with the inventory automobile with the same VIN. With the model, manufacturer, color, and year, we can also supply those details in the dropdown menu of the Sales Record Form to make selecting the correct car easier.

The SalesPerson model contains the name and a unique employee number of the Sales Person.

The SalesCustomer model is named to distinguish between Sales and Service customers. This model requires a name and phone number for a customer and also has an address field, though the address field may be left empty if a customer prefers to not supply. This decision was made because the address would not need to be accessed at the front-end at any given time and not all potential customers want to add their address.

The SalesRecord model contains the important parts of a SalesRecord. Sales Records should provide the sale price, which automobile was sold, by which sales person, to a specific customer.

---

### Restful API endpoints for Sales

`Base URL: http://localhost:8090`

| Method | URL                        | What it does                                                            |
| ------ | -------------------------- | ----------------------------------------------------------------------- |
| GET    | /api/salespeople/          | Lists all sales people                                                  |
| GET    | /api/salescustomer/        | Lists all sales customers                                               |
| GET    | /api/salesrecord/          | Lists the entire sale history                                           |
| GET    | /api/salesrecord/\<int:pk> | Lists the entire sale history of an individual sales person by their id |
| POST   | /api/salespeople/          | Creates a sales person                                                  |
| POST   | /api/salescustomer/        | Creates a sales customer                                                |
| POST   | /api/salesrecord/          | Creates a sales record                                                  |

### Restful API endpoints for Inventory

`Base URL: http://localhost:8100`

| Method | URL                          | What it does                           |
| ------ | ---------------------------- | -------------------------------------- |
| GET    | /api/automobiles/            | Lists all automobiles                  |
| GET    | /api/automobiles/\<str:vin>/ | Show details for a specific automobile |
| GET    | /api/manufacturers/          | Lists all automobile manufacturers     |
| GET    | /api/models/                 | Lists all automobile models            |
| POST   | /api/automobiles/            | Creates an automobile                  |
| POST   | /api/manufacturers/          | Creates an automobile manufacturer     |
| POST   | /api/models/                 | Creates an automobile model            |
| PUT    | /api/automobiles/\<str:vin>/ | Updates the automobile by VIN          |
| DEL    | /api/automobiles/\<str:vin>/ | Deletes an automobile by VIN           |

---

### AutomobileVO

The AutomobileVO polls from Inventory's Automobile model and creates a new VO synced up with corresponding information necessary for the sales front-end.

---

## How to create an Manufacturer, Model, and finally...the Automobile

### How to create a Manufacturer

1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in `http://localhost:8100/api/manufacturers/`
3. Switch the input type from "Body" (No Body) to JSON by clicking its dropdown menu then clicking JSON
4. Enter a JSON body in the following format (you may copy/paste the sample code):
   - The model for the employee number is set to unique, so no two employees may have the same employee number
   ```
   {
       "name": "Subaru",
   }
   ```
5. Press "Send" and Insomnia will return a POST request similar to this:

   ```
   {
       "href": "/api/manufacturers/1/",
       "id": 1,
       "name": "Subaru"
   }

   ```

6. Find the "Create a Manufacturer" link at the top within the NavBar or in the Nav's Drop down menu
7. Click "Create a Manufacturer"
8. Enter the a name into the field
9. Hit create, if all necessary fields are filled then a success message will pop up notifying you that your Manufacturer has been created

### How to create a model

1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in `http://localhost:8100/api/models/`
3. Switch the input type from "Body" (No Body) to JSON by clicking its dropdown menu then clicking JSON
4. Enter a JSON body in the following format (you may copy/paste the sample code):
   - The manufacturer_id corresponds to the respective id of the manufacturer
   ```
   {
       "name": "WRX",
       "picture_url": "https://cdn.oem-production.subaru.com.au/1.0.2-hotfix-SUB-3273-subs/Assets/nav-menu/my22-wrx-new.png",
       "manufacturer_id": 1
   }
   ```
5. Press "Send" and Insomnia will return a POST request similar to this:
   ```
   {
       "href": "/api/models/1/",
       "id": 1,
       "name": "WRX",
       "picture_url": "https://cdn.oem-production.subaru.com.au/1.0.2-hotfix-SUB-3273-subs/Assets/nav-menu/my22-wrx-new.png",
       "manufacturer": {
           "href": "/api/manufacturers/1/",
           "id": 1,
           "name": "Subaru"
       }
   }
   ```

### How to create an Automobile (FINALLY!)

1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in `http://localhost:8100/api/automobiles/`
3. Switch the input type from "Body" (No Body) to JSON by clicking its dropdown menu then clicking JSON
4. Enter a JSON body in the following format (you may copy/paste the sample code):
   - The model_id corresponds to the respective id of the model
   ```
   {
       "color": "blue",
       "year": 2022,
       "vin": "1234567890QWERTYU",
       "model_id": 1
   }
   ```
5. Press "Send" and Insomnia will return a POST request similar to this:
   ```
   {
       "href": "/api/automobiles/1234567890QWERTYU/",
       "id": 1,
       "color": "blue",
       "year": 2022,
       "vin": "1234567890QWERTYU",
       "model": {
           "href": "/api/models/1/",
           "id": 1,
           "name": "WRX STI",
           "picture_url": "https://cdn.motor1.com/images/mgl/MQPEn/s1/subaru-wrx-sti-ej20-final-edition.webp",
           "manufacturer": {
               "href": "/api/manufacturers/1/",
               "id": 1,
               "name": "Subaru"
           }
       }
   }
   ```

## How to create a Sales Person

1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in `http://localhost:8090/api/salespeople/`
3. Switch the input type from "Body" (No Body) to JSON by clicking its dropdown menu then clicking JSON
4. Enter a JSON body in the following format (you may copy/paste the sample code):
   - The model for the employee number is set to unique, so no two employees may have the same employee number
   ```
   {
       "name": "Isaiah Lin",
       "number": "001"
   }
   ```
5. Press "Send" and Insomnia will return a POST request similar to this:
   ```
   {
       "name": "Isaiah Lin",
       "number": "001",
       "id": 1
   }
   ```

## How to create a Sales Customer

1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in `http://localhost:8090/api/salescustomer/`
3. Switch the input type from "Body" (No Body) to JSON by clicking its dropdown menu then clicking JSON
4. Enter a JSON body in the following format (you may copy/paste the sample code):
   - The address field is not required to create a sales customer
   ```
   {
       "name": "Isaiah Lin",
       "address": "123 Main St, LA, CA"
       "phone": "555-555-5555"
   }
   ```
5. Press "Send" and Insomnia will return a POST request similar to this:
   ```
   {
       "name": "Isaiah Lin",
       "address": "123 Main St, LA, CA",
       "phone": "555-555-5555",
       "id": 1
   }
   ```

## How to create a Sales Customer

1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in `http://localhost:8090/api/salesrecord/`
3. Switch the input type from "Body" (No Body) to JSON by clicking its dropdown menu then clicking JSON
4. Enter a JSON body in the following format (you may copy/paste the sample code):
   - The sale_price field is a numerical field for a dollar amount
   - The sales_person and sales_customer fields correspond to their respective IDs
   - The automobile field corresponds to an AutomobileVO's respective VIN
   - If you followed this tutorial in order, these should post properly
   ```
   {
       "sale_price": 42000,
       "sales_person": 1,
       "sales_customer": 1,
       "automobile": "1234567890QWERTYU"
   }
   ```
5. Press "Send" and Insomnia will return a POST request similar to this:
   ```
   {
       "id": 1,
       "sale_price": 42000,
       "automobile": {
           "model": "WRX STI",
           "manufacturer": "Subaru",
           "color": "Blue",
           "year": 2022,
           "vin": "1234567890QWERTYU",
           "import_href": "/api/automobiles/4234567890QWERTYU/",
           "status": "sold"
       },
       "sales_person": {
           "name": "Isaiah Lin",
           "number": "001",
           "id": 1
       },
       "sales_customer": {
           "name": "Isaiah Lin",
           "address": "Diamond Bar, CA",
           "phone": "5555555555",
           "id": 1
       }
   }
   ```
