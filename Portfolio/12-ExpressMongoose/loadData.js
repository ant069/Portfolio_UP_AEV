const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const mongoUrl = "mongodb://127.0.0.1:27017/f1";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});

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

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

// Teams data with their information
const teamsData = [
  { id: 1, name: "Mercedes", nationality: "GER", url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One" },
  { id: 2, name: "Aston Martin", nationality: "ENG", url: "http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One" },
  { id: 3, name: "Alpine", nationality: "FRA", url: "http://en.wikipedia.org/wiki/Alpine_F1_Team" },
  { id: 4, name: "Haas", nationality: "USA", url: "http://en.wikipedia.org/wiki/Haas_F1_Team" },
  { id: 5, name: "Red Bull", nationality: "AUS", url: "http://en.wikipedia.org/wiki/Red_Bull_Racing" },
  { id: 6, name: "Alpha Tauri", nationality: "ITA", url: "http://en.wikipedia.org/wiki/Scuderia_AlphaTauri" },
  { id: 7, name: "Alpha Romeo", nationality: "SWI", url: "http://en.wikipedia.org/wiki/Alfa_Romeo_in_Formula_One" },
  { id: 8, name: "Ferrari", nationality: "ITA", url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari" },
  { id: 9, name: "Williams", nationality: "ENG", url: "http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering" },
  { id: 10, name: "McLaren", nationality: "ENG", url: "http://en.wikipedia.org/wiki/McLaren" },
];

// Nationality mapping
const nationalityMap = {
  "British": "ENG",
  "Spanish": "SPA",
  "German": "GER",
  "French": "FRA",
  "Mexican": "MEX",
  "Australian": "AUS",
  "Finnish": "FIN",
  "Danish": "DEN",
  "Dutch": "NET",
  "Canadian": "CAN",
  "Monegasque": "MON",
  "Thai": "THA",
  "Japanese": "JAP",
  "Chinese": "CHI",
  "American": "USA"
};

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",");
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    data.push(obj);
  }
  return data;
}

function parseDateDDMMYYYY(dateStr) {
  const parts = dateStr.split("/");
  // Format is DD/MM/YYYY
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

async function loadData() {
  try {
    // Clear existing data
    await Driver.deleteMany({});
    await Team.deleteMany({});
    console.log("Cleared existing data");

    // Insert teams
    const insertedTeams = await Team.insertMany(teamsData);
    console.log(`Inserted ${insertedTeams.length} teams`);

    // Create team lookup map
    const teamMap = {};
    insertedTeams.forEach(team => {
      teamMap[team.name] = team;
    });

    // Parse CSV
    const csvPath = path.join(__dirname, "public", "data", "f1_2023.csv");
    const driversData = parseCSV(csvPath);
    console.log(`Parsed ${driversData.length} drivers from CSV`);

    // Insert drivers
    const drivers = [];
    for (const row of driversData) {
      const teamName = row.current_team.trim();
      const team = teamMap[teamName] || null;
      
      if (teamName !== "N/A" && team) {
        const driver = {
          num: parseInt(row.number),
          code: row.code,
          forename: row.forename,
          surname: row.surname,
          dob: parseDateDDMMYYYY(row.dob),
          nationality: nationalityMap[row.nationality] || "ENG",
          url: row.url,
          team: team.toObject()
        };
        drivers.push(driver);
      }
    }

    const insertedDrivers = await Driver.insertMany(drivers);
    console.log(`Inserted ${insertedDrivers.length} drivers`);

    console.log("Data loading complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error loading data:", error);
    process.exit(1);
  }
}

// Wait for connection then load data
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  loadData();
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});
