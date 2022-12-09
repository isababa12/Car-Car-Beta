# CarCar

Team:

* Person 1 - Which microservice?
* Isaiah Lin - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The sales microservice has 4 models:

The AutomobileVO model contains all the necessary details for an automobile's listing on the front-end. This includes the model, manufacturer, color, year, vin, import_href, as well as a sold/available status. Using the poller, we can sync up all of the details with the inventory automobile with the same VIN. With the model, manufacturer, color, and year, we can also supply those details in the dropdown menu of the Sales Record Form to make selecting the correct car easier.

The SalesPerson model contains the name and a unique employee number of the Sales Person.

The SalesCustomer model is named to distinguish between Sales and Service customers. This model requires a name and phone number for a customer and also has an address field, though the address field may be left empty if a customer prefers to not supply. This decision was made because the address would not need to be accessed at the front-end at any given time and not all potential customers want to add their address.

The SalesRecord model contains the important parts of a SalesRecord. Sales Records should provide the sale price, which automobile was sold, by which sales person, to a specific customer.

### Restful API endpoints for Sales

Base URL: http://localhost:8090

| Method | URL                 | What it does                           |
| ------ | ------------------- | -------------------------------------- |
| GET    | /api/salespeople/          | Lists all sales people            |
| GET    | /api/salescustomer/          | Lists all sales customers
| GET   | /api/salesrecord/          | Lists the entire sale history |
| GET    | /api/salesrecord/\<int:pk> | Lists the entire sale history of an individual sales person by their id         |
| POST | /api/salespeople/ | Creates a sales person                   |
| POST | /api/salescustomer/ | Creates a sales customer                |
| POST | /api/salesrecord/ | Creates a sales record                  |

### Restful API endpoints for Inventory

Base URL: http://localhost:8100

| Method | URL                 | What it does                           |
| ------ | ------------------- | -------------------------------------- |
| GET    | /api/automobiles/          | Lists all automobiles           |
| GET    | /api/automobiles/\<str:vin>/| Show details for a specific automobile|
| GET    | /api/manufacturers/          | Lists all automobile manufacturers |
| GET    | /api/models/                 | Lists all automobile models|
| POST   | /api/automobiles/          | Creates an automobile |
| POST   | /api/manufacturers/          | Creates an automobile manufacturer |
| POST   | /api/models/          | Creates an automobile model |
| PUT    | /api/automobiles/\<str:vin>/ | Updates the automobile by VIN|
| DEL | /api/automobiles/\<str:vin>/ | Deletes an automobile by VIN|

## How to create an Manufacturer, Model, and finally...the Automobile

### How to create a Manufacturer

#### Through Insomnia
1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in http://localhost:8100/api/manufacturers/
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
#### Through the website

1. Find the "Create a Manufacturer" link at the top within the NavBar or in the Nav's Drop down menu
2. Click "Create a Manufacturer"
3. Enter the a name into the field
4. Hit create, if all necessary fields are filled then a success message will pop up notifying you that your Manufacturer has been created

### How to create a model

#### Through Insomnia
1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in http://localhost:8100/api/models/
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
#### Through the website

1. Find the "Create a Model" link at the top within the NavBar or in the Nav's Drop down menu
2. Click "Create a Model"
3. Enter in the necessary fields, all fields are required
    - For a Picture URL, do a google search of the vehicle model you would like to create, right click, copy image address, then paste it into the Picture URL field
4. Hit create, if all necessary fields are filled then a success message will pop up notifying you that your Model has been created

### How to create an Automobile (FINALLY!)

#### Through Insomnia
1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in http://localhost:8100/api/automobiles/
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
#### Through the website

1. Find the "Create a Model" link at the top within the NavBar or in the Nav's Drop down menu
2. Click "Create a Model"
3. Enter in the necessary fields, all fields are required
    - For a Picture URL, do a google search of the vehicle model you would like to create, right click, copy image address, then paste it into the Picture URL field
4. Hit create, if all necessary fields are filled then a success message will pop up notifying you that your Model has been created


## How to create a Sales Person

### Through Insomnia

1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in http://localhost:8090/api/salespeople/
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

### Through the website

1. Find the "Create a Salesperson" link at the top within the NavBar or in the Nav's Drop down menu
2. Click "Create a Salesperson"
3. Enter in the necessary fields, all fields are required
4. Hit create, if the Sales Person can be created (employee number is unique) then a success message will pop up notifying you that your Sales Person has been created

## How to create a Sales Customer

### Through Insomnia

1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in http://localhost:8090/api/salescustomer/
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

### Through the website

1. Find the "Create a Sales Customer" link at the top within the NavBar or in the Nav's Drop down menu
2. Click "Create a Sales Customer"
3. Enter in the necessary fields, name and phone are required
4. Hit create, if all necessary fields are filled then a success message will pop up notifying you that your Sales Customer has been created

## How to create a Sales Customer

### Through Insomnia

1. Open Insomnia and create a new HTTP request
2. Change the HTTP request type to POST and type in http://localhost:8090/api/salesrecord/
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
### Through the website

1. Find the "Create a Sales Record" link at the top within the NavBar or in the Nav's Drop down menu
2. Click "Create a Sales Record"
3. Enter in the necessary fields, all fields are required
4. Hit create, if all necessary fields are filled then a success message will pop up notifying you that your Sales Record has been created
