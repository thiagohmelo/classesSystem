Intl = require('intl')
const db = require('../../config/db')
const { age, date } = require ('../../lib/utils')

module.exports= {
    all(callback) {

        db.query(`SELECT * FROM students`, function(err, results){
            if(err) throw 'database error'

            callback(results.rows)

        })

    },
    create(data, callback) {

        const query = `
        INSERT INTO students (
            name,
            avatar_url,
            email,
            year,
            subject,
            format,
            week_hours,
            professor_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
    `   

    const values = [
        data.name,
        data.avatar_url,
        data.email,
        data.year,
        data.subject,
        data.format,
        data.week_hours,
        data.professor
    ]

    db.query(query, values, function(err, results){
        if(err) throw `database error ${err}`
        
        callback(results.rows[0])
    })

    },
    find(id, callback) {
        db.query(`
        SELECT students.*, professors.name AS professor_name
        FROM students 
        LEFT JOIN professors ON (students.professor_id = professors.id)
        WHERE students.id = $1`, [id], function(err, results){
            if(err) throw `database error ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE students SET
        name=($1),
        avatar_url=($2),
        email=($3),
        year=($4),
        subject=($5),
        format=($6),
        week_hours=($7),
        professor_id=($8)
        WHERE id = $9
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.year,
            data.subject,
            data.format,
            data.week_hours,
            data.professor,
            data.id
        ]
        db.query(query, values, function(err, results){
            if(err) throw `database error ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results){
            if(err) throw `database error ${err}`

            return callback()
        })
    },
    professorsSelectOptions(callback) {
        db.query(`SELECT name, id FROM professors`, function(err, results){
            if(err) throw `database error ${err}`

            callback(results.rows)
        }) 
    }
}