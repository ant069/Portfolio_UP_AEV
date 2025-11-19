const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const mongoUrl = "mongodb://127.0.0.1:27017/f1";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

// Middleware to load data for root path
async function loadDataMiddleware(req, res, next) {
  try {
    const drivers = await Driver.find({}).sort({ num: 1 });
    const teams = await Team.find({}).sort({ name: 1 });
    req.appData = { drivers, teams, countries };
    next();
  } catch (error) {
    console.error("Error loading data:", error);
    res.status(500).send("Error loading data");
  }
}

// Root route with middleware
app.get("/", loadDataMiddleware, (req, res) => {
  res.render("index", req.appData);
});

// Add a new driver
app.post("/driver", async (req, res) => {
  try {
    const { num, code, forename, surname, dob, nationality, url, teamId } = req.body;
    
    // Find the team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(400).send("Team not found");
    }

    // Create new driver
    const driver = new Driver({
      num: parseInt(num),
      code,
      forename,
      surname,
      dob: new Date(dob),
      nationality,
      url,
      team: team.toObject()
    });

    await driver.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error adding driver:", error);
    res.status(500).send("Error adding driver");
  }
});

// Update a driver
app.put("/driver/:id", async (req, res) => {
  try {
    const { num, code, forename, surname, dob, nationality, url, teamId } = req.body;
    
    // Find the team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(400).json({ error: "Team not found" });
    }

    // Update driver
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      {
        num: parseInt(num),
        code,
        forename,
        surname,
        dob: new Date(dob),
        nationality,
        url,
        team: team.toObject()
      },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.json({ success: true, driver });
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({ error: "Error updating driver" });
  }
});

// Delete a driver
app.delete("/driver/:id", async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.json({ success: true, message: "Driver deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({ error: "Error deleting driver" });
  }
});

// Get all drivers (API endpoint)
app.get("/api/drivers", async (req, res) => {
  try {
    const drivers = await Driver.find({}).sort({ num: 1 });
    res.json(drivers);
  } catch (error) {
    console.error("Error getting drivers:", error);
    res.status(500).json({ error: "Error getting drivers" });
  }
});

// Get all teams (API endpoint)
app.get("/api/teams", async (req, res) => {
  try {
    const teams = await Team.find({}).sort({ name: 1 });
    res.json(teams);
  } catch (error) {
    console.error("Error getting teams:", error);
    res.status(500).json({ error: "Error getting teams" });
  }
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
