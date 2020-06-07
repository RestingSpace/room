import React, { Component } from 'react'
import items from './data'


const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],    //all rooms 
        sortedRooms:[],     // filtered rooms passed to the RoomList, being changed due to filter
        featuredRooms: [],
        reservationRooms: [],
        loading: false,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        food: false,
        pets: false,
        test:[],
        username:' ',
        isLogin: false
    };
    // getDate
    getRooms(){
        const getRoomsURL = 'http://localhost:8080/getAllRooms';
        const action = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': document.cookie
            }
        }
        fetch(getRoomsURL, action)
            .then(res => {
                //console.log(res);
                if(res.status === 200){
                    console.log("success getting rooms");
                }
                else if(res.status === 403){
                    console.log("403 forbidden");
                }
                else{
                    console.log("error getting rooms");
                }
                return res.json()
            })
            .then(
                (result) => {
                    this.setState({
                        test: result
                    });
                    console.log(this.state.test)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

   

    toggleLogin = (loginState,username) => {
        this.setState({
            isLogin: loginState,
            username: username
        })
        console.log(this.state.isLogin)
        console.log(this.state.username)
    }

    componentDidMount() {
        this.getRooms();
        // this.getData
        let rooms = this.formatData(items);
 
        let featuredRooms = rooms.filter(room => room.featured === true)
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms,
            sortedRooms: rooms,
            featuredRooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize,
        });
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)
            let room = {...item.fields,images,id}
            
            return room;
        });
        return tempItems;
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug);
        return room;
    };

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]:value}, this.filterRooms);

    };
    
    filterRooms = () => {
        let{
            rooms, type, capacity, price, minPrice, maxPrice, minSize, maxSize, food, pets
        } = this.state
        
        // all the rooms
        let tempRooms = [...rooms];

        // transform value
        capacity = parseInt(capacity)
        price = parseInt(price)

        // filter by type
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        // filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        // filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        // filter by food
        if (food) {
            tempRooms = tempRooms.filter(room => room.food === true)
        }

        //filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        // change state
        this.setState({
            sortedRooms:tempRooms
        });
    };

    getReservation() {
        const getReservationURL = 'http://localhost:8080/reservations/{this.state.username}';
        const action = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                //'Authorization': document.cookie
            }
        }
        fetch(getReservationURL, action)
            .then(res => {
                //console.log(res);
                if(res.status === 200){
                    console.log("success getting reservation");
                }
                else if(res.status === 403){
                    console.log("403 forbidden");
                }
                else{
                    console.log("error getting reservation");
                    return;
                }
                return res.json()
            })
            .then(
                (result) => {
                    // this.setState({
                    //     reservationRooms: result
                    // });
                    console.log(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom:this.getRoom,
                handleChange: this.handleChange,
                setUsername: this.setUsername,
                toggleLogin: (e, f) => this.toggleLogin(e, f),
                getReservation: this.getReservation
                }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}



const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext};

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (
            <RoomConsumer>
            {value => <Component {...props} context = {value}/> }
            </RoomConsumer>
            );
    };
}


