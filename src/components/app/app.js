import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ItemDetails, { Record } from "../item-details";
import {PersonDetails, PersonList, PlanetDetails, PlanetList, StarshipDetails, StarshipList} from "../sw-components";
import ErrorBoundry from "../error-boundry";
import {SwapiServiceProvider} from "../swapi-service-context";
import DummySwapiService from "../../services/dummy-swapi-service";

export default class App extends Component {



    state = {
        showRandomPlanet: true,
        hasError: false,
        swapiService: new SwapiService()
    };

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch(error, errorInfo)');
        this.setState({
            hasError: true
        })
    }

    onServiceChange = () => {
        this.setState(({ swapiService }) => {

            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            }
        })
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        const {getPerson, getStarship } = this.state.swapiService;

        const personDetails = (
            <ItemDetails
                getData={getPerson}
                itemId={10}
            >
                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>
            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                getData={getStarship}
                itemId={5}
            >
                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="costInCredits" label="Cost"/>
            </ItemDetails>
        );

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange}/>

                        <PersonDetails itemId={11}/>
                        <PlanetDetails itemId={9}/>
                        <StarshipDetails itemId={5}/>

                        <PersonList/>
                        <PlanetList/>
                        <StarshipList/>

                        <Row left={personDetails} right={starshipDetails}/>
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
