import React, { useState } from "react"
import { Input } from "@chakra-ui/react"
import { FormControl, FormLabel, IconButton, Stack, HStack} from "@chakra-ui/react"
import {SearchIcon} from '@chakra-ui/icons'
function Search(props) {

    const [city, setCity] = useState('London');

    function handleChange(event) {
        setCity(event.target.value);
    }

    function submitCity(event) {
        props.findData(city);
        event.preventDefault();
    }

    return <div>
        <FormControl>
            <HStack spacing="24px">
                {/* <FormLabel>City</FormLabel> */}
                <Input name="cityName" placeholder="ex: London" value={city} onChange={handleChange} />
                <IconButton aria-label="Search database" colorScheme="white" icon={<SearchIcon />} onClick={submitCity}/>
            </HStack>
        </FormControl>

    </div>
}

export default Search;