const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const ObjectId = require("mongodb").ObjectID;
dotenv.config();

function myDB() {
  const myDB = {};
  const usersDbName = "users";
  const beersDbName = "beers";
  const uri = process.env.MONGO_URI;

  myDB.getBeers = async (style, country, flavor, sortOption) => {
    let client;
    const params = {};
    if (style) {
      params.style = style;
    }

    if (country) {
      params.country = country;
    }

    if (flavor) {
      params.flavors = flavor;
    }

    const sortParam = {};
    if (sortOption.endsWith("-")) {
      sortParam[sortOption.slice(0, -1)] = -1;
    } else {
      // ends with "+"
      sortParam[sortOption.slice(0, -1)] = 1;
    }
    sortParam.name = 1;

    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(beersDbName);
      const collection = db.collection("beers");
      const result = await collection.find(params).sort(sortParam).toArray();
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.getBeerById = async (id) => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(beersDbName);
      const collection = db.collection("beers");
      const result = await collection.findOne({ _id: ObjectId(id) });
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.getStyles = async () => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(beersDbName);
      const collection = db.collection("styles");
      const result = await collection.find().sort({ name: 1 }).toArray();
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.getCountries = async () => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(beersDbName);
      const collection = db.collection("countries");
      const result = await collection.find().sort({ name: 1 }).toArray();
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.getFlavors = async () => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(beersDbName);
      const collection = db.collection("flavors");
      const result = await collection.find().sort({ name: 1 }).toArray();
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.getCommentsTotal = async (beerId) => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(beersDbName);
      const collection = db.collection("comments");
      const result = await collection
        .find({ beer_id: ObjectId(beerId) })
        .count();
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.getComments = async (beerId, start, pageSize) => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(beersDbName);
      const collection = db.collection("comments");
      const result = await collection
        .find({ beer_id: ObjectId(beerId) })
        .sort({ $natural: -1 })
        .skip(start)
        .limit(pageSize)
        .toArray();
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.addLike = async (id, user) => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(beersDbName);
      const collection = db.collection("beers");
      const userRes = collection.find({ like: user });
      if (userRes) {
      }
      const result = await collection.update(
        { _id: ObjectId(id) },
        { $inc: { like: 1 } }
      );
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.addDislike = async (id, user) => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(beersDbName);
      const collection = db.collection("beers");
      const result = await collection.update(
        { _id: ObjectId(id) },
        { $inc: { dislike: 1 } }
      );
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.addNewComment = async (beerId, newComment, user) => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(beersDbName);
      const collection = db.collection("comments");
      const comment = {
        beer_id: ObjectId(beerId),
        comment: newComment,
        user: user,
      };
      const result = await collection.insertOne(comment);
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.findByUsername = async (username) => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(usersDbName);
      const collection = db.collection("localUsers");
      let user = await collection.findOne({ username: username });
      //console.log("db result", user);
      return user;
    } finally {
      client.close();
    }
  };

  myDB.registerUser = async (username, password) => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(usersDbName);
      const collection = db.collection("localUsers");
      const user = {
        username: username,
        password: password,
      };
      let res = await collection.insertOne(user);
      console.log("register user result", user.username);
      return user;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  return myDB;
}
module.exports = myDB();
