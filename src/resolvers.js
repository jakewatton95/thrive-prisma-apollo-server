export const resolvers = {
    Company: {
        id: (parent)=>{
            return parent.idcompany
        } 
    },
    Invoice: {
        id: (parent)=>{
            console.log(parent)
            return parent.idinvoice
        },
        session: (parent, _, ctx) => {
            return ctx.db.session({idsession: parent.sessionid})
        }, 
    },
    Product: {
        id: (parent)=>{
            return parent.idproduct
        }, 
        student: async (parent, _, ctx) => {
            return await (ctx.db.product({idproduct: parent.idproduct}).student())
        },
        tutor: async (parent, _, ctx) => {
            return await (ctx.db.product({idproduct: parent.idproduct}).tutor())
        },
        company: async (parent, _, ctx) => {
            return await (ctx.db.product({idproduct: parent.idproduct}).company())
        } 
    },
    Session: {
        id: (parent)=>{
            return parent.idsession
        },
        product: (parent, _, ctx) => {
            return ctx.db.product({idproduct: parent.productid})
        }
    },
    Admin: {
        id: (parent)=>{
            return parent.idadmin
        },
        user: async (parent, _, ctx) => {
            return await (ctx.db.admin({idadmin: parent.idadmin}).user())
        }
    },
    Student: {
        id: (parent)=>{
            return parent.idstudent
        },
        user: async (parent, _, ctx) => {
            return await (ctx.db.student({idstudent: parent.idstudent}).user())
        }
    },
    Tutor: {
        id: (parent)=>{
            return parent.idtutor
        },
        user: async (parent, _, ctx) => {
            return await (ctx.db.tutor({idtutor: parent.idtutor}).user())
        }
    },
    User: {
         id: (parent,_,ctx) => {
            console.log(parent)
            return parent.iduser
        },
        company: async (parent, _, ctx) => {
             return await (ctx.db.user({iduser: parent.iduser}).company())
        }
    },
    Query : {
        admins: async (_,__,ctx) => {
            return await ctx.db.admins()
        },
        companies : async (_, __, ctx) => {
            console.log("A")
            return await ctx.db.companies()
        },
        company : async (_, args, ctx) => {
            return await ctx.db.company({idcompany: args.id})
        },
        invoices: (_,__, ctx)=>{
            console.log(ctx.db)
            return ctx.db.invoices()
        },
        products: async (_, __, ctx) => {
            return await ctx.db.products()
        },
        productsByCompany: async (_, args, ctx) => {
            console.log("CALLED")
            return await ctx.db.products({where: {company : {idcompany: args.companyid}}})
        },
        productById: async (_, args, ctx) => {
            return await ctx.db.product({idproduct: args.id})
        },
        sessions: (_, __, ctx) => {
            return ctx.db.sessions()
        },
        sessionsByCompany: (_, args, ctx) => {
            return ctx.db.sessions({where : {product : args}})
        },
        students: async (_, __, ctx) => {
            return await ctx.db.students()
        },
        studentsByCompany: async (_, args, ctx) => {
            return await ctx.db.students({where: {user : {company: {idcompany: args.companyid}}}})
        },
        studentByID: async (_, args, ctx) => {
            return await ctx.db.student({idstudent: args.id})
        },
        tutors: async (_, __, ctx) => {
            return await ctx.db.tutors()
        },
        tutorsByCompany: async (_, args, ctx) => {
            return await ctx.db.tutors({where: {user: {company: {idcompany: args.companyid}}}})
        },
        tutorByID: async (_, args, ctx) => {
            return await ctx.db.tutor({idtutor: args.id})
        },
        users: async (_, {}, ctx) => {
            // console.log(ctx.req.req.headers)
            return await ctx.db.users()
        },
        usersByCompany: async (_, args, ctx) => {
            return await ctx.db.users({where: {company: {idcompany: args.companyid}}})
        },
        userByID: async (_, args, ctx) => {
            return await ctx.db.user({iduser: args.id})
        },
        userByEmail: async (_, args, ctx) => {
            console.log(args)
            return await ctx.db.user(args)
        }
    },
    Mutation: {
        createUser: async (_, {input}, ctx) => {
            const {email, role, companyid} = input
            return await ctx.db.createUser({email, role, company: {connect: {idcompany: companyid}}})
        },
        createCompany: async (_, {input}, ctx) => {
            return await ctx.db.createCompany(input)
        },
        createAdmin: async (_, {input}, ctx) => {
            const {name, phone, userid} = input
            return await ctx.db.createAdmin({name, phone, user: {connect: {iduser: userid}}})
        },
        createStudent: async (_, {input}, ctx) => {
            const {name, phone, userid} = input
            return await ctx.db.createStudent({name, phone, user: {connect: {iduser: userid}}})
        },
        createTutor: async (_, {input}, ctx) => {
            const {name, phone, userid} = input
            return await ctx.db.createTutor({name, phone, user: {connect: {iduser: userid}}})
        },
        createProduct: async (_, {input}, ctx) => {
            const {tutorid, studentid, rate, subject, tutorshare, companyid, active} = input
            return await ctx.db.createProduct({rate, subject, tutorshare, active, 
                company: {connect: {idcompany: companyid}},
                student: {connect: {idstudent: studentid}},
                tutor: {connect: {idtutor: tutorid}}    
            })
        },
        createSession: (_,{input},ctx)=> {
            return ctx.db.createSession(input)
        },
        createInvoice: (_, {input}, ctx) => {
            return ctx.db.createInvoice(input)
        }
    }
}