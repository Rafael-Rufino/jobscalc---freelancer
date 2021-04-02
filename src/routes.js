// biblioteca pra node pra contruir o servidor 
const express = require('express');
const routes = express.Router()

// variavel ambiente pegando os arquivos static
const views = __dirname + "/views/"

const Profile ={
    data:{
        name: "Rafael",
        avatar: "https://scontent.fnat16-1.fna.fbcdn.net/v/t1.0-9/107738734_3028137827312498_1482817804595466080_o.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=s7g1nAsNRDUAX85oq7b&_nc_ht=scontent.fnat16-1.fna&oh=06f508f128b734e3227eab4b0df00322&oe=60828CDB",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers:{
        index: (req, res)=>{
            return res.render(views + "profile", {profile: Profile.data})         

        },
        update(req, res){
            //req.body para pegar os dados
            const data = req.body
            // definir quantas semanas tem num ano
            const weeksPerYear = 52
            // remover as semanas de ferias do ano
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
            // quantas horas por semana estou trabalhando
            const weekTotalHours = data["hours-per-day"] * data ["days-per-week"]
            // total de horas trabalhadas no mes
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
            // qual sera o valor da minha hora
            const valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }
            return res.redirect('/profile')

        }
    }
   
}

const Job = {
    data:[
        { 
        id: 1,
        name: "pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 1,
        created_at: Date.now(),
    
        
        
        },
        { 
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now(),
 
        
        } 

    ],

    controllers:{
        index:(req, res) => {
                const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
    
                return{
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })  
           return res.render(views + "index", {jobs: updatedJobs})
   
        },
        create(req, res){
            return res.render(views + "job")
        },

        save(req, res){
            const lastId = Job.data[Job.data.length - 1]?.id || 0;
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()  // atribuido data de hoje
          })
        
        return  res.redirect('/')
        },
        show(req, res){
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))
            if(!job){
                return res.send('Job not found')
            }
            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render(views + "job-edit", {job})
        },
        update(req, res){
            const jobId = req.params.id
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send('Job not found')
            }
            const updatedJob={
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }
            Job.data = Job.data.map(job =>{
                if(Number(job.id) === Number(jobId)){
                    job = updatedJob
                }
                return job
            })

            res.redirect('/job/' + jobId) 
        },
        delete(req, res){
            const jobId = req.params.id
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')

        }
    
    },

    services:{
    remainingDays(job){
        const remainingDays = (job["total-hours"] / job
        ["daily-hours"]).toFixed()
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs - Date.now()

        // transformar milli em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)

        // restam x dias
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }
}


//rotas
routes.get('/', Job.controllers.index)

routes.get('/job',Job.controllers.create)
//salvar dados
routes.post('/job', Job.controllers.save)

routes.get('/job/:id',Job.controllers.show)

routes.post('/job/:id',Job.controllers.update)

routes.post('/job/delete/:id',Job.controllers.delete)

routes.get('/profile',Profile.controllers.index)

routes.post('/profile',Profile.controllers.update)

// exportar o arquivos de rotas
module.exports = routes;