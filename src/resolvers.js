export const resolvers = {
    Company: {
        id: (parent)=>{
            return parent.idcompany
        } 
    },
    Invoice: {
        id: (parent)=>{
            return parent.idinvoice
        },
        session: async (parent, _, ctx) => {
            return await (ctx.db.invoice({idinvoice: parent.idinvoice}).session())
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
        product: async (parent, _, ctx) => {
            return await (ctx.db.session({idsession: parent.idsession}).product())
        }
    },
    Admin: {
        id: parent=> parent.idadmin,
        user: async (parent, _, ctx) => {
            return await (ctx.db.admin({idadmin: parent.idadmin}).user())
        }
    },
    Student: {
        id: parent=> parent.idstudent,
        user: async (parent, _, ctx) => {
            return await (ctx.db.student({idstudent: parent.idstudent}).user())
        }
    },
    Tutor: {
        id: parent=> parent.idtutor,
        user: async (parent, _, ctx) => {
            return await (ctx.db.tutor({idtutor: parent.idtutor}).user())
        }
    },
    User: {
        id: (parent,_,ctx) => {
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
        adminByUserID: async (_,args,ctx) => {
            return await ctx.db.admins({where: {user: {iduser: args.userid}}}, {first: 1})
        },
        companies : async (_, __, ctx) => {
            return await ctx.db.companies()
        },
        company : async (_, args, ctx) => {
            return await ctx.db.company({idcompany: args.id})
        },
        invoices: async (_,__, ctx)=>{
            return await ctx.db.invoices()
        },
        invoicesByCompany: async (_,args, ctx)=>{
            return await ctx.db.invoices({where: {session: {product: {company : {idcompany: args.companyid}}}}})
        },
        invoicesByStudent: async(_, args, ctx) => {
            return await ctx.db.invoices({where: {session: {product: {student: {user: {iduser: args.userid}}}}}})
        },
        invoicesByTutor: async(_, args, ctx) => {
            return await ctx.db.invoices({where: {session: {product: {tutor: {user: {iduser: args.userid}}}}}})
        },
        products: async (_, __, ctx) => {
            return await ctx.db.products()
        },
        productsByCompany: async (_, args, ctx) => {
            return await ctx.db.products({where: {company : {idcompany: args.companyid}}})
        },
        productsByStudent: async(_, args, ctx) => {
            return await ctx.db.products({where: {student: {user: {iduser: args.userid}}}})
        },
        productsByTutor: async(_, args, ctx) => {
            return await ctx.db.products({where: {tutor: {user: {iduser: args.userid}}}})
        },
        productById: async (_, args, ctx) => {
            return await ctx.db.product({idproduct: args.id})
        },
        sessions: async (_, __, ctx) => {
            return await ctx.db.sessions()
        },
        sessionsByCompany: async (_, args, ctx) => {
            return await ctx.db.sessions({where : {product : {company: {idcompany: args.companyid}}}})
        },
        sessionsByStudent: async (_, args, ctx) => {
            return await ctx.db.sessions({where : {product : {student: {user: {iduser: args.userid}}}}})
        },
        sessionsByTutor: async (_, args, ctx) => {
            return await ctx.db.sessions({where : {product : {tutor: {user: {iduser: args.userid}}}}})
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
        studentByUserID: async (_,args,ctx) => {
            return await ctx.db.students({where: {user: {iduser: args.userid}}}, {first:1})
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
        tutorByUserID: async (_,args,ctx) => {
            return await ctx.db.tutors({where: {user: {iduser: args.userid}}}, {first:1})
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
        createStudentAndUser: async(_, {input}, ctx) => {
            const{name, email, phone, companyid} = input
            return await ctx.db.createStudent({name, phone, user: {
                create: {
                    email,
                    role: "Student",
                    company: {
                        connect: {
                            idcompany: companyid
                        }
                    }

                }
            }})
        },
        createTutor: async (_, {input}, ctx) => {
            const {name, phone, userid} = input
            return await ctx.db.createTutor({name, phone, user: {connect: {iduser: userid}}})
        },
        createTutorAndUser: async(_, {input}, ctx) => {
            const{name, email, phone, companyid} = input
            return await ctx.db.createTutor({name, phone, user: {
                create: {
                    email,
                    role: "Tutor",
                    company: {
                        connect: {
                            idcompany: companyid
                        }
                    }
                }
            }})
        },
        createProduct: async (_, {input}, ctx) => {
            const {tutorid, studentid, rate, subject, tutorshare, companyid, active} = input
            return await ctx.db.createProduct({rate, subject, tutorshare, active, 
                company: {connect: {idcompany: companyid}},
                student: {connect: {idstudent: studentid}},
                tutor: {connect: {idtutor: tutorid}}    
            })
        },
        createSession: async (_,{input},ctx)=> {
            const {date, length, location, invoiced, studentconfirmed, tutorconfirmed, productid} = input
            return await ctx.db.createSession({date, length, location, invoiced, studentconfirmed, tutorconfirmed,
                product : {connect: {idproduct: productid}}
            })
        },
        createInvoice: async (_, {input}, ctx) => {
            const {sessionid, date, studentpaid, tutorpaid} = input
            return await ctx.db.createInvoice({ date, studentpaid, tutorpaid, 
                session: {connect: {idsession: sessionid}}
            })
        }
    }
}