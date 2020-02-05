import { gql } from 'apollo-server';

export const typeDefs = gql`

enum Role{
    Student
    Tutor
    Admin
}

type Invoice {
    id: ID!
    date: String!
    paid: Boolean!
    session: Session!
    note: Note
}

type Note {
    id: ID!
    note: String!
}

type Tutor {
	id: ID!
    name: String!
    phone: String!
    user: User!
  }

type Student {
    id: ID!
    name: String!
    phone: String!
    user: User!
  }

type Company {
    id: ID!
    name: String!
    address: String
}

type Admin {
    id: ID!
    name: String!
    phone: String!
    user: User!
  }

type User {
    id: ID!
    email: String!
    role: Role!
    company: Company!
}

type Product {
    id: ID!
    tutor: Tutor!
	student: Student!
    rate: Float!
    subject: String!
    tutorshare: Float! 
    active: Boolean!
    company: Company!
}

type Session {
    id: ID! 
    date: String!
    invoiced: Boolean!
    length: Float!
    location: String!
    note: Note
    product: Product!
    studentconfirmed: Boolean!
    studentNote: Note
    tutorconfirmed: Boolean!
    tutorNote: Note
}

type Query{
    admins: [Admin]!
    companies: [Company]!
    company(id: Int!): Company
    invoices:[Invoice]!
    products:[Product]!
    productsByCompany(companyid: Int!): [Product]!
    productById(id: Int!): Product
    sessions: [Session]!
    sessionsByCompany(companyid: Int!): [Session]!
    students: [Student]!
    studentsByCompany(companyid: Int!): [Student]!
    studentByID(id: Int!): Student
    tutors: [Tutor]!
    tutorsByCompany(companyid: Int!): [Tutor]!
    tutorByID(id: Int!): Tutor
    users: [User]!
    usersByCompany(companyid: Int!): [User]!
    userByEmail(email: String!): User
    userByID(id: Int!): User
}

input UserInput{
    email: String!
    role: Role!
    companyid: Int!
}

input CompanyInput{
    name: String!
    address: String!
}

input StudentTutorAdminInput{
    name: String!
    phone: String!
    userid: Int!
}

input ProductInput{
    tutorid: Int!
    studentid: Int!
    rate: Float!
    subject: String!
    tutorshare: Float!
    companyid: Int!
    active: Boolean
}

input SessionInput{
    productid: Int!
    date: String!
    length: Float!
    location: String!
    invoiced: Boolean
    noteid: Int
    studentnoteid: Int
    tutornoteid: Int
    studentconfirmed: Boolean
    tutorconfirmed: Boolean
}

input InvoiceInput{
    sessionid: Int!
    date: String
    paid: Boolean
    noteid: Int
}

type Mutation{
    createUser(input: UserInput!): User
    createCompany(input: CompanyInput!): Company
    createAdmin(input: StudentTutorAdminInput!): Admin
    createStudent(input: StudentTutorAdminInput!): Student
    createTutor(input: StudentTutorAdminInput!): Tutor
    createProduct(input: ProductInput!): Product
    createSession(input: SessionInput!): Session
    createInvoice(input: InvoiceInput!): Invoice
}`