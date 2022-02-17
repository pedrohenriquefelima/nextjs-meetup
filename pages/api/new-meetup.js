///api/new-meetup
import {MongoClient} from 'mongodb'
async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;
        //stablish connection
        //should neber be exposed to the client side
        //connect return a promise
        //mongoDb is a nonSQL db that works with collections & documents
        //collections would be tables
        //documents would be entries
        //collection with multiple document
        const client = await MongoClient.connect('mongodb+srv://pedrolima:Passw0rd123@cluster0.0gnif.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);

        console.log(result);
        client.close();

        //this is the response sent to the client when the new meetup is created
        res.status(201).json({message: 'meetup inserted!'})
    }
}

export default handler;