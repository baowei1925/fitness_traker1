// Code for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

const secretKey = "23498hq3e413f40";

app.use(express.json());
mongoose.connect(
  "mongodb+srv://dwayne_reinaldy:mongodb123@cluster0.qufy1vp.mongodb.net/?retryWrites=true&w=majority",
  {
    dbName: "FitnessWeb",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection failed: "));
db.once("open", function () {
  console.log("Connected to database successfully");
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

const calorieEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  entries: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      time:{
        type:String,
        required: true,
      },
      food: {
        type: String,
        required: true,
      },
      totalCalories: {
        type: Number,
        required: true,
      },
    },
  ],
});

const fitnessEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  activity: {
    type: String,
    required: true,
  },
  totalCalories: {
    type: Number,
  },
});

const User = mongoose.model("User", UserSchema);
const CalorieEntry = mongoose.model("CalorieEntry", calorieEntrySchema);
const FitnessEntry = mongoose.model("FitnessEntry", fitnessEntrySchema);
module.exports = { User, CalorieEntry ,FitnessEntry};

User.createIndexes();
CalorieEntry.createIndexes();
FitnessEntry.createIndexes();

const cors = require("cors");
const { Int32 } = require("mongodb");
console.log("App listen at port 5050");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
});

app.get("/users/find-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      height: user.height,
      weight: user.weight,
      age: user.age,
    });
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/users/total-calories/:userId/:dateCal", async (req, res) => {
  try {
    const userId = req.params.userId;
    const dateCal = req.params.dateCal;
    const user = await CalorieEntry.find({
      user: userId,
      "entries.date": { $eq: new Date(dateCal) },
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const responseData = user.map((user) => ({
      userid: user.user,
      entries: user.entries,
    }));

    res.json(responseData);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/users/total-calories/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await CalorieEntry.find({
      user: userId,
    });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const responseData = user.map((user) => ({
      userid: user.user,
      entries: user.entries,
    }));

    res.json(responseData);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// app.get('/users/total-calories/:userId/:dateCal', async (req, res) => {
// 	try {
// 	  const userId = req.params.userId;
// 	  const dateCal = req.params.dateCal;
// 	  console.log(userId, dateCal);

// 	  const entries = await CalorieEntry.find({
// 		user: userId,
// 		'entries.date': { $eq: dateCal }, // Filter by user and date
// 	  });

// 	  if (!entries.length) {
// 		return res.status(404).json({ message: 'No entries found for that date' });
// 	  }

// 	  res.json({
// 		userid: userId,
// 		entries : entries,
// 	  });
// 	} catch (error) {
// 	  console.error('Error finding user:', error);
// 	  res.status(500).json({ message: 'Internal Server Error' });
// 	}
//   });

app.post("/register", async (req, resp) => { //register user
  try {
    const { name, height, weight, age,  email, pass } = req.body;

    if (!pass) {
      return resp.status(400).send("Password is required");
    }
    const hashedPassword = await bcrypt.hash(pass, 10);

    const user = new User({
      name,
      height,
      weight,
      email,
      age,
      pass: hashedPassword,
    });

    // Save the user to the database
    let result = await user.save();
    result = result.toObject();

    if (result) {
      // Do not send the request body in the response
      delete result.password;

      resp.send(result);
      console.log(result);
    } else {
      console.log("User already registered");
    }
  } catch (e) {
    console.error(e);
    resp.status(500).send("Something Went Wrong");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailLog, passLog } = req.body;

    const user = await User.findOne({ email: emailLog });
    if (user && (await bcrypt.compare(passLog, user.pass))) {
      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: "1h",
      });
      res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/calorie-entry", async (req, res) => {
  try {
    const { user, entries } = req.body;

    const calorieEntry = new CalorieEntry({
      user,
      entries,
    });

    const result = await calorieEntry.save();

    if (result) {
      res.json(result);
      console.log(result);
    } else {
      console.log("Failed to save calorie entry");
      res.status(500).json({ error: "Failed to save calorie entry" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

app.post("/fitness-entry", async (req, res) => {
  try {
    const { user, date, activity, totalCalories } = req.body;

    const fitnessEntry = new FitnessEntry({
      user,
      date, 
      activity, 
      totalCalories
    });

    const result = await fitnessEntry.save();

    if (result) {
      res.json(result);
      console.log(result);
    } else {
      console.log("Failed to save calorie entry");
      res.status(500).json({ error: "Failed to save calorie entry" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something Went Wrong" });
  }
});
app.get("/users/total-cal/:userId/2/:dateFit", async (req, res) => {
  try {
    const userId = req.params.userId;
    const dateFit = req.params.dateFit;
    const user = await FitnessEntry.find({
      user: userId,
      date: { $eq: new Date(dateFit) },
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const responseData = user.map((user) => ({
      userid: user.user,
      date: user.date,
      activity: user.activity,
      totalCalories: user.totalCalories,
    }));

    res.json(responseData);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/users/total-cal/:userId/2", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId)
    const user = await FitnessEntry.find({
      user: userId,
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const responseData = user.map((user) => ({
      userid: user.user,
      date: user.date,
      activity: user.activity,
      totalCalories: user.totalCalories,
    }));

    res.json(responseData);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/users/total-calories/:userId/3/:dateCal", async (req, res) => {
  try {
    const userId = req.params.userId;
    const dateCal = req.params.dateCal;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const formattedDateCal = new Date(Date.parse(dateCal));

    const responseData = await CalorieEntry.find({
      user: userId,
      "entries.date": { $gte: sevenDaysAgo, $lte: formattedDateCal },
    });

    res.json(responseData);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/users/total-calories/:userId/4/:dateFit", async (req, res) => {
  try {
    const userId = req.params.userId;
    const dateFit = req.params.dateFit;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const formattedDateCal = new Date(Date.parse(dateFit));

    const user = await FitnessEntry.find({
      user: userId,
      date: { $gte: sevenDaysAgo, $lte: formattedDateCal },
    });

    const responseData = user.map((user) => ({
      userid: user.user,
      date: user.date,
      activity: user.activity,
      totalCalories: user.totalCalories,
    }));
    console.log(responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/users/total-calories/:userId/5/:dateCal", async (req, res) => {
  try {
    const userId = req.params.userId;
    const dateCal = req.params.dateCal;
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const formattedDateCal = new Date(Date.parse(dateCal));

    const responseData = await CalorieEntry.find({
      user: userId,
      "entries.date": { $gte: oneMonthAgo, $lte: formattedDateCal },
    });

    res.json(responseData);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/users/total-calories/:userId/6/:dateFit", async (req, res) => {
  try {
    const userId = req.params.userId;
    const dateFit = req.params.dateFit;
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    const formattedDateCal = new Date(Date.parse(dateFit));

    const user = await FitnessEntry.find({
      user: userId,
      date: { $gte: oneMonthAgo, $lte: formattedDateCal },
    });

    const responseData = user.map((user) => ({
      userid: user.user,
      date: user.date,
      activity: user.activity,
      totalCalories: user.totalCalories,
    }));
    console.log(responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.listen(5050);