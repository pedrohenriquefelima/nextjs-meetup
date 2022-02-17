import { Fragment } from "react";
import Head from 'next/head';
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../components/meetups/MeetupDetail";

function MeetupDetails(props){
    return (
    <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description}></meta>
        </Head>
    <MeetupDetail image={props.meetupData.image} description={props.meetupData.description} title={props.meetupData.title}  address={props.meetupData.address} />
    </Fragment>)
}

export async function getStaticPaths(){
    //nextJs needs to generate all versions of meetupIds pages in advance for all the supported Ids
    const client = await MongoClient.connect('mongodb+srv://pedrolima:Passw0rd123@cluster0.0gnif.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollections = db.collection('meetups');
    //only fetching id
    const meetups = await meetupsCollections.find({},{_id: 1}).toArray();
    client.close();
    return {
        fallback: false,
        paths: meetups.map((meetup => ({
            params: {meetupId : meetup._id.toString()},
        }))),
    }

}

export async function getStaticProps(context){
    //in order to access the ID parameter which is on the URL can be accessed through context. 
    //hooks cannot be used in getStaticProps
    //getStaticPaths is required for dynamic SSG pages 

    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://pedrolima:Passw0rd123@cluster0.0gnif.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollections = db.collection('meetups');
    const selectedMeetup = await meetupsCollections.findOne({_id: ObjectId(meetupId)})

    console.log(selectedMeetup);
    
    return {
        props: {
            meetupData: {
                    id: selectedMeetup._id.toString(),
                    title: selectedMeetup.title,
                    address: selectedMeetup.address,
                    image: selectedMeetup.image,
                    description: selectedMeetup.description,
                }
            },
    }
    
}

export default MeetupDetails;