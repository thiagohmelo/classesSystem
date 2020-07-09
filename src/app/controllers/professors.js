Intl = require('intl')
const { ClientBase } = require('pg')
const Professor = require('../models/Professor')
const { age, date } = require ('../../lib/utils')

module.exports = {
    index(req,res){
        const { filter } = req.query
        
        if(filter) {
            Professor.findBy(filter, function(professors){
                return res.render('professors/index', {professors, filter})
            })
        } else {
            Professor.all(function(professors){
                return res.render('professors/index', {professors})
            })
        }

        
        
    },
    create(req,res){
        return res.render('professors/create')
    },
    show(req,res){
        Professor.find(req.params.id, function(professor) {
            if (!professor) return res.send('professor not found')

            professor.birth = date(professor.birth).iso

            professor.subject = professor.subject.split(',')

            professor.created_at = date(professor.created_at).format

            return res.render('professors/show', { professor })


        })
    },
    post(req,res){
        
    const keys = Object.keys(req.body)

    for (key of keys) {
    if (req.body[key] == "") {
        return res.send('Por favor, preencha todos os campos')
    } 
}

    Professor.create(req.body, function(professor){
        return res.redirect(`/professors/${professor.id}`)
    })

    },
    edit(req,res){
        Professor.find(req.params.id, function(professor) {
            if (!professor) return res.send('professor not found')

            professor.birth = date(professor.birth).iso

            return res.render('professors/edit', { professor })


        })
    },
    put(req,res){

        const keys = Object.keys(req.body)

        for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Por favor, preencha todos os campos')
        } 
    }

    Professor.update(req.body, function() {
        return res.redirect(`/professors/${req.body.id}`)
    })


    },
    delete(req, res){
        Professor.delete(req.body.id, function() {
            return res.redirect(`/professors`)
        })
    
    },
}


