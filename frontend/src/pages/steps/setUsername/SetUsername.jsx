import React from 'react';
import Card from '../../../components/shared/card/Card';

const SetUsername = ({handleClick}) => {
   
  const image='/images/username.png';
  const title='Pick a Username';

  return (
    <div>
      <Card image={image} title={title}>

        <div>
          <input type="text" placeholder='@'/>
        </div>

      </Card>
    </div>
  )
}

export default SetUsername;
