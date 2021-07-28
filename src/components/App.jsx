import React, { useState, useEffect } from "react"
import Search from "./Search";
import TempCard from "./TempCard";
import Chart from "./Chart";
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Box, HStack, Heading, Flex, VStack, Grid, GridItem } from "@chakra-ui/react";

function App() {
    console.log(process.env.REACT_APP_API_KEY);
    const appkey = process.env.REACT_APP_API_KEY
    const unit = "metric"
    const [city, setCity] = useState({ name: 'London', lat: '0', lon: '0' })
    const [data, setData] = useState({});
    const [cards, setCards] = useState([]);

    const theme = extendTheme({
        colors: {
            brand: {
                100: "#f7fafc",
                // ...
                900: "#1a202c",
            },
        },
    })

    function FindData(city) {
        setCity({ name: city })
    }

    function createCard(card, flag) {
        console.log(flag, "CARD :", card);
        if (flag) {
            setCards([card])
        }
        else {
            setCards(prevValue => {
                return [...prevValue, card]
            })
        }
    }

    function storeData(data) {
        setData(data)

        function getDayCard(day) {
            if (data.list) {
                return data.list.filter(item => {
                    var date = new Date(item.dt * 1000);
                    return (date.getMonth() === day.getMonth() && date.getDate() === day.getDate())
                })
            }

        }

        var flag = true;
        for (var i = 0; i < 4; i++) {
            var date = new Date();
            date.setDate(date.getDate() + i)
            console.log(date);
            createCard(getDayCard(date), flag)
            flag = false;
        }

    }

    useEffect(() => {
        async function fetchMyAPI() {
            const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.name + "&appid=" + appkey + "&units=" + unit;
            let response = await fetch(url)
            response = await response.json()
            storeData(response)
        }

        fetchMyAPI()
    }, [city.name])


    return (data.city && cards) ? <div>
        <ChakraProvider >
            <Grid h="200px"
                templateRows="repeat(3, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={4} >
                <GridItem rowSpan={1} colSpan={4}>
                    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding={6} bg="teal.500" color="white">
                        <Flex align="center" mr={5}>
                            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                                WEATHER APP
                            </Heading>
                        </Flex>
                        <Search findData={FindData} />
                    </Flex>
                </GridItem>

                <GridItem rowSpan={3} colSpan={1}>
                    <VStack>
                        <Flex mt="1"
                            fontWeight="bold"
                            textTransform="uppercase"
                            as="h1"
                            lineHeight="tight"
                            isTruncated>
                            {"  " + city.name}
                        </Flex>
                        <Flex> 
                        {cards.map((card, index) => {
                            if (index === 0) return <TempCard key={index} cityName={city.name} data={card} />
                            return null
                        })}
                        </Flex>
                    </VStack>
                </GridItem>

                <GridItem rowSpan={2} colSpan={3}>
                    <VStack w="50rem">
                        <Flex w="50rem"  align="center"  >
                            {cards.map((card, index) => {
                                if (index === 0) return <Chart key={index} list={card} />
                                return null
                            })}
                        </Flex>

                        <Flex w="50rem" as="nav" align="center" spacing = {3} justify="space-between" wrap="wrap" >
                            <HStack mr={8}>
                                    <Flex>
                                    {cards.map((card, index) => { return <TempCard key={index} cityName={city.name} data={card} /> })}                              
                                    </Flex>
                            </HStack>
                        </Flex>

                    </VStack>
                </GridItem>


            </Grid>

        </ChakraProvider>
    </div>
        :
        <div>
            <h1>WEATHER APP</h1>
            <Search findData={FindData} />
        </div>
}

export default App;