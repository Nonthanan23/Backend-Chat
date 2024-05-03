import express from 'express';
const app = express();
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(5000, () => {
	console.log('Server is running on port 5000');
});

app.get('/', (req, res) => {
	res.send('Hello World');
});

//Broadcast Channel
app.get("/api/broadcast", async (req, res) => {
	await execute(async (mdbc) => {
		const db = mdbc.db("api");
		const messages = db.collection("messages");
		const channels = db.collection("channels");

		const broadcastChannel = await channels.findOne({ name: "broadcast" });

		const result = await messages.find({ channelId: broadcastChannel._id }).toArray();
		res.send({result});
	});
});

app.post("/api/broadcast", async (req, res) => {
	const { message } = req.body;

	await execute(async (mdbc) => {
		const db = mdbc.db("api");
		const messages = db.collection("messages");
		const channels = db.collection("channels");

		const broadcastchannel = await channels.findOne({ name: "broadcast" });

		const inserted = await messages.insertOne({
			...message,
			channelId: broadcastchannel._id,
		});

		if (!inserted.insertedId) {
			res.status(500).send("Failed to insert message");
			return;
		}

		const result = await messages.findOne({ _id: inserted.insertedId });

		if (!result) {
			res.status(500).send("Failed to retrieve message");
		}

		res.send({ result });
	});
});

//Channels
app.get("/api/channels", async (req, res) => {
	await execute(async (mdbc) => {
		const db = mdbc.db("api");
		const channels = db.collection("channels");

		const result = await channels.find().toArray();
		res.send({result});
	});
});

app.put("/api/channels", async (req, res) => {
	const channel = req.body;

	await execute(async (mdbc) => {
		const db = mdbc.db("api");
		const channels = db.collection("channels");

		const inserted = await channels.insertOne(channel);

		if (!inserted.insertedId) {
			res.status(500).send("Failed to insert channel");
			return;
		}

		const result = await channels.findOne({ _id: inserted.insertedId });

		if (!result) {
			res.status(500).send("Failed to retrieve channel");
		}

		res.send({ result });
	});
});

//channel messages
app.get("/api/channels/:id", async (req, res) => {
	const id = req.params.id;

	await execute(async (mdbc) => {
		const db = mdbc.db("api");
		const messages = db.collection("messages");

		const result = await messages.find({ channelId: new ObjectId(id) }).toArray();

		if (!result) {
			res.status(500).send("Failed to retrieve messages");
		}

		res.send({result});
	});
});

//Create Message In Channel
app.post("/api/channels/:id", async (req, res) => {
	const  channelId  = req.params.id;
	const  message  = req.body;

	await execute(async (mdbc) => {
		const db = mdbc.db("api");
		const messages = db.collection("messages");

		const inserted = await messages.insertOne({
			...message,
			channel: new ObjectId(channelId),
		});

		if (!inserted.insertedId) {
			res.status(500).send("Failed to insert message");
			return;
		}

		const result = await messages.findOne({ _id: inserted.insertedId });

		if (!result) {
			res.status(500).send("Failed to retrieve message");
		}

		res.send({ result });
	});
});

//Delete Channel and Messages
app.delete("/api/channels/:channelId", async (req, res) => {
	const { channelId } = req.params;

	await execute(async (mdbc) => {
		const db = mdbc.db("api");
		const channels = db.collection("channels");
		const messages = db.collection("messages");

		const deletedChannel = await channels.deleteOne({ _id: new ObjectId(channelId) });
		const deletedMessages = await messages.deleteMany({ channel: new ObjectId(channelId) });

		console.log("deletedChannel: ", deletedChannel);
		console.log("deletedMessages: ", deletedMessages);

		res.send({
			deletedChannel: deletedChannel.deletedCount,
			deletedMessages: deletedMessages.deletedCount,
		});
	});
});

//MONGODB
const uri =
  "mongodb+srv://betlomsak:cq5P5zBxYSOtCP5H@backendkth.tsc25h7.mongodb.net/?retryWrites=true&w=majority&appName=BackendKTH";

  const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		await client.connect();

		const channels = client.db("api").collection("channels");

		const targetChannel = await channels.findOne({ name: "broadcast" });

		if (!targetChannel) {
			await channels.insertOne({ name: "broadcast" });
			console.log("Created broadcast channel");
		}

		console.log("Pinged your deployment. You successfully connected to MongoDB");
	} finally {
		await client.close();
	}
}

run().catch(console.dir);

async function execute(cb) {
	await client.connect();
	await cb(client);
	await client.close();
}