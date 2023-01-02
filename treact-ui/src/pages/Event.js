import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "components/misc/Headings";
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "components/headers/light.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as TrendingIcon } from "feather-icons/dist/icons/trending-up.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
import axios from 'axios';
import Moment from 'moment';

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

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 mb-10`;
const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;
const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-80 bg-cover bg-center rounded`
]);
const Column = tw.div``;
const ThreeColumn = tw.div`flex flex-wrap`;

const CardColumn = tw(Column)`w-full md:w-1/2 xl:w-1/3 mt-16 xl:mt-0`;

const CardText = tw.div`mt-4`;

const CardHeader = tw.div`flex justify-between items-center`;
const CardType = tw.div`text-primary-500 font-bold text-lg`;
const CardPrice = tw.div`font-semibold text-sm text-gray-600`;
const CardPriceAmount = tw.span`font-bold text-gray-800 text-lg`;

const CardTitle = tw.h5`text-xl mt-4 font-bold`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-between sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;
const CardAction = tw(PrimaryButtonBase)`w-full mt-8`;
const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

export default () => {
  const [listing, setListing] = useState('');
  const parseData = JSON.parse(localStorage.getItem("logged_user"));
  const name = parseData ? parseData.data.name : '';

  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    axios.get(`http://localhost:5000/events`,)
      .then(res => {
        const data = res.data
        if (res.status == 200) {
          console.log('datadata', data.data)
          setListing(data.data)
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
        "Login" : "Logout" }
      </PrimaryLink>
    </NavLinks>
  ];

  return (
    <AnimationRevealPage>
      <StyledHeader links={navLinks} />
      <Container>
        <Content>
          <ThreeColumn>
            {listing && listing.map((card, index) => (
              <CardColumn key={index}>
                <Card>
                  <CardImage imageSrc={require(`images/${card.image}`).default} />
                  <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardMeta>
                      <CardType>{Moment(card.date).format('YYYY-MM-DD')}</CardType>
                      <CardPrice>
                        <CardPriceAmount>{card.price}</CardPriceAmount> per day
                      </CardPrice>
                    </CardMeta>
                    <CardAction><a href={`/detail/${card.event_id}`}>Book Now</a></CardAction>
                  </CardText>
                </Card>
              </CardColumn>
            ))}
          </ThreeColumn>
        </Content>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};