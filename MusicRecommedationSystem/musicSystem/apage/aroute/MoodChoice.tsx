import React from 'react';
import {Text, Button} from 'react-native'
const MoodChoice = ({route, navigation}:any) => {
    return (
        <>
            <Text>Please Select a tag representing your current mood</Text>
            <Button title="Go Back" onPress={()=>
                 navigation.goBack()}/>
        </>
    
    )
}

export default MoodChoice;