import React, { useEffect, useState } from "react"

import { Heading, Box, Image, HStack, VStack , Flex} from "@chakra-ui/react"
function TempCard(props) {
    console.log("PROPS", props.data);
    const [data, setData] = useState({
        date: "",
        time: "",
        cityName: "",
        description: "",
        temprature: "",
        feels_like: "",
        humidity: "",
        icon: "",
        windSpeed: ""
    })

    useEffect(() => {
        var datetime = new Date(props.data[0].dt * 1000);
        var time = datetime.getHours();
        var date = datetime.toLocaleString('default', { day: 'numeric', month: 'short' });
        setData({
            date: date,
            time: time,
            cityName: props.cityName,
            description: props.data[0].weather[0].description,
            temprature: props.data[0].main.temp,
            feels_like: props.data[0].main.feels_like,
            humidity: props.data[0].main.humidity,
            icon: "https://openweathermap.org/img/wn/" + props.data[0].weather[0].icon + "@2x.png",
            windSpeed: props.data[0].wind.speed
        })
    }, [props])


    return (
        <Flex maxW="sm"  borderRadius="lg" overflow="hidden" boxShadow="base">
            <VStack>
                <Flex
                    mt="1"
                    fontWeight="bold"
                    as="h1"
                    lineHeight="tight"
                    isTruncated
                >
                    {data.date}
                </Flex>

                <HStack>
                    <Image src={data.icon} alt={data.description}  boxSize="6.25em" />
                    <Flex
                      
                        fontWeight="bold"
                        as="h1"
                        lineHeight="tight"
                        isTruncated
                    >
                    <Heading size="lg" letterSpacing={"tighter"}>
                    {data.temprature}
                    </Heading>
                       
                    </Flex>
                </HStack>

                {/* <Flex p="6"> */}
                    <Flex
                        fontWeight="bold"
                        as="h2"
                        textTransform="uppercase"
                        lineHeight="tight"
                        isTruncated
                    >
                        {data.description}
                    </Flex>
                {/* </Flex> */}

                <Flex p="5">
                    <HStack>
                        <Flex
        
                            fontWeight="semi-bold"
                            as="h1"
                            lineHeight="tight"
                            isTruncated
                        >
                            <VStack>
                                <Flex
                                   
                                    color="gray.500"
                                    fontWeight="semi-bold"
                                    as="h1"
                                    lineHeight="tight"
                                    isTruncated> Humidity</Flex>
                                <Flex
                                   
                                    color="gray.500"
                                    fontWeight="semi-bold"
                                    as="h1"
                                    lineHeight="tight"
                                    isTruncated> {data.humidity}</Flex>
                            </VStack>

                        </Flex>

                        <Flex
                            maxW="sm"
                           
                            fontWeight="semi-bold"
                            as="h1"
                            lineHeight="tight"
                            isTruncated
                        >
                            <VStack>
                                <Flex
                                    maxW="sm"
                                   
                                    color="gray.500"
                                    fontWeight="semi-bold"
                                    as="h1"
                                    lineHeight="tight"
                                    isTruncated> Wind Speed
                                </Flex>
                                <Flex
                                    maxW="sm"
                        
                                    color="gray.500"
                                    fontWeight="semi-bold"
                                    as="h1"
                                    lineHeight="tight"
                                    isTruncated> {data.windSpeed}
                                </Flex>
                            </VStack>

                        </Flex>

                    </HStack>
                </Flex>
            </VStack>
        </Flex>
    )

}

export default TempCard;