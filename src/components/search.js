import React, {Component} from "react";
import axios from 'axios';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            search: null,
            menuData: []
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.lengthCheck = this.lengthCheck.bind(this)
    }

    submitHandler(event) {
        axios
            .get('https://cors-anywhere.herokuapp.com/https://digitebl-staging.herokuapp.com/api/v1/common/getItemCategories')
            .then(response => {
                this.setState({
                    menuData: response.data
                })
            })
            .catch(error =>
                console.log(error)
            )
    }

    filter() {
        console.log(this.state.menuData)
    }

    lengthCheck = () => {
        if (this.state.search !== null && this.state.search.length > 2) {
            this.submitHandler()
        }
    }

    changeHandler(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
        this.lengthCheck()
    }

    render() {
        const value = this.state.menuData.filter((data) =>
        {
            if (this.state.search == null) {
                return data
            } else if (data.value.toLowerCase().includes(this.state.search.toLowerCase())
                || data.display.toLowerCase().includes(this.state.search.toLowerCase())
                || data.desc.toLowerCase().includes(this.state.search.toLowerCase())
            ) {
                return data
            }
            return  data
        }).map(data => {
            return (
                <table>
                    <tbody>
                    <tr key={data.id}>
                        <td>{data.value}</td>
                        <td>{data.display}</td>
                        <td>{data.desc}</td>
                    </tr>
                    </tbody>
                </table>
            )
        })
        return (
            <div>
                <form>
                    <div style={{margin: "25px"}}>
                        <span>Value</span><input type="text" name="search" onChange={this.changeHandler}/>
                    </div>
                    <span>Others</span><input type="text" name="search" onChange={this.changeHandler}/>
                    <table>
                        <thead>
                        <tr>
                            <th>Value</th>
                            <th>Display</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                    </table>
                    {value}

                </form>
            </div>
        )
    }
}

export default Search