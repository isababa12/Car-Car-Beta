import React from "react";

class SalesPersonSales extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sales_record:[],
        };
    }
    async componentDidMount() {
        const url = `http://localhost:8090/api/salesrecord/${value}/`
        const fetchConfig = {
            method: "get",
            headers: {
                "Content-type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            const data = await response.json()
        }
    }
}
