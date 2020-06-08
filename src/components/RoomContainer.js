import React from 'react'
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'
import {withRoomConsumer} from '../context'
import Loading from './Loading'

function RoomContainer({context}) {
    const {loading, sortedRooms, rooms,test} = context;
    console.log(test);
    if (loading) {
        return <Loading/>;
    }
    return (
        <>
            <RoomFilter rooms={rooms}/>
            <RoomList rooms={sortedRooms}/>
        </>
    );
           
}

export default withRoomConsumer(RoomContainer)








// export default function RoomContainer() {
//     return (
//         <RoomConsumer>
//             {
//                 (value) => {
//                     const {loading, sortedRooms, rooms} = value
//                     if (loading) {
//                         return <Loading />
//                     }

//                     return (
//                         <div>
//                             Rooms Container
//                             <RoomFilter rooms={rooms}/>
//                             <RoomList rooms={sortedRooms}/>
//                         </div>
//                     );
//                 }
//             }
//         </RoomConsumer>
//     );
// }
