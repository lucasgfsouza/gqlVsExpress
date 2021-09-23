const axios = require('axios')

const address = 'http://localhost:3000';

(async () => {
    const { data: employees } = await axios.get(address)
    console.log(employees)
    for (let employee of employees) {
        const name = `${employee.first_name} ${employee.last_name}`

        const { data: [role] } = await axios.get(`${address}/role/${employee.roleId}`)

        const { data: [boss] } = await axios.get(`${address}/boss/${role.bossId}`)

        const result = {
            name,
            bossPhone: boss.phone,
            bossEmail: boss.email
        }

        //pegar esses dados mandar email
        console.log(result)
    }
}
)()