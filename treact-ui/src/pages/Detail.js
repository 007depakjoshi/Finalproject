import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "components/headers/light.js";
import axios from 'axios';
import Moment from 'moment';
import { Link, useParams, useHistory } from 'react-router-dom';

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 lg:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
    tw`md:w-6/12 mt-8 md:mt-0`,
    props.textOnLeft ? tw`md:mr-8 lg:mr-16 md:order-first` : tw`md:ml-8 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`rounded bg-cover bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8`;

const Heading = tw(SectionHeading)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`

const Statistics = tw.div`mt-6 lg:mt-8 xl:mt-16 flex flex-wrap`
const Statistic = tw.div`text-lg sm:text-2xl lg:text-3xl w-1/2 mt-4 lg:mt-10 text-center md:text-left`
const Value = tw.div`font-bold text-primary-500`
const Key = tw.div`font-medium text-gray-700`

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-black	 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-black	 hover:text-primary-500`}
  }
`;
const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`

export default (props, { textOnLeft = false }) => {
    let navigate = useHistory();

    const [detail, setDetail] = useState('');
    const eveId = useParams();
    console.log('eveid', eveId)

    const parseData = JSON.parse(localStorage.getItem("logged_user"));
    const name = parseData ? parseData.data.name : '';

    useEffect(() => {
        fetchdata();
    }, []);

    async function fetchdata() {
        axios.get(`http://localhost:5000/eventDetails/${eveId.id}`,)
            .then(res => {
                const data = res.data
                if (res.status == 200) {
                    console.log('datadata', data.data)
                    setDetail(data.data)
                } else {

                }
            })
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log('submit')

        axios.post(`http://localhost:5000/book`, { event_id: eveId.id, eve_date: Moment(detail.date).format('YYYY-MM-DD') })
            .then(res => {
                console.log(res);
                console.log(res.data);
                const data = res.data
                if (res.status == 200) {
                    //localStorage.setItem("logged_user", JSON.stringify(data));
                    navigate.push('/profile');
                } else {

                }
            })
    }

    const navLinks = [
        <NavLinks key={1}>
            <NavLink href="/" >
                Home
            </NavLink>
            <NavLink href="/events">
                Events
            </NavLink>
            <NavLink href="/about">
                About
            </NavLink>
            <NavLink href="/contact">
                Contact
            </NavLink>
        </NavLinks>,
        <NavLinks key={2}>
            <PrimaryLink href="/login">
                {name != '' ?
                    "Login" : "Logout"}
            </PrimaryLink>
        </NavLinks>
    ];

    return (
        <AnimationRevealPage>
            <StyledHeader links={navLinks} />
            <Container>
                <TwoColumn>
                    <ImageColumn>
                        <Image imageSrc="https://images.unsplash.com/photo-1584200186925-87fa8f93be9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80" />
                    </ImageColumn>
                    <TextColumn textOnLeft={textOnLeft}>
                        <TextContent>
                            <Heading>{detail.title}</Heading>
                            <Description>{detail.description}</Description>
                            <Statistics>
                                <Statistic>
                                    <Value>{Moment(detail.date).format('YYYY-MM-DD')}</Value>
                                    <Key>Date</Key>
                                </Statistic>
                                <Statistic>
                                    <Value>{detail.price}</Value>
                                    <Key>price</Key>
                                </Statistic>
                                <Statistic>
                                    <Value>{detail.name}</Value>
                                    <Key>Venue Name</Key>
                                </Statistic>
                                <Statistic>
                                    <Value>{detail.address}</Value>
                                    <Key>Address</Key>
                                </Statistic>
                            </Statistics>
                        </TextContent>
                        <br /><br /><br />
                        <form onSubmit={handleSubmit}>
                            <PrimaryLink type="submit">Book Your Seat</PrimaryLink>
                        </form>
                    </TextColumn>
                </TwoColumn>
            </Container>
        </AnimationRevealPage>
    );
};
