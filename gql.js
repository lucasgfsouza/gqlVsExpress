const { ApolloServer, gql } = require('apollo-server');

const employeeDB = require('./db/employees.json')
const rolesDB = require('./db/roles.json')
const bossDB = require('./db/boss.json')

const typeDefs = gql`

    type Query {
        ola: String
        employee(id: ID): Employee
        role(id: ID): Role
        all: [Employee]!
    }

    type Employee {
        id: ID
        first_name: String
        last_name: String
        email: String
        gender: String
        role: Role
        roleId: Int
    }

    type Role {
        id: ID
        role: String
        boss: Boss
        bossId: Int
        wage: Float
        realWage: String
    }

    type Boss {
        id: ID
        phone: String
        address: String
        email: String
        wage: Float
    }

`

const resolvers = {
    Employee: {
        role(employee) {
            const chosenRole = rolesDB.filter((role) => role.id == employee.roleId)
            return chosenRole[0]
        }
    },

    Role: {
        boss(role) {
            const chosenBoss = bossDB.filter((boss) => boss.id == role.bossId)
            return chosenBoss[0]
        },
        realWage(role) {
            const newWage = role.wage * 5.2
            const realWage = `O salário em real é de R$${newWage}`
            return realWage
        }
    },

    Query: {
        ola() {

        },
        employee(_, args) {
            const chosenOne = employeeDB.filter((employee) => args.id == employee.id)
            return chosenOne[0]
        },
        role(_, args) {
            const chosenOne = rolesDB.filter((role) => args.id == role.id)
            return chosenOne[0]
        },
        all(_, args) {
            return employeeDB
        }

    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})