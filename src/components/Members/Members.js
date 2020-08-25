import React, { Component } from 'react';
import Member from './Member/Member';
import Lightbox from '../UI/Lightbox/Lightbox';

class Members extends Component {
    state = {
        lightbox: undefined
    };

    expandImage = (event) => {
        this.setState({
            lightbox: <Lightbox
                src={event.target.src}
                alt={event.target.alt}
                close={this.closeLightbox} />
        })
    };

    closeLightbox = () => {
        this.setState({
            lightbox: undefined
        });
    };

    render() {
        const memberList = [
            {
                name: 'Andrea Johnson',
                memberSince: '2015',
                interests: 'Punctuality. Knowing every person you do. Benevolent dictatorships.',
                imgUrl: '../../assets/memberImages/Andrea.png',
                bookRec: '204 Rosewood Lane by Debbie Macomber'
            },
            {
                name: 'Kaley Reda',
                memberSince: '2015',
                interests: 'Getting a full night\'s sleep. Gestation periods.',
                imgUrl: '',
                bookRec: 'A Walk Along the Beach by Debbie Macomber'
            },
            {
                name: 'Tony Reda',
                memberSince: '2015',
                interests: 'Baking, yard work, other things popular with the over 50 set.',
                imgUrl: '',
                bookRec: 'The Shop on Blossom Street by Debbie Macomber'
            },
            {
                name: 'Tami Zwick',
                memberSince: '2015',
                interests: 'Podcast aficionado. Making websites for things that don\'t need websites.',
                imgUrl: '../../assets/memberImages/Tami.png',
                bookRec: 'Sweet Tomorrows by Debbie Macomber'
            },
            {
                name: 'Kelli Cunningham',
                memberSince: '2016',
                interests: 'Hot tubs. Time machines. Any combination of the two and John Cusack.',
                imgUrl: '',
                bookRec: 'Love Letters by Debbie Macomber'
            },
            {
                name: 'Daniel Navas',
                memberSince: '2018',
                interests: 'Communication, Contests, Competitions, Colloquialisms, Compèring, Cooking, Characters, Casting-of-pods, Criminals, C-Jerry',
                imgUrl: '',
                bookReC: 'Mrs. MiraCle by Debbie Macomber'
            },
            {
                name: 'Jerry Timbrook',
                memberSince: '2018',
                interests: 'Using Recurrent Neural Networks to Code Interviewer Question-Asking Behaviors. (Who has time for anything else?)',
                imgUrl: '../../assets/memberImages/Jerry.png',
                bookRec: 'Angels at the Table by Debbie Macomber'
            }
        ];

        return (
            <main className="main">
                {memberList.map((member) => {
                    return <Member key={member.name} data={member} clicked={this.expandImage} />
                })}
                {this.state.lightbox}
            </main>
        );
    }
}

export default Members;