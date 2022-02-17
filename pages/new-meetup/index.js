import { useRouter } from 'next/router';
import Head from 'next/head';
import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
    const router = useRouter();
    //since the request is being sent to the same server in which this page is located an absolute path can be used.
    //mongodb+srv://pedrolima:<password>@cluster0.0gnif.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    async function onAddMeetupHandler(dataReceived){
       const response = await fetch('/api/new-meetup', {
           method: 'POST',
           body: JSON.stringify(dataReceived),
           headers: {
               'Content-Type': 'application/json'
           }
       });

       const data = await response.json();
       console.log(data);
       router.push('/');
    }

    return (
    <Fragment>
        <Head>
        <title>Add new meetups</title>
        <meta name="description" content='A new awesome event!'></meta>
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler}></NewMeetupForm>
    </Fragment>)
}

export default NewMeetupPage;