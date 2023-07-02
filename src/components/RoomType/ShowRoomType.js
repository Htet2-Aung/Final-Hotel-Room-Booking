import React from 'react'
import classes from './Room.module.css'
import Room from './Room'

const ShowRoomType = () => {

    const card =` row my-5 ${classes.cardsize}`

  return (
    <section>
    <div className={card}>
        <Room/>
    </div>
    </section>
  )
}

export default ShowRoomType