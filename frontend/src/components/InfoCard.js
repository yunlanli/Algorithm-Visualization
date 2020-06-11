import React from 'react';
import styled from 'styled-components';
import { INFO } from '../assets/Sorting';
import { color } from '../styles/GlobalStyles';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 1rem;
    width: 15rem;
`;

const CustomSpan = styled.span`
    width: 100%;
    display: inline-block;
`;

const Heading = styled(CustomSpan)`
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: .5rem;
`;

const Text = styled(CustomSpan)`
    white-space: pre-wrap;
    font-size: .75rem;
`;

const Link = styled.a`
    display: inline-block;
    margin-left: auto;
    font-size: .85rem;
    color: ${color.slider};
    font-weight: 700;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    &:visited {
        text-decoration: none;
    }
`;

/* const createDangerousHTML = markUp => {
    return {__html: markUp};
}; */

/* TODO: use dangerouslySetInnerHTML to display text */
function InfoCard(props) {
    if (props.type === "none")
        return null;
    else
        return(
            <Wrapper>
                <Heading> {props.type} </Heading>
                <Text> {INFO[props.type].text} </Text>
                {/* <Text dangerouslySetInnerHTML={createDangerousHTML(INFO[props.type].text)} /> */}
                <Link href={INFO[props.type].link}>Learn More </Link>
            </Wrapper>
        )
}

export default InfoCard;