Intl = require('intl')
const { ClientBase } = require('pg')
const Student = require('../models/Student')
const { age, date } = require ('../../lib/utils')

module.exports = {
    index(req,res){
        
        Student.all(function(students){
            return res.render('students/index', {students})
        })


        
    },
    create(req,res){
        Student.professorsSelectOptions(function(options){
            return res.render('students/create', { professorOptions: options })

        })

    },
    show(req,res){
        Student.find(req.params.id, function(student) {
            if (!student) return res.send('student not found')

            student.age = date(student.birth).birthDay

            student.subject = student.subject.split(',')

            student.created_at = date(student.created_at).format

            return res.render('students/show', { student })


        })
    },
    post(req,res){
        
    const keys = Object.keys(req.body)

    for (key of keys) {
    if (req.body[key] == "") {
        return res.send('Por favor, preencha todos os campos')
    } 
}

    Student.create(req.body, function(student){
        return res.redirect(`/students/${student.id}`)
    })

    },
    edit(req,res){
        Student.find(req.params.id, function(student) {
            if (!student) return res.send('student not found')

            student.birth = date(student.birth).iso

            Student.professorsSelectOptions(function(options){
                return res.render('students/edit', { student, professorOptions: options })
            })
        })
    },
    put(req,res){

        const keys = Object.keys(req.body)

        for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Por favor, preencha todos os campos')
        } 
    }

    Student.update(req.body, function() {
        return res.redirect(`/students/${req.body.id}`)
    })


    },
    delete(req, res){
        Student.delete(req.body.id, function() {
            return res.redirect(`/students`)
        })
    
    },
}




