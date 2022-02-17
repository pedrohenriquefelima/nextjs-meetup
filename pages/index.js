import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';

//the head component is a component that allows one to add elements to the Head section of your page

function HomePage(props) {

    return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content='Browse a long list of meetups!'></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>)
}

export async function getStaticProps() {
    //in here secure code can be written because it won't be visible on the client
    //this function needs to return an object which will be received by the component page
    //with this in place, nextJs makes sure the content is placed on the page
    //no need for using useEffect and useState
    const client = await MongoClient.connect('mongodb+srv://pedrolima:Passw0rd123@cluster0.0gnif.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollections = db.collection('meetups');
    const meetups = await meetupsCollections.find().toArray();
    client.close();

    return {
      props: {
        meetups: meetups.map(meetup => ({
            title: meetup.title,
            address: meetup.address,
            image: meetup.image,
            id: meetup._id.toString()
        }))
      },
      revalidate: 10
    }
  }
export default HomePage;