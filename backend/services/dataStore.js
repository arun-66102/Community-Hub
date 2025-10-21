const fs = require('fs/promises');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'data.json');
const seedFilePath = path.join(__dirname, '..', 'data', 'seed.json');

async function ensureDataFile() {
  try {
    await fs.access(dataFilePath);
  } catch (error) {
    const seed = await fs.readFile(seedFilePath, 'utf-8');
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, seed);
  }
}

async function readData() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(raw);
}

async function writeData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
  return data;
}

async function getAllHelpRequests() {
  const data = await readData();
  return data.helpRequests;
}

async function getHelpRequestById(id) {
  const data = await readData();
  return data.helpRequests.find((item) => item.id === id) || null;
}

async function createHelpRequest(payload) {
  const data = await readData();
  data.helpRequests.push(payload);
  await writeData(data);
  return payload;
}

async function updateHelpRequest(id, updates) {
  const data = await readData();
  const index = data.helpRequests.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  data.helpRequests[index] = { ...data.helpRequests[index], ...updates };
  await writeData(data);
  return data.helpRequests[index];
}

async function deleteHelpRequest(id) {
  const data = await readData();
  const index = data.helpRequests.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }
  data.helpRequests.splice(index, 1);
  await writeData(data);
  return true;
}

async function addVolunteerToRequest(id, volunteer) {
  const data = await readData();
  const request = data.helpRequests.find((item) => item.id === id);
  if (!request) {
    return null;
  }
  request.volunteers.push(volunteer);
  await writeData(data);
  return request;
}

async function createUser(user) {
  const data = await readData();
  data.users.push(user);
  await writeData(data);
  return user;
}

async function getStats() {
  const data = await readData();
  const total = data.helpRequests.length;
  const open = data.helpRequests.filter((item) => item.status === 'open').length;
  const critical = data.helpRequests.filter((item) => item.urgency === 'critical').length;
  const volunteers = data.helpRequests.reduce((sum, item) => sum + item.volunteers.length, 0);
  return { total, open, critical, volunteers };
}

module.exports = {
  getAllHelpRequests,
  getHelpRequestById,
  createHelpRequest,
  updateHelpRequest,
  deleteHelpRequest,
  addVolunteerToRequest,
  createUser,
  getStats
};
