"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;
require("dotenv").config()

var models = [
  {
    name: "Company",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Student",
    embedded: false
  },
  {
    name: "Tutor",
    embedded: false
  },
  {
    name: "Admin",
    embedded: false
  },
  {
    name: "Product",
    embedded: false
  },
  {
    name: "Session",
    embedded: false
  },
  {
    name: "Invoice",
    embedded: false
  },
  {
    name: "Note",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
