const mongoose = require("mongoose");
const {Categories} = require("../models/Categories");

async function getAll()
{
  return await Categories.find({}).lean();
}
async function add(category)
{
    return await Categories.create(category);
}
module.exports = {getAll,add}


